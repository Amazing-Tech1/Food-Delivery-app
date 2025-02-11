import { createContext, useState, useEffect } from "react";
import axios from "../../axios";
import { toast } from 'react-toastify'

export const AuthContext = createContext(null)

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,24}$/;


function AuthContextProvider({ children }) {
  const [login, setLogin] = useState(false)
  const [currState, setCurrState] = useState("Login")
  const [isAuth, setIsAuth] = useState(() => {
    const storedAuth = localStorage.getItem('isAuth');
    const storedTimestamp = localStorage.getItem('authTimestamp');

    if (storedAuth && storedTimestamp) {
      const currentTime = Date.now();
      const oneHour = 60 * 60 * 1000;

      if (currentTime - storedTimestamp < oneHour) {
        return JSON.parse(storedAuth);
      } else {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('authTimestamp');
        return false;
      }
    }
    return false;
  })
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isAuth) {
      const timestamp = Date.now();
      localStorage.setItem('isAuth', JSON.stringify(isAuth));
      localStorage.setItem('authTimestamp', timestamp);
    } else {
      localStorage.removeItem('isAuth');
      localStorage.removeItem('authTimestamp');
    }
  }, [isAuth]);


  async function handleUserAuthentication(e) {
    e.preventDefault()
    try {
      if (currState === "Sign Up") {
        const response = await axios.post('api/register', { username, email, password, })

        if (response.data.success) {
          setCurrState("Login")
          setUsername("")
          setEmail("")
          setPassword("")
          toast.success("Account Successfully Created")
        }
      }
      else {
        const response = await axios.post('api/login', { email, password })

        if (response.data.success) {
          setLogin(false)
          setIsAuth(true)
          setEmail("")
          setPassword("")
          toast.success("Hello Welcome!")

        }
      }
    } catch (err) {

    }

  }
  async function handleUserLogout() {
    const response = await axios.get('api/logout')
    if (response.data.success) {
      setIsAuth(false)
      localStorage.removeItem('isAuth');
      localStorage.removeItem('authTimestamp');
    }

  }

  const contextValue = {
    email, setEmail, username, setUsername, password, setPassword, isAuth, currState, setCurrState, handleUserAuthentication, login, setLogin, passwordRegex, handleUserLogout
  }
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
} export default AuthContextProvider