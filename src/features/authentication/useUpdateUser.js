import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCurrentUser } from "../../services/apiAuth"
import toast from "react-hot-toast"


function useUpdateUser() {
 const queryClient = useQueryClient()   
 const{mutate: updateUser, isLoading: isUpdating}=  useMutation({
         mutationFn: updateCurrentUser,
         onSuccess :({user})=>{
            toast.success("account has been updated successfully")
            queryClient.invalidateQueries({queryKey:["user"]})
            //IN CASE UPDATING THE QUERY MANUALLY 
            //queryClient.setQueryData(["user"],user)  

        },
        onError: (err) => {
            toast.error(err.message);
        }
   })

   return {updateUser,isUpdating}
}

export default useUpdateUser
