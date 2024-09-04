import { useSearchParams } from "react-router-dom";


 export function useURL(filterField) {
    const [searchParams,setSearchParams] = useSearchParams()
   
    function handleChange(value){
         searchParams.set(filterField,value)
         setSearchParams(searchParams);
    }

    return {handleChange,searchParams}
}


