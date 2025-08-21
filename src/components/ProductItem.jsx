import React, { useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);
    console.log(image)
  return (
    <Link className='text-gray-700 cursor-pointer rounded-xs overflow-hidden border-2 border-gray-200 bg-gray-100/30 hover:-translate-y-3 hover:border-black transition-all duration-400' to={`/product/${id}`}>

      <div className="overflow-hidden min-h-72 h-72 flex items-center justify-center">
        <img className="hover:scale-120 transition-all duration-300 ease-in-out w-full h-full object-cover" src={image &&image[0]} alt="" />
      </div>

      <p className='pt-3 text-gray-600 pb-1 px-2 text-sm text-center'>{name}</p>
      <p className='text-sm px-2 pb-2 font-semibold text-center text-black '>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem