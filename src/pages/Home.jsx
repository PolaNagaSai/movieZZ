import { useSelector } from "react-redux"
import BannerHome from "../components/BannerHome"
import ScrollCard from "../components/ScrollCard"
import useFetch from '../hooks/useFetch'


const Home = () => {
  const trendingData=useSelector(state=>state.moviezData.bannerData)
  const { data : nowPlayingData } = useFetch('/movie/now_playing')
  const { data : topRatedMovies } = useFetch('/movie/top_rated')
  const { data : popularTv } = useFetch('/tv/popular')
  const { data : topRatedTv } = useFetch('/tv/top_rated')


  return (
    <div>
      <BannerHome/>
      <ScrollCard data={trendingData} heading={"Trending"}/>
      <ScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
      <ScrollCard data={topRatedMovies} heading={"Movies-Top Rated"} media_type={"movie"}/>
      <ScrollCard data={popularTv} heading={"TV Series-Popular"} media_type={"tv"}/>
      <ScrollCard data={topRatedTv} heading={"TV Series-Top Rated"} media_type={"tv"}/>
    </div>
  )
}

export default Home