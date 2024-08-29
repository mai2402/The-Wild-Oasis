import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabins as deleteCabinApi } from "../../services/apiCabins"
import toast from "react-hot-toast"


export function useDeleteCabin(){

const queryClient = useQueryClient()

const {isLoading:isDeleting,mutate : deleteCabin} =useMutation({
  mutationFn: deleteCabinApi,
  onSuccess :()=>{
    toast.success("cabin deleted successfully")
    queryClient.invalidateQueries({
      queryKey:["cabins"]
    })

  },
  onError: (err)=> toast(err.message)
})

return {deleteCabin,isDeleting}
}