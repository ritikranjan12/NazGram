import { getCurrUser } from "@/lib/appwrite/api";
import { IContext, IUser } from "@/types";
import {useContext,useEffect,useState,createContext} from "react";
import {useNavigate} from "react-router-dom"
export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email:'',
  imageUrl:'',
  bio:''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading:false,
    isAuthenticated:false,
    setUser: ()=>{},
    setisAuthenticated: ()=>{},
    checkAuthUser: async() => false as boolean
}

const AuthContext = createContext<IContext>(INITIAL_STATE)

export function AuthProvider ({children} : {children : React.ReactNode}){
    const navigate = useNavigate()
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setisLoading] = useState(false)
    const [isAuthenticated, setisAuthenticated] = useState(false)

    const checkAuthUser = async() => {
        try {
            setisLoading(true)
            const currAccount = await getCurrUser()

            if(currAccount){
                setUser({
                    id: currAccount.$id,
                    name: currAccount.name,
                    username: currAccount.username,
                    email: currAccount.email,
                    imageUrl: currAccount.imageUrl,
                    bio: currAccount.bio
                })
            }
            setisAuthenticated(true)
            setisLoading(false)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally{
            setisLoading(false)
        }
    }
    const value = {
        user,
        setUser,
        isLoading,
        setisLoading,
        isAuthenticated,
        setisAuthenticated,
        checkAuthUser
    }

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
          cookieFallback === "[]" ||
          cookieFallback === null ||
          cookieFallback === undefined
        ) {
          navigate("/sign-in");
        }
    
        checkAuthUser();
      }, []);
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
