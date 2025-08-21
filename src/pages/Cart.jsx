import React, { useContext, useState, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'


const Cart = () => {
  
  const {products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext)

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
   const tempData = [];
   for(const items in cartItems){
    for(const item in cartItems[items]){
       if(cartItems[items][item] >  0){
        tempData.push({
          _id: items,
          size: item,
          quntity: cartItems[items][item]
        })
       }
    }
   }
 setCartData(tempData);
  }, [cartItems])
  



  return (
    <div className="border-t pt-14">

      <div className="text-2xl mb-3">
        <Title text1={`YOUR`} text2={`CART`} />
      </div>
      <div>

        {
          cartData.map((item, index)=>{

    const prdouctData = products.find((product)=>product._id === item._id)

    return (
      <div key={index} className="py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
        <div className="flex items-start gap-6">
          <img src={prdouctData.images[0]} alt="" className="w-16 sm:w-20"/>
          <div className="">
            <p className="text-sm sm:text-lg font-medium">{prdouctData.name}</p>
            <div className="flex items-center gap-5 mt-2">
              <p>{currency}{prdouctData.price}</p>
              <p className='px-2 sm:px-3 sm:py-1 border-2 border-slate-100'>{item.size}</p>
            </div>
          </div>
        </div>
        <input onClick={(e)=> e.target.value ==="" || e.target.value=== "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type="number"  className="border-none max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" min={1} defaultValue={item.quntity} />
        <img onClick={()=>updateQuantity(item._id, item.size, 0 )} src={assets.bin_icon} alt="" className="w-4 mr-4 cursor-pointer"/>

      </div>
    )
})
        }

        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal/>
            <div className="w-full text-end">
            <button onClick={()=>navigate('/place-order')} className="bg-black text-white my-8 px-8 py-3">PROCEED TO CHECKOUT</button>

          </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}

export default Cart