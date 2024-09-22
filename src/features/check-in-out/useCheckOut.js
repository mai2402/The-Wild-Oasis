
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";



function useCheckOut() {
   const queryClient = useQueryClient()
   const navigate = useNavigate()

   const{mutate :checkOut  , isLoading: isCheckingOut}= useMutation({

    mutationFn : (bookingId)=> updateBooking(bookingId,{
        status : "checked-out"
    }),

    onSuccess: (data)=>{
        toast.success(`Booking ${data.id} successfully checked-out`)
         queryClient.invalidateQueries({
            queryKey:["bookings",data]
         })
         navigate("/")
    },

    onError :()=>{
        toast.error("There was an error while checking-out ")
    } 
   
   })

   return{checkOut,isCheckingOut}
}

export default useCheckOut