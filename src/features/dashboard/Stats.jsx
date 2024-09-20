import { HiOutlineBriefcase} from "react-icons/hi";
import Stat from "./Stat"
import { HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";


function Stats({bookings, confirmedStays,numDays,cabinsCount}) {

    //1.
     const numBookings = bookings.length;
    //2.
     const sales = bookings?.reduce((acc,curr)=>acc+ curr?.totalPrice, 0)
    //3. 
     const checkIns = confirmedStays?.length;
    //4.
     const occupation =  confirmedStays?.reduce((acc, cur)=> acc + cur?.numNights , 0) /(numDays * cabinsCount)
    return (
        <>
        <Stat 
        title="Bookings"
        value={numBookings}
        color="blue"
        icon={<HiOutlineBriefcase/>}/>
        <Stat
         title="Sales"
         value={formatCurrency(sales)}
         color="green"
         icon={<HiOutlineBanknotes/>}/>
        <Stat
         title="Check-ins"
         value={checkIns}
         color="indigo"
         icon={<HiOutlineCalendarDays/>}/>
        <Stat
         title="Occupancy rate"
         value={Math.round(occupation * 100 ) + "%"}
         color="yellow"
         icon={<HiOutlineChartBar/>}/>
            
        </>
    )
}

export default Stats
