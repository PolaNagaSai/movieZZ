/* eslint-disable react/prop-types */
import useFetchDetails from "../hooks/useFetchDetails"

const PlayVideo = ({videoId,close,media_type}) => {
  const {data:videoData}=useFetchDetails(`/${media_type}/${videoId.id}/videos`)
  return (
    <section onClick={close} className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-55 flex justify-center items-center">
       <div onClick={(e) => e.stopPropagation()} className="bg-black w-full max-w-screen-lg  aspect-video rounded relative">
        
        <iframe src={`https://www.youtube.com/embed/${videoData?.results?.[0]?.key}` } className="w-full h-full"/> 
       </div>
    </section>
  )
}

export default PlayVideo