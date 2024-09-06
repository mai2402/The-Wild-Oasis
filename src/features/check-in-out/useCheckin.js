import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { updateBooking } from "../../services/apiBookings";



function useCheckin() {
   const queryClient = useQueryClient()
   const navigate = useNavigate();
   const{mutate :checkin  , isLoading: isCheckingIn}= useMutation({

    mutationFn : ({bookingId,breakfastData})=> updateBooking(bookingId,{
        isPaid : true,
        status: "checked-in",
        ...breakfastData,
        
    }),

    onSuccess: (data)=>{
        toast.success(`Booking ${data.id} successfully checked-in`)
        queryClient.invalidateQueries({
            queryKey: [{active : true}]
        })
        navigate("/")
    },

    onError :()=>{
        toast.error("There was an error while checking-in ")
    } 
   
   })

   return{checkin,isCheckingIn}
}

export default useCheckin
