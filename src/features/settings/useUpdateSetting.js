import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting(){
    const queryClient = useQueryClient();
    const {mutate: updateSetting, isLoading: isUpdating} = useMutation({
        mutationFn:updateSettingApi,
        onSuccess: () => {
            // Show success toast notification
            toast.success("settings has been updated successfully");
  
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({queryKey: ["settings"]});
        },
        onError: (err) => {
            // Show error toast notification
            toast.error(err.message);
        }
    });
     return{updateSetting,isUpdating}
}