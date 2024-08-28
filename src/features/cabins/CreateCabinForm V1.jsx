import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  // Initialize useForm 
  const { register, handleSubmit, reset,getValues,formState } = useForm();
  const {errors} =formState;
  // Initialize useQueryClient to manage query cache
  const queryClient = useQueryClient();
  
  // Initialize useMutation for handling form submission
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: CreateCabin, 
    onSuccess: () => {
      // Show success toast notification
      toast.success("Cabin has been created successfully");
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
      
      // Reset form after successful mutation
      reset();
    },
    onError: (err) => {
      // Show error toast notification
      toast.error(err.message);
    },
  });

  // Form submit handler
  function onSubmit(data) {
    
    mutate({...data,image: data.image[0]});
    console.log(data)
  }

  function onError (errors){
    console.log(errors)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>

      <FormRow label="cabin name" error={errors?.name?.message}>
        <Input  type="text" id="name"{...register("name",{required:"This field is required"})} />
      </FormRow>

          
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input  disabled={isCreating} type="number" id="maxCapacity" {...register("maxCapacity",
          {required:"This field is required",
            min:{
              value:1,
              message: "capacity should be at least 1 "
          },
            
            }
          )} />
      </FormRow>

      <FormRow label="Regular price"  error={errors?.regularPrice?.message}>
        <Input disabled={isCreating} type="number" id="regularPrice"
         {...register("regularPrice"
        ,{required:"This field is required",
        })}  />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input disabled={isCreating} type="number" id="discount" defaultValue={0} 
        {...register("discount",
        {required:"This field is required",
          validate:(value)=> value <= getValues().regularPrice || "discount should be less than regular price"
        })}  />
      </FormRow>

      <FormRow label="discription" error={errors?.discription?.message}>
        <Textarea type="number" id="discription" defaultValue="" {...register("discription",{required:"This field is required"})}  />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
