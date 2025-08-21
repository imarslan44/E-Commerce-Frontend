import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
   const [Visible, setVisible] = useState(false)
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)
    const location = useLocation();

    useEffect(() => {
      if(location.pathname.includes('collection')){
        setVisible(true)
      }else{
        setVisible(false)
     }
    
    }, [location])
    
  return showSearch && Visible ? (
    <div className="border-t border-b bg-gray-50 text-center flex justify-center items-center relative ">

        <div className="inline-flex items-center justify-center border-x-2 border-gray-400 px-5 py-2 mx-2  w-3/4 sm:w-1/2">
         <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' className="flex-1 outline-none bg-inherit text-sm" />
         <img src={assets.search_icon} alt="" className="w-4"/>
        </div>

        <button onClick={()=>setShowSearch(false)} className="absolute top-1/2 right-0 -translate-y-1/2 bg-red-50 h-full  w-10 flex justify-center items-center">
        <img  src={assets.cross_icon} alt="" className="inline cursor-pointer  w-4 "/>
       </button>
    </div>
  ): null;
}

export default SearchBar