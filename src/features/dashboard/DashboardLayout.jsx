import styled from "styled-components";
import Spinner from "../../ui/Spinner"
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


function DashboardLayout() {
  const {bookings, isLoading} = useRecentBookings()
  const {stays,isLoading2,confirmedStays,numDays} = useRecentStays()
  const {cabins} = useCabins()
  if(isLoading || isLoading2) return <Spinner/>
 
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} cabinsCount= {cabins?.length} numDays={numDays} />
      <DurationChart confirmedStays={confirmedStays}/> 
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
