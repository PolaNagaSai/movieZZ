/* eslint-disable react-hooks/exhaustive-deps */
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { navigation } from "../constants/navigation";




const Header = () => {
    const location=useLocation();
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
    const[searchInput,setSearchInput]=useState(removeSpace);
    const navigate=useNavigate();
    console.log(location);

    useEffect(()=>{
            if(searchInput){
                navigate(`/search?q=${searchInput}`) 
            }else{
                navigate(`/`)
            }         
    },[searchInput])

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    
    
  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75 z-40 ">
        <div className="container mx-auto px-4 flex items-center h-full ">
            <Link to={'/'}>
                <h1 className="text-orange-500 font-bold text-3xl  ">MovieZZ</h1>
            </Link>

            <nav className=" hidden lg:flex items-center gap-2 ml-5">
                {
                    navigation.map((nav)=>{
                        return(
                            <div key={nav.label}>
                                <NavLink to={nav.href} className={({isActive})=>`px-2 hover:text-neutral-100 ${isActive && "text-neutral-100 "}`}>
                                    {nav.label}
                                    
                                </NavLink>
                            </div>
                        )
                    })
                }
            </nav>

            <div className="ml-auto flex items-center gap-5">
                <form className="flex items-center" onSubmit={handleSubmit}>
                    <input type="text"
                    placeholder="Search here...." 
                    className="bg-transparent px-4 py-2 outline-none border-none hidden lg:block " 
                    onChange={(e)=>
                        {console.log(e.target.value)
                        setSearchInput(e.target.value)}
                    } 
                    value={searchInput}/>
                    <button className="text-2xl">
                        <FiSearch />
                    </button>
                </form>
                <div className="text-3xl p-2 cursor-pointer active:scale-50 transition-all ">
                    <FaUserCircle />
                </div>
            </div>
        </div>

    </header>
  )
}

export default Header