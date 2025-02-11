import { createContext, useContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets"
import { AuthContext } from './AuthContext'
import axios from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
export const StoreContext = createContext(null)

function StoreContextProvider({ children }) {
    const { isAuth } = useContext(AuthContext)
    const [cartItems, setCartItems] = useState({})
    const [menuList, setMenuList] = useState([])
    const [isPayment, setIsPayment] = useState(false)
    const [paymentType, setPaymentType] = useState("")
    
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        phoneNumber: ""
    })

    function handleFormChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    async function handleFormSubmit(e) {
        e.preventDefault()
        setIsPayment(true)
        window.scrollTo(0, 0);

        try {
            let orderItems = []

            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                    const itemInfo = structuredClone(menuList.find(list => list._id === item))
                    if (itemInfo) {
                        itemInfo.quantity = cartItems[item]
                        orderItems.push(itemInfo)
                    }
                }
            }
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getTotalCartAmount(),
            }
            if (paymentType === "PayStack") {
                const responsePaystack = await axios.post('/api/order/payment/paystack', orderData)
                if (responsePaystack.data.success) {
                    const { session_url } = responsePaystack.data
                    window.location.replace(session_url)
                }
                else {
                    toast.error(responsePaystack.data.message)
                }
            }
            if (paymentType === "COD") {
                const response = await axios.post('/api/order/placeorder', orderData)
                if (response.data.success) {
                    setCartItems({})
                    navigate('/order')
                }
                else {
                    toast.error(response.data)
                }
            }

        } catch (err) {

        }
    }


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(amount);
    };



    async function getAllMenuList() {
        try {
            const response = await axios.get('/api/menu')
            setMenuList(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err.message)
        }

    }

    useEffect(() => {
        getAllMenuList()
    }, [])

    async function addToCart(itemId) {
        if (!cartItems[itemId]) {
            setCartItems((item) => ({ ...item, [itemId]: 1 }))
        } else {
            setCartItems((item) => ({ ...item, [itemId]: item[itemId] + 1 }))
        }
        try {
            const response = await axios.post('/api/cart', { itemId })
            if (response.data.success) {
                toast.success('Menu added to cart')
            }
        } catch (err) {
            console.log(err.message)
        }

    }
    async function removeFromCart(itemId) {
        setCartItems((item) => ({ ...item, [itemId]: item[itemId] - 1 }))
        try {
            const response = await axios.delete('/api/cart', {
                data: { itemId }
            })
            if (response.data.success) {
                toast.success('Menu remove from cart')
            }
        } catch (err) {
            console.log(err.message)
        }

    }

    async function getUserCart() {
        try {
            const response = await axios.get('/api/cart')
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (err) {
            console.log(err)
            toast.error('Something went Wrong!')
        }

    }
    useEffect(() => {
        if (isAuth) {
            getUserCart();
        }
    }, [isAuth])


    function getTotalCartAmount() {
        let totalAmount = 0;
        if (isAuth) {
            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                    let itemInfo = menuList.find((product) => product._id === item);
                    if (itemInfo) {
                        totalAmount += itemInfo.price * cartItems[item];
                    } else {
                        console.error(`Item with id ${item} not found in menuList.`);
                    }
                }
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        formatCurrency,
        menuList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        formData,
        setFormData,
        handleFormChange,
        handleFormSubmit,
        paymentType,
        setPaymentType,
        isPayment,
        setIsPayment
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider