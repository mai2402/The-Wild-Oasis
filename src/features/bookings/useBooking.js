import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";


export function useBooking(){

    const {bookingId} = useParams()
    const {isLoading,error,data:booking ={}}= useQuery({
        queryKey : ['booking',bookingId],
        queryFn:()=> getBooking(bookingId),
        retry:false
      })
      console.log(booking,"book")
      return {isLoading,error,booking}
}