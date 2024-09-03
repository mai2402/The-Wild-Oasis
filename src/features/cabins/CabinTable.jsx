import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {

  const { isLoading, cabins } = useCabins();
  
  // Access search params from the URL for filtering and sorting
  const [searchParams] = useSearchParams();
  
  // Get the filter value (default to 'all' if not present)
  const filteredValue = searchParams.get('discount') || 'all';
  
  // Initialize an empty array for filtered cabins to avoid undefined errors
  let filteredCabin = [];

  // Ensure cabins data is available before filtering
  if (cabins) {
    // Apply filtering based on the discount value
    if (filteredValue === 'all') filteredCabin = cabins;
    if (filteredValue === 'no-discount') filteredCabin = cabins.filter(cabin => cabin.discount === 0);
    if (filteredValue === 'with-discount') filteredCabin = cabins.filter(cabin => cabin.discount > 0);
  }

  // Sorting logic: Get the sort field and direction (default to 'startDate-asc')
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  
  // Destructure the sort field and direction ('asc' or 'desc')
  const [field, direction] = sortBy.split("-");
  
  // Determine the sorting modifier based on direction (1 for ascending, -1 for descending)
  const modifier = direction === "asc" ? 1 : -1;

  // Apply sorting to the filtered cabins array
  const sortedCabins = filteredCabin?.sort((a, b) => (a[field] - b[field]) * modifier);

  // Display a spinner while data is loading
  if (isLoading) return <Spinner />;
  
  
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
