import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import Card from "../components/Card";


const SearchPage = () => {

  const location=useLocation();
  const[data,setData]=useState([]);
  const[pageNo,setPageNo]=useState(1);
  const navigate=useNavigate();


  const fetchData = async()=>{
    try {
        const response = await axios.get(`/search/multi`,{
          params : {
            query:location?.search?.slice(3),
            page : pageNo
          }
        })
        setData((preve)=>{
          return[
              ...preve,
              ...response.data.results
          ]
        })
    } catch (error) {
        console.log('error',error)
    }
  }

  const handleScroll=()=>{
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        setPageNo((prevPageNo) => prevPageNo + 1);
    }
  }

  useEffect(()=>{
    fetchData();
  },[pageNo])


  useEffect(()=>{
    setPageNo(1);
    setData([]);
    fetchData();
  },[location?.search])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []); // Run only once on mount

  return (
    <div className="py-16">
      <div className="lg:hidden mx-1 my-2 sticky top-16 z-20">
        <input type="text" 
        placeholder="Search..." 
        onChange={(e)=>navigate(`/search?q=${(e.target.value)}`)}
        className="px-4 py-1 w-full text-lg bg-transparent bg-white rounded-full text-neutral-900 outline-none "
        />
      </div>
      <div className="container mx-auto">
        <h3 className="text-lg lg:text-lg capitalize font-bold my-2">Search Results</h3>
        <div className="grid grid-cols-[repeat(auto-fit,250px)] gap-10 justify-center">
            {
              data.map((searchData,index)=>{
                return(
                  <Card key={`${searchData.id} `+ `searchData${index}`} data={searchData} media_type={searchData.media_type}/>
                )
              })
            }
          </div>
      </div>
    </div>
  )
}

export default SearchPage