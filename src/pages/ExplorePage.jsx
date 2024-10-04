/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */


import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import Card from "../components/Card";
import axios from "axios";


const ExplorePage = () => {
  const params=useParams();
  const[pageNo,setPageNo]=useState(1);
  const[data,setData]=useState([]);
  const[totalPages,setTotalPages]=useState(0);

  const fetchData = async()=>{
    try {
        const response = await axios.get(`/discover/${params?.explore}`,{
          params : {
            page : pageNo
          }
        })
        setData((preve)=>{
          return[
              ...preve,
              ...response.data.results
          ]
        })
        setTotalPages(response.data.total_pages)
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
    setPageNo(1)
    setData([])
    fetchData()
  },[params.explore])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []); // Run only once on mount

  return (
    <div className="py-16">
        <div className="container mx-auto ">
          <h3 className="text-lg lg:text-lg capitalize font-bold my-2 ">{params.explore}</h3>
          <div className="grid grid-cols-[repeat(auto-fit,250px)] gap-10 justify-center">
            {
              data.map((exploreData,index)=>{
                return(
                  <Card key={`${exploreData.id} `+ `exploreData${index}`} data={exploreData} media_type={params.explore}/>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default ExplorePage