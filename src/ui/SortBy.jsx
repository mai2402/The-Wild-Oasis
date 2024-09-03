import { useSearchParams } from "react-router-dom"
import Select from "./Select"
import { useURL } from "../features/cabins/useURL"

 

function SortBy({options}) {
//     const [ searchParams, setSearchParams]= useSearchParams()
   
    

//     function handleChange(e){

//      searchParams.set("sortBy",e.target.value)
//      setSearchParams(searchParams)

// }


const {searchParams, handleChange} = useURL("sortBy")
const sortBy = searchParams.get('sortBy') || " ";

   return <Select type="white" 
                  value={sortBy}
                  onChange={(e)=>handleChange(e.target.value)} 
                  options={options}/>
}

export default SortBy
