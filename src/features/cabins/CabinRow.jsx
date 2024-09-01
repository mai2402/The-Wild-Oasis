import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers"; 
import CreateCabinForm from "./CreateCabinForm"; 
import { useDeleteCabin } from "./useDeleteCabin"; 
import { useCreateCabin } from "./useCreateCabin"; 
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2"; 
import Modal from "../../ui/Modal"; 
import ConfirmDelete from "../../ui/ConfirmDelete"; 
import Table from "../../ui/Table"; 
import Menus from "../../ui/Menus"; 


const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px); // Scales the image and adjusts its position
`;


const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono"; // Specific font family used for the cabin name
`;


const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700); 
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin(); // Hook to handle the deletion state and function
  const { isCreating, createCabin } = useCreateCabin(); // Hook to handle the creation state and function

  // Destructuring the cabin object to get relevant properties
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  // Function to handle duplicating a cabin with the same data, but with a different name
  function handleDuplicateCabin() {
    createCabin({
      name: `copy of ${name}`, // The duplicated cabin will have "copy of" prefixed to the original name
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      {/* Row representing a cabin in the table */}
      <Table.Row>
        {/* Cabin image */}
        <Img src={image} alt={name} />
        
        {/* Cabin name */}
        <Cabin>{name}</Cabin>
        
        {/* Maximum capacity information */}
        <div>Fits Up To {maxCapacity} Guests</div>
        
        {/* Regular price displayed in a formatted manner */}
        <Price>{formatCurrency(regularPrice)}</Price>
        
        {/* Display discount price if available, otherwise display a dash */}
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
        
        {/* Menu with actions like duplicate, edit, and delete */}
        <div>
          <Modal>
            <Menus.Menu>
              {/* Toggle button for opening the menu */}
              <Menus.Toggle id={cabinId} />

              {/* List of menu items */}
              <Menus.List id={cabinId}>
                {/* Duplicate button */}
                <Menus.Button onClick={handleDuplicateCabin} icon={<HiSquare2Stack />}>
                  Duplicate
                </Menus.Button>

                {/* Edit button opens the CreateCabinForm modal */}
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                {/* Delete button opens the ConfirmDelete modal */}
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              {/* Modal window for editing the cabin */}
              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              {/* Modal window for confirming cabin deletion */}
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabins" // Resource name used in the confirm delete dialog
                  disabled={isDeleting} // Disable the button while the deletion process is ongoing
                  onConfirm={() => deleteCabin(cabinId)} // Trigger deletion upon confirmation
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
