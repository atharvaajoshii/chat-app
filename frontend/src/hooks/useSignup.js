import toast from "react-hot-toast";
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const {authUser,setAuthUser} = useAuthContext();
    const signup = async ({fullname, username, password, confirmpassword, gender}) => {
        const success = handleInputErrors({ fullname, username, password, confirmpassword, gender })
        if (!success) return;
        setLoading(true)
        try {
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({ fullname, username, password, confirmpassword, gender })
            })
            const data = await res.json();
            if(data.error){throw new Error(data.error)}


            localStorage.setItem("chat-user",JSON.stringify(data))

            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading,signup}
}

export default useSignup

function handleInputErrors({ fullname, username, password, confirmpassword, gender }) {
    if (!fullname || !username || !password || !confirmpassword || !gender) {
        toast.error("please fill everything")
        return false
    }
    if (password !== confirmpassword) {
        toast.error("pass doesnt match")
        return false
    }
    if(password.length<6){
        toast.error("password length less")
        return false
    }
    return true
}