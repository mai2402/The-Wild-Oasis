import {useForm} from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}}) {
  const {createCabin,isCreating} =useCreateCabin()
  const {editCabin,isEditing}=useEditCabin();
  // destructuring id and the rest of cabin values 
    const { id: editId,  ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId)
  // Initialize useForm
    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession
            ? editValues
            : {}
    });
    const {errors} = formState;
    // Initialize useQueryClient to manage query cache
    


     const isWorking = isCreating || isEditing;

    // Form submit handler
    function onSubmit(data) {
      const image = typeof data.image === "string" ? data.image : data.image[0]
    if(isEditSession) editCabin({newCabinData:{...data,image},id:editId}
      ,{
      onSuccess : reset()
    })
        else createCabin({...data,image: image},{
        onSuccess : reset()
      });
        console.log(data)
    }

    function onError(errors) {
        console.log(errors)
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>

            <FormRow
                label="cabin name"
                error={errors
                ?.name
                    ?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name",{required:"This field is required"})}/>
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors
                ?.maxCapacity
                    ?.message}>
                <Input
                    disabled={isWorking}
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", {required:"This field is required", min:{ value:1, message: "capacity should be at least 1 " }, } )}/>
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors
                ?.regularPrice
                    ?.message}>
                <Input
                    disabled={isWorking}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice" ,{required:"This field is required", })}/>
            </FormRow>

            <FormRow
                label="Discount"
                error={errors
                ?.discount
                    ?.message}>
                <Input
                    disabled={isWorking}
                    type="number"
                    id="discount"
                    {...register("discount", {validate:(value)=>  value <= getValues().regularPrice || "discount should be less than regular price" })}/>
            </FormRow>

            <FormRow
                label="description"
                error={errors
                ?.description
                    ?.message}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description",{required:"This field is required"})}/>
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", { required: isEditSession ? false : "This field is required",})}/>
            </FormRow>

            <FormRow>
                <Button $variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession
                        ? "Edit Cabin"
                        : "Create new Cabin"}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
