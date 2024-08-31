import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from "../../ui/Spinner"
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const {isLoading, 
    // made settings eq {} so we can destructure from an empty obj
    settings :{minBookingLength,maxBookingLength,maxGuestPerBooking,breakfastPrice}={},} = useSettings()
  const {updateSetting, isUpdating} = useUpdateSetting();
  
  function handleUpdateSetting(e,field){
      const value = e.target.value;
       
      if(!value) return;
      updateSetting({[field]:value})

  }
   {isLoading && <Spinner/>}
 

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength}
               onBlur={(e)=> handleUpdateSetting(e,"minBookingLength")}
               disabled={isUpdating} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength}
               onBlur={(e)=> handleUpdateSetting(e,"maxBookingLength")}
               disabled={isUpdating} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestPerBooking}
               onBlur={(e)=> handleUpdateSetting(e,"maxGuestPerBooking")}
               disabled={isUpdating} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice}
               onBlur={(e)=> handleUpdateSetting(e,"breakfastPrice")}
               disabled={isUpdating} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
