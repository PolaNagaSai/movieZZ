/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import { useEffect } from 'react'
import {setBannerData,setImgUrl} from './store/MoviezSlice'
import {useDispatch} from 'react-redux';
import axios from 'axios'

function App() {
  const dispatch=useDispatch();

  const fetchTrendingData = async()=>{
    try {
        const response = await axios.get('/trending/all/week')

        dispatch(setBannerData(response.data.results))
    } catch (error) {
        console.log("error",error)
    }
  }

  const fetchConfiguration = async()=>{
    try {
        const response = await axios.get("/configuration")

        dispatch(setImgUrl(response.data.images.secure_base_url+"original"))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchTrendingData()
    fetchConfiguration()
  },[])

  return (
    <>
      <main className='pb-10 lg:pb-0'>
        <Header/>
        <div>
          <Outlet/>
        </div>        
        <Footer/>
        <MobileNavigation/>
      </main>
    </>
  )
}

export default App
