import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"
import TableOperations  from "../../ui/TableOperations"

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter filterField="discount" 
                    options={[
                            {value : "all" , label: "All"},
                            {value : "no-discount" , label: "No Discount"},
                            {value : "with-discount" , label:  "With Discount"}
                        ]}/>
            <SortBy 
                    options={[
                            {value: "name-asc" ,label:"  name from (A-Z)"},
                            {value: "name-desc" ,label:"  name from (Z-A)"},
                            {value: "regularPrice-asc" ,label:"  price((low first) "},
                            {value: "regularPrice-desc" ,label:" price high first)"},
                            {value: "maxCapacity-asc" ,label:" capacity from (low first)"},
                            {value: "maxCapacity-desc" ,label:"  capacity from (high first)"}


            ]}           />
        </TableOperations>
    )
}

export default CabinTableOperations
