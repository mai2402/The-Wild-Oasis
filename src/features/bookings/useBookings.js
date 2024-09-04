import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";


export function useBookings(){

  const [searchParams] = useSearchParams()
  //filter
  const filterValue = searchParams.get("status")

  const filter = !filterValue || filterValue === 'all' ?
   null : 
   {field : "status" , value : filterValue}
  // sort

  const sortByRow = searchParams.get("sortBy") || "startDate-asc";

  const [field,direction] = sortByRow.split("-")

  // const modifier = direction === "asc" ? 1:-1;

  // const sortedBookings = filter.sort((a,b)=>(a[field]- b[field])*modifier);
  const sortBy = {field,direction}

    const {isLoading,error,data:bookings}= useQuery({

        queryKey : ['bookings',filter,sortBy],
        queryFn: ()=>getBookings({filter,sortBy})
      })
     
      return {isLoading,error,bookings}
}