import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import ButtonIcon from "./ButtonIcon"
import {useDarkMode} from "../contexts/darkModeContext"

function DarkmodeToggle() {

    const {isDarkMode, toggleDarkMode} = useDarkMode()
    return (
        <ButtonIcon onClick={toggleDarkMode}>
          {!isDarkMode? <HiOutlineMoon/>: <HiOutlineSun/>
          }            
        </ButtonIcon>
    )
}

export default DarkmodeToggle
