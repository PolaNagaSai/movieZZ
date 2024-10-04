/* eslint-disable react/prop-types */
import moment from "moment"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Card = ({data,index,trending,media_type}) => {
const imgUrl=useSelector(state=>state.moviezData.imgUrl);

const mediaType=data.media_type ??  media_type;

  return (
    <Link to={`/${mediaType}/${data.id}`} className="w-full min-w-[230px] max-w-[250px] h-full rounded overflow-hidden block relative hover:scale-105 ">
        
        {
            data?.poster_path? (
                <img src={imgUrl+data?.poster_path}   />
            ):(
                <div className="bg-neutral-700 w-full h-full flex text-center justify-center items-center">
                    Image Not Found
                </div>
            )
        }
        
        

        <div className="absolute top-3 ">
            {
                trending &&(
                    <div className="py-1 px-2 backdrop-blur-3xl rounded-r-full bg-black/60  overflow-hidden">
                        #{index}
                    </div>
                )
            }
        </div>


        <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full  bg-black/60 opacity-90  p-2'>
            <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>
            <div className='text-sm text-neutral-400 flex justify-between items-center'>
                <p>{ moment(data.release_date).format("MMMM Do YYYY") }</p>
                <p className='bg-black px-1 rounded-full text-xs text-white'>Rating :{Number(data.vote_average).toFixed(1)}</p>
            </div>
        </div>
    </Link>
  )
}

export default Card