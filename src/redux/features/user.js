import { createSlice } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        registeredUsers: localStorage.getItem("regUsers"),
        authorizedStatus: false,
        successMessage: "",
        errorMessage: "",
    },
    reducers: {
        setLoading: (state, status) => {
            state.loading = status;
        },
        setAuthStatus: (state, action) => {
            state.authorizedStatus = action.payload;
        },
        handleLoginSuccess: (state) => {
            state.loading = false;
            state.authorizedStatus = true;
        },
        handleRegSuccess: (state, action) => {
            state.loading = false;
            localStorage.setItem('regUsers', JSON.stringify(action.payload));
            state.errorMessage = "";
            state.successMessage = "User Registered Successfully.";
        },
        handleError: (state, action) => {
            state.loading = false;
            state.authorizedStatus = false;
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state, action) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        logout: (state, action) => {
            state.errorMessage = "";
            state.successMessage = "";
            state.authorizedStatus = false;

            localStorage.setItem('loggedIn', 0);
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("items");
        },
    },
});

/**
 * user login
 */
export const login = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        let users = localStorage.getItem("regUsers");

        if (users) {
            users = JSON.parse(users);
        } else {
            users = [];
        }

        // check user existency of registered users list in localstorage by entered email
        let user = users.filter(function (el) {
            return el.email == data.email
        });

        if (user.length > 0) {
            const userPwd = user[0].password;

            // comparison of user entered password and existing user's encrypted password
            bcrypt.compare(data.password, userPwd, (err, result) => {
                if (err) {
                    dispatch(handleError("Password decrypt error."));
                } else {
                    if (result) {
                        //setup localstorage loggedIn attribute
                        localStorage.setItem('loggedIn', 1);
                        dispatch(handleLoginSuccess());
                    } else {
                        // show error when password unmatching
                        dispatch(handleError("Invalid login credentials."));
                    }
                }
            });
        } else {
            // show an error when a user doesn't exist with associated email
            dispatch(handleError("Invalid login credentials."));
        }
    } catch (err) {
        dispatch(handleError(err.message));
    }
};

/**
 * user registration
 */
export const register = (data) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        let users = localStorage.getItem("regUsers");
        const saltRounds = 10;
        let hashedPassword = "";

        if (users) {
            users = JSON.parse(users);

            // check user existency of registered users list in localstorage by entered email
            let user = users.filter(function (el) {
                return el.email == data.email
            });
    
            if (user.length > 0) {
                // show an error when a user already exist with associated email
                dispatch(handleError("User already registered."));
            } else {
                // encryt the user entered password before save it in localstorage
                hashedPassword = await bcrypt.hash(data.password, saltRounds);
                users.push({email: data.email, password: hashedPassword});
                dispatch(handleRegSuccess(users));
            }
        } else {
            hashedPassword = await bcrypt.hash(data.password, saltRounds);
            users = [{email: data.email, password: hashedPassword}];
            dispatch(handleRegSuccess(users));
        }

    } catch (err) {
        dispatch(handleError(err.message));
    }
};

export const { setLoading, setAuthStatus, handleLoginSuccess, handleRegSuccess, handleError, 
    clearErrorMessage, logout } = userSlice.actions;
export default userSlice.reducer;