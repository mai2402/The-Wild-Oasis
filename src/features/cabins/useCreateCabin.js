import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateEditCabin } from "../../services/apiCabins";


export function useCreateCabin(){


    const queryClient = useQueryClient();

    // Initialize useMutation for handling form submission
    const {mutate: createCabin, isLoading: isCreating} = useMutation({
        mutationFn: CreateEditCabin,
        onSuccess: () => {
            // Show success toast notification
            toast.success("Cabin has been created successfully");

            // Invalidate queries to refresh data
            queryClient.invalidateQueries({queryKey: ["cabins"]});

        },
        onError: (err) => {
            // Show error toast notification
            toast.error(err.message);
        }
    });
    return {isCreating, createCabin}
}