import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets"
export const StoreContext = createContext(null)

function StoreContextProvider({ children }) {

    const [cartItems, setCartItems] = useState({})


    function addToCart(id) {
        if (!cartItems[id]) {
            setCartItems((item) => ({ ...item, [id]: 1 }))
        } else {
            setCartItems((item) => ({ ...item, [id]: item[id] + 1 }))
        }
    }
    function removeFromCart(id) {
        setCartItems((item) => ({ ...item, [id]: item[id] - 1 }))
    }

    function getTotalCartAmount() {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        } return totalAmount;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider