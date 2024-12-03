import Home from "../pages/home";
import Login from "../pages/login";
import Registration from "../pages/registration";
import ShoppingCart from "../pages/shoppingCart"; 

// routes
export const pageRoutes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/registration",
        name: "Registration",
        component: Registration
    },
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/cart",
        name: "ShoppingCart",
        component: ShoppingCart
    }
];