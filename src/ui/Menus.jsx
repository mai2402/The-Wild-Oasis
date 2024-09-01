import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutSideClick } from "../features/cabins/useOutSideClick"; // Custom hook to detect outside clicks

// Styled components for the Menu and its elements
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
 // Dynamically sets position based on context
  right: ${(props) => props.position.x}px; 
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// Context to manage the state of the menus
const MenusContext = createContext();

function Menus({ children }) {
  // State for menu position and currently open menu ID
  const [position, setPosition] = useState(null);
  const [openId, setOpenId] = useState("");

  // Functions to open and close menus
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>
      <div>{children}</div>
    </MenusContext.Provider>
  );
}

// Toggle component to handle menu visibility
function Toggle({ id }) {
  const { close, open, openId, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    // Calculate the position of the menu based on button's position
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    // Toggle the menu visibility
    openId === " " || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

// List component that renders menu options if the current menu is open
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const { ref } = useOutSideClick(close); // Close the menu when clicking outside

  if (openId !== id) return null; // Don't render if this menu isn't open

  // Render the menu using a portal to attach it to the document body
  return createPortal(
    <StyledList ref={ref} position={position}>{children}</StyledList>,
    document.body
  );
}

// Button component for menu items
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.(); // Trigger onClick if provided
    close(); // Close the menu after clicking the button
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}


Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;

export default Menus;

