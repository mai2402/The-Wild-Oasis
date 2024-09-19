import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp.JS";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {register,formState,getValues,handleSubmit,reset}= useForm()
  const {errors}= formState;
  const {signUp , isLoading}= useSignUp()
  function onSubmit({fullName,password,email}){
     signUp({fullName,email,password},
      {
        onSettled: reset,
      }
      
     )
     
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register("fullName",
               {required: "This field is required"})} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register("email",
              {required:"This field is required",
               pattern:{
                value:/\S+@\S+\.\S+/,
                message: "please enter a valid email address"
               } 
              },)} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register("password",
              {required:"This field is required",
               minLength:{
                value:8,
                message:"password minimum of 8 characters"
               } 
              })}  />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register("passwordConfirm",
              {required:"This field is required",
               validate:(value)=> value === getValues().password||
               "passwords need to match" 
              })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button   variation="primary" disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
