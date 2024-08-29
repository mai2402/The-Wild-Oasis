import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";



export function useEditCabin(){
    const queryClient = useQueryClient();
    const {mutate: editCabin, isLoading: isEditing} = useMutation({
        mutationFn:({newCabinData,id})=> CreateEditCabin(newCabinData,id),
        onSuccess: () => {
            // Show success toast notification
            toast.success("Cabin has been edited successfully");
  
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({queryKey: ["cabins"]});
        },
        onError: (err) => {
            // Show error toast notification
            toast.error(err.message);
        }
    });
     return{editCabin,isEditing}
}