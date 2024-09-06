import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"


function useDeleteBooking() {
   const queryClient = useQueryClient() 
   const{mutate:deleteABooking ,isLoading:isDeletingBooking}= useMutation({
    mutationFn : (bookingId)=>deleteBooking(bookingId),

    onSuccess :()=> {
        toast.success(`booking deleted successfully`)
        queryClient.invalidateQueries({
            queryKey:["bookings"]
        })
    },
    onError :()=> toast.error(`there was an error deleting booking`)
   })
   
 return{deleteABooking,isDeletingBooking}
}

export default useDeleteBooking
