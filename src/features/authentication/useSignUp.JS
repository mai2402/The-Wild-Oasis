import { useMutation } from "@tanstack/react-query"
import { signUp as signUpApi } from "../../services/apiAuth"
import toast from "react-hot-toast"




function useSignUp() {
   const {mutate:signUp , isLoading}=useMutation({
    mutationFn :signUpApi,
    onSuccess: (user)=> {
        console.log(user)
        toast.success("account created successfully")
    },
   
   })

   return {signUp, isLoading}
}

export default useSignUp
