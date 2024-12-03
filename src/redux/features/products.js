import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "../../data/ProductData";
import { qtyUpdateTypes } from '../../constants';

export const productSlice = createSlice({
    name: "products",
    initialState: {
        loading: false, searchKeyword: "", error: { errorStatus: false, errorMessage: "" },
        success: { successStatus: false, successMessage: "" }, list: [], 
        cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
        cartTotalAmount: localStorage.getItem("total") ? parseInt(localStorage.getItem("total")) : 0,
        cartTotalItems: localStorage.getItem("items") ? parseInt(localStorage.getItem("items")) : 0,
    },
    reducers: {
        getProducts: (state) => {
            state.loading = true;
            state.list = ProductData;
            state.loading = false;
        },
        handleError: (state, action) => {
            state.loading = false;
            state.error.errorStatus = true;
            state.error.errorMessage = action.payload;
        },
        clearError: (state) => {
            state.error.errorStatus = false;
            state.error.errorMessage = "";
        },
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
        searchProduct: (state) => {
            state.loading = true;
            let productList = state.list;
            let keyword = state.searchKeyword;
            let filteredList = [];

            // search products by keyword
            if (productList.length > 0) { 
                filteredList = productList.filter((item) =>
                    Object.values(item).some((value) =>
                        value.toString().toLowerCase().includes(keyword.toLowerCase())
                    )
                );
            }
    
            state.loading = false;
            state.list = filteredList;
        },
        addToCart: (state, action) => {
            const product = action.payload.product;
            const quantity = action.payload.quantity;
            let cartItems = state.cart;
            let totalAmount = state.cartTotalAmount;
            let totalItems = state.cartTotalItems;
            let message = "";

            // find the index of a item in cart by id
            const index = cartItems.findIndex((item) => item.id === product.id);

            // find the existence of a product in cart by id
            const existProduct = cartItems.find(item => item.id === product.id);

            if (index !== -1 && existProduct) {
                // update product qty and subTotal if this item is already exist in cart list
                existProduct.qty = existProduct.qty + quantity;
                existProduct.subTotal = existProduct.subTotal + (existProduct.price * quantity);

                // calc total cart amount
                totalAmount = totalAmount + (existProduct.price * quantity);

                // calc total cart item count
                totalItems = totalItems + quantity;

                cartItems.splice(index, 1);
                cartItems.push(existProduct);

                message = "Product already exist in cart. Updated Qty Successfully.";
            } else {
                let tmpProduct = { ...product, qty: quantity, subTotal: (product.price * quantity) };

                // calc total cart amount
                totalAmount = totalAmount + (product.price * quantity);

                // calc total cart item count
                totalItems = totalItems + quantity;

                // push new product to cart
                cartItems.push(tmpProduct);
                
                message = "Added product to cart successfully.";
            }

            state.cart = cartItems;
            state.cartTotalAmount = totalAmount;
            state.cartTotalItems = totalItems;
            state.success.successStatus = true;
            state.success.successMessage = message;

            // call function for update localstorage cart details
            updateLocalStorageCart(cartItems, totalAmount, totalItems);
        },
        removeProduct: (state, action) => {
            let cartItems = state.cart;

            // find the index of a item in cart by id
            const index = cartItems.findIndex((item) => item.id === action.payload);

            const product = cartItems[index];

            // remove particular item by cart
            if (index !== -1) {
                cartItems.splice(index, 1);
            }

            // calc total cart amount and item count
            let totalAmount = cartItems.reduce((sum, item) => sum + (item.subTotal || 0), 0);
            let totalItems = cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);

            state.cart = cartItems;
            state.cartTotalAmount = totalAmount;
            state.cartTotalItems = totalItems;

            // call function for update localstorage cart details
            updateLocalStorageCart(cartItems, totalAmount, totalItems);
        },
        updateItemQty: (state, action) => {
            const product = action.payload.product;
            const actionType = action.payload.type;
            let cartItems = state.cart;
            let totalAmount = state.cartTotalAmount;
            let totalItems = state.cartTotalItems;

            // find the index of a item in cart by id
            const index = cartItems.findIndex((item) => item.id === product.id);

            if (actionType === qtyUpdateTypes.increase) {
                // increase cart item qty and relavant sub total
                cartItems[index].qty = product.qty + 1;
                cartItems[index].subTotal = product.subTotal + product.price;
                totalAmount = totalAmount + product.price;
                totalItems = totalItems + 1;

            } else if (actionType === qtyUpdateTypes.decrease) {
                // decrease cart item qty and relavant sub total
                cartItems[index].qty = product.qty - 1;
                cartItems[index].subTotal = product.subTotal - product.price;
                totalAmount = totalAmount - product.price;
                totalItems = totalItems - 1;
            }

            state.cart = cartItems;
            state.cartTotalAmount = totalAmount;
            state.cartTotalItems = totalItems;

            // call function for update localstorage cart details
            updateLocalStorageCart(cartItems, totalAmount, totalItems);
        },
        clearSuccess: (state) => {
            state.success.successStatus = false;
            state.success.successMessage = "";
        },
        clearCart: (state) => {
            state.cart = [];
            state.cartTotalAmount = 0;
            state.cartTotalItems = 0;
        },
    },
});

/**
 * update search keyword
 */
export const setKeyword = (keyword) => async (dispatch) => {
    dispatch(setSearchKeyword(keyword));
}

/**
 * add product to cart list
 */
export const addCartItem = (product, quantity) => async (dispatch) => {
    dispatch(addToCart({product, quantity}));
}

/**
 * remove item from cart list
 */
export const removeCartItem = (id) => async (dispatch) => {
    dispatch(removeProduct(id));
}

/**
 * update item qty from cart list
 */
export const updateCartItemQty = (product, type) => async (dispatch) => {
    dispatch(updateItemQty({product, type}));
}

/**
 * update cart details in localstorage
 */
const updateLocalStorageCart = (cartItems, totalAmount, totalItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('total', totalAmount);
    localStorage.setItem('items', totalItems);
}

export const { getProducts, handleError, clearError, setSearchKeyword, searchProduct, addToCart,
    removeProduct, updateItemQty, clearSuccess, clearCart } = productSlice.actions;
export default productSlice.reducer;