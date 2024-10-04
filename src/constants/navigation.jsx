import { ImHome } from "react-icons/im";
import { MdLiveTv } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";



export const navigation=[
    {
        label:'Tv Shows',
        href:'tv',
        icon:<MdLiveTv/>
    },
    {
        label:'Movies',
        href:'movie',
        icon:<BiMoviePlay/>
    }
];

export const mobileNavigation=[
    {
        label:'Home',
        href:'/',
        icon:<ImHome />
    },
    ...navigation,
    {
        label:'search',
        href:'/search',
        icon:<FiSearch/>
    }
]
