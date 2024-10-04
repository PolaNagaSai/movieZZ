/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux"
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BannerHome = () => {
    const bannerData=useSelector(state=>state.moviezData.bannerData)
    const imgUrl=useSelector(state=>state.moviezData.imgUrl)
    const[currentImage,setCurrentImage]=useState(0);


    const handleNext=()=>{        
        if(currentImage < bannerData.length - 1){
            setCurrentImage(pre=>pre+1)
        }
    }

    const handlePrev=()=>{
        if(currentImage > 0){
            setCurrentImage(pre=>pre-1)
        }
    }

    useEffect(()=>{
        const interval=setInterval(()=>{
            if(currentImage <bannerData.length -1){
                handleNext();
            }else{
                setCurrentImage(0);
            }
        },4000)

        return ()=>{clearInterval(interval)}
    },[bannerData, imgUrl, currentImage])

  return (
    <section className=" w-full h-full">
        <div className=" flex min-h-full max-h-[95vh] overflow-hidden">
            {
                bannerData.map((data,index)=>{
                    return(
                        <div key={data.id+"bannerHome"+index} className=" min-w-full min-h-[450px] lg:min-h-full relative overflow-hidden group transition-all" style={{transform:`translateX(${-currentImage*100}%)` }}>
                            <div className="w-full h-full" >
                                <img src={imgUrl+data.backdrop_path} className="h-full w-full object-cover"/>
                            </div>


                            {/* next /previous button */}
                            <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:flex">
                                <button onClick={handlePrev} className="bg-white text-2xl p-2 rounded-full z-10"><FcPrevious/></button>
                                <button onClick={handleNext} className="bg-white text-2xl p-2 rounded-full z-10"><FcNext/></button>
                            </div>


                            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent">
                            </div>

                            <div className="container mx-auto absolute bottom-0 max-w-md px-3">
                                <h1 className=" text-white font-bold text-2xl lg:text-4xl">
                                    {/* {data.media_type==='movie' ? data.title : data.media_type==='tv'? data.name: null} */}
                                    {data?.title || data?.name}
                                </h1>
                                <p className="text-ellipsis line-clamp-3 my-3 ">{data.overview}</p>
                                <div className="flex gap-4">
                                    <p>Rating:{Number(data.vote_average).toFixed(1)}+</p>
                                    <span>|</span>
                                    <p>View:{Number(data.vote_count).toFixed(0)}</p>
                                </div>
                                <Link to={`/${data?.media_type}/${data?.id}`}>
                                    <button className="bg-white text-black px-3 py-2 rounded font-bold mt-4 hover:bg-orange-700 transition-all">
                                        Play Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) 
                })
            }
        </div>
    </section>
  )
}

export default BannerHome