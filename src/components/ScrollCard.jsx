/* eslint-disable react/prop-types */


import { useRef } from "react"
import Card from "./Card"


const ScrollCard = ({data=[],heading,media_type}) => {
    const containerRef=useRef();

   
  return (
    <div className="container mx-auto px-3 my-10">
        <h2 className="text-xl lg:text-2xl fonr-bold text-white mb-2 capitalize">{heading}</h2>
        <div>
          <div ref={containerRef} className="grid grid-cols-[repeat(auto-fit,250px)] gap-6 grid-flow-col overflow-x-scroll scroll-smooth transition-all scrollbar-none">
                {
                data.map((data,index)=>{
                    return(
                    <Card key={data.id+"heading"+index} data={data} index={index+1} trending={true} media_type={media_type}/>
                    )
                })
                }
          </div>
        </div>
      </div>
  )
}

export default ScrollCard