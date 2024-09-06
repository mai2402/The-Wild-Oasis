import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Checkbox from "../../ui/Checkbox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner"
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import {useSettings} from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  
   const [ConfirmPaid,setConfirmPaid] = useState(false)
   const [ isAddBreakfast, setIsAddBreakfast] = useState(false)
   const {isLoading,booking} = useBooking()
   const {checkin , isCheckingIn} = useCheckin()
   const {settings, isLoading:isLoadingSettings} = useSettings()
   const moveBack = useMoveBack();

   useEffect(()=>{
    setConfirmPaid(booking?.isPaid || false)
   },[booking])

  const {
    id: bookingId,
    guests,
    totalPrice,
    numOfGuests,
    hasBreakfast,
    numNights,
    extrasPrice,
  } = booking;

  const breakFast = settings?.breakfastPrice
  

  const optionalBreakfast = breakFast * numNights *numOfGuests

 const totalPriceWithBreakfast = totalPrice +optionalBreakfast
  
  function handleCheckin() {

     if (!ConfirmPaid) return;

     const breakfastData = isAddBreakfast
     ? {
         hasBreakfast: true,
         extrasPrice: optionalBreakfast,
         totalPrice: totalPriceWithBreakfast,
       }
     : {};

        checkin({bookingId,breakfastData})
       

  }

 




  if(isLoading || isLoadingSettings) return <Spinner/>

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} optionalBreakfast={optionalBreakfast} /> 
     { !hasBreakfast && (<Box>
        <Checkbox checked={isAddBreakfast}
                  onChange={()=>setIsAddBreakfast(add=>!add)} 
                  disabled={ isAddBreakfast}
                  id="breakfast">
                   do you want to add breakfast for {" "} {formatCurrency(optionalBreakfast)}

        </Checkbox>
      </Box>)}
      <Box>
        <Checkbox checked={ConfirmPaid} 
                  onChange={()=>setConfirmPaid(confirm=>!confirm)}
                  disabled={ConfirmPaid || isCheckingIn}
                  id="confirm">
         I confirm that {guests.fullName} has paid the total amount of {" "} {!isAddBreakfast ? 
          formatCurrency(totalPrice):
          ` ${formatCurrency(totalPriceWithBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!ConfirmPaid  || isCheckingIn}>Check in booking #{bookingId} </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
