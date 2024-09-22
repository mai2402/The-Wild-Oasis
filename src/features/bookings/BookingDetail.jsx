import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {

  const {isLoading,booking} = useBooking()
  const {isCheckingOut,checkOut} = useCheckOut()
  const {deleteABooking,isDeletingBooking}= useDeleteBooking()
  const moveBack = useMoveBack();
  const {status,id:bookingId} = booking
  const navigate = useNavigate()
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  
  if(isLoading) return <Spinner/>
  if(!booking) return <Empty resourceName="booking" />
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

       <BookingDataBox booking={booking} /> 

      <ButtonGroup>
      { status === "checked-in" && <Button disabled={isCheckingOut} icon={<HiArrowUpOnSquare/>}  onClick={()=>checkOut(bookingId)}> Check out
      </Button>}
     { status === "unconfirmed" && <Button icon={<HiArrowDownOnSquare/>}  onClick={()=>navigate(`/checkin/${bookingId}`)}> Check in
      </Button>}

  <Modal>
                <Modal.Open opens="delete">
                  <Button variation="danger" icon={<HiTrash />}>Delete booking</Button>
                </Modal.Open>
                 
                <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="booking" // Resource name used in the confirm delete dialog
                  disabled={isDeletingBooking} // Disable the button while the deletion process is ongoing
                  onConfirm={() =>{ deleteABooking(bookingId)
                    navigate("/bookings")
                  }} // Trigger deletion upon confirmation
                  />
              </Modal.Window>
  </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
