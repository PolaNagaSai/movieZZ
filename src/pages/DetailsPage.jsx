import { useParams } from "react-router-dom"
import useFetchDetails from '../hooks/useFetchDetails'
import useFetch from '../hooks/useFetch';
import { useSelector } from "react-redux";
import moment from "moment";
import ScrollCard from "../components/ScrollCard";
import { useState } from "react";
import PlayVideo from "../components/PlayVideo";

const DetailsPage = () => {
  const params=useParams();
  const imgUrl=useSelector(state=>state.moviezData.imgUrl)
  const {data}=useFetchDetails(`/${params?.explore}/${params?.id}`);
  const {data:castData}=useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const{data:similar}=useFetch(`/${params?.explore}/${params?.id}/similar`);
  const[playVideo,setPlayVideo]=useState(false);
  const[videoId,setVideoId]=useState(0);

  const duration=(Number(data?.runtime)/60).toFixed(1).split('.');
  const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ")


  const handlePlayVideo=(data)=>{
    setVideoId(data);
    setPlayVideo(true);
  }
  return (
    <div>
      <div className="w-full h-[350px] relative hidden lg:block">
        <div className="w-full h-full">
          <img src={imgUrl+data?.backdrop_path} alt={data?.title} className="w-full h-full object-cover"/>
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-0 flex flex-col gap-4 lg:flex-row lg:gap-10">
        <div className=" relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img src={imgUrl+data?.poster_path} alt={data?.title} className=" w-60 h-80  object-cover rounded"/>
          <button onClick={()=>handlePlayVideo(data)} className="bg-white text-black px-3 py-2 rounded font-bold mt-4 hover:bg-orange-700 transition-all w-full">
            Play Now
          </button>
        </div>

        <div>
          <h3 className="text-xl lg:text-3xl font-bold text-white">{data?.title || data?.name}</h3>
          <p>{data?.tagline}</p>

          <div className="flex items-center gap-3 my-3">
            <p>
              Rating: {Number(data?.vote_average).toFixed(1)}
            </p>
            <span>|</span>
            <p>
              Views: {Number(data?.vote_count)}
            </p>
            <span>|</span>
            <p>Duration: {duration[0]}h {duration[1]}m</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">Overview:</h3>
            <p>{data?.overview}</p>

            <div className="flex items-center gap-3 my-3">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>Release Date: {moment(data?.release_date).format("MMMM Do YYYY")}</p>
            </div>
          </div>

          <div>
            <p><span className='text-white'>Director</span> : {castData?.crew?.slice(0,100)?.[0]?.name}</p>
            <p>
              <span className='text-white'>Writer : {writer}</span>                
            </p>
          </div>

        </div>

      </div>

        <div className="container mx-auto px-3">
            <h3 className="text-lg text-white font-bold my-2">Cast:</h3>
            <div className="grid grid-cols-[repeat(auto-fit,112px)] gap-6">
              {
                castData?.cast?.filter(p=>p?.profile_path && (p?.known_for_department==="Acting")).map((cast)=>{
                  return(
                    <div key={cast.cast_id}>
                      <img src={imgUrl+cast?.profile_path} className="w-28  h-28  rounded-full object-cover"/>
                      <p className="text-center">{cast?.name}</p>
                    </div>
                  )
                })
              }
            </div>
        </div>



        <div>
          <ScrollCard data={similar} heading={`similar ${params?.explore}`} media_type={params?.explore}/>
        </div>

        {
          playVideo && (
            <PlayVideo videoId={videoId} close={()=>setPlayVideo(false)} media_type={params?.explore}/>
          )
        }

        

    </div>
  )
}

export default DetailsPage