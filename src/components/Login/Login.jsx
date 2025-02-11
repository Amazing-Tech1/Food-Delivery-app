import React, { useState, useEffect, useContext, useRef } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { AuthContext } from '../../Context/AuthContext'
function Login() {

    const { currState, setCurrState, email, setEmail, username, setUsername, password, setPassword, handleUserAuthentication, setLogin, login, passwordRegex } = useContext(AuthContext)

    const userRef = useRef()
    const passwordRef = useRef()
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    useEffect(()=>{
        if(passwordRegex.test(password)){
            setIsPasswordFocused(false)
        }
        },[password])
        

    useEffect(() => {
        if (login) userRef.current.focus()
    }, [login, currState])

    return (
        <div className='login'>
            <form className="login-container" onSubmit={handleUserAuthentication}>
                <div className="login-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-inputs">
                    {currState === "Login" ? <></> : <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} ref={currState === "Sign Up" ? userRef : null} required />}
                    <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required ref={currState === "Login" ? userRef : null} />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)}
                    />
                </div>
                {isPasswordFocused && currState === 'Sign Up' && (
                    <p ref={passwordRef} className='password-info'>  ** Password must be 8+ characters with an uppercase, with a number & special character.</p>
                )}
                <button type='submit'>{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-condition">
                    {currState === "Sign Up" &&
                        <>
                            <input type="checkbox" required />
                            <p>By continuing, i agree to the terms of use & privacy policy. </p>
                        </>
                    }

                </div>
                {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")} >Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span> </p>}
            </form>
        </div>
    )
}

export default Login
