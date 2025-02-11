import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { AuthContext } from '../../Context/AuthContext'
function Navbar() {
    const [menu, setMenu] = useState("home")
    const { getTotalCartAmount } = useContext(StoreContext)
    const { setLogin, isAuth, handleUserLogout } = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <div className="navbar">
            <Link to="/"><img src={assets.logo} alt="" /></Link>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
            </ul>
            <div className="navbar-right">
                <div className="navbar-cart-icon">
                    {!isAuth ?
                        <img src={assets.basket_icon} alt="" onClick={() => setLogin(true)} />
                        :
                        <Link to="/cart"><img src={assets.basket_icon} alt="" onClick={() => {
                            if (!isAuth) setLogin(true)
                        }} /></Link>
                    }

                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {
                    isAuth &&
                    <div className='navbar-profile-icon'>
                        <img src={assets.profile_icon} alt="" />
                        <div className='profile-container'>
                            <div>
                                <img src={assets.bag_icon} alt="" />
                                <Link to="/order"><p>My Orders</p></Link>
                            </div>
                            <hr />
                            <div>
                                <img src={assets.logout_icon} alt="" />
                                <p onClick={() => {
                                    handleUserLogout()
                                    navigate('/')
                                }}>Logout</p>
                            </div>


                        </div>
                    </div>
                }






                {!isAuth &&
                    <button onClick={() => setLogin(true)}>Sign-in</button>
                }

            </div>
        </div >
    )
}

export default Navbar
