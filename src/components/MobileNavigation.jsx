import { NavLink } from "react-router-dom"
import { mobileNavigation } from "../constants/navigation"


const MobileNavigation = () => {
  return (
    <section className="lg:hidden bg-neutral-600 h-14 bg-opacity-40 fixed bottom-0 w-full">
        <div className="flex items-center justify-between h-full text-neutral-400">
            {
                mobileNavigation.map((nav)=>{
                    return(
                        <NavLink key={nav.label}to={nav.href} className={({isActive})=>`px-3 flex flex-col items-center justify-center h-full ${isActive && "text-white "} `}>
                            <div className="text-2xl">
                                {nav.icon}
                            </div>
                            <p>
                                {nav.label}
                            </p>
                        </NavLink>
                    )
                })
            }
        </div>
       
    </section>
  )
}

export default MobileNavigation