import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {navigate} = useContext(ShopContext);


  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-12 min-h-[80vh] border-t">
      {/* ------ Left Side ------- */}
  <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <Title text1={`DELIVERY`} text2={`INFORMATION`}/>
        <div className="flex gap-3">
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='First Name'/>
         <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Last Name'/>
      </div>
       <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder='Email address'/>
       <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Street'/>
      <div className="flex gap-3">
         <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='State'/>
         <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='City'/>
      </div>
      <div className="flex gap-3">
         <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder='ZIP code'/>
         <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='COuntry'/>
      </div>
      <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="numbere" placeholder='Phone number'/>
  </div>
  {/*------Right Side-------- */}

  <div className="mt-8">
    <div className="mt-8 min-w-80">
      <CartTotal/>
    </div>

    <div className="mt-12">
      <Title text1={`PAYMENT`} text2={`METHOD`}/>
{/*------Payment Method Selection--- */}
      <div className="flex gap-3 flex-col lg:flex-row">
        <div onClick={()=>setMethod("stripe")} className="flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer">
          <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === "stripe" ? "bg-green-500" : ""}`}></p>
          <img src={assets.stripe_logo} alt="" className="h-5 mx-4"/>
        </div>
        <div onClick={()=>setMethod("razorpay")} className="flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer">
          <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === "razorpay" ? "bg-green-500" : ""}`}></p>
          <img src={assets.razorpay_logo} alt="" className="h-5 mx-4"/>
        </div>
         <div onClick={()=>setMethod("cod")} className="flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer">
          <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === "cod" ? "bg-green-500" : ""}`}></p>
          <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
        </div>
      </div>
      <div className="w-full text-end mt-8">
        <button onClick={()=>navigate('/orders')}  className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
      </div>
    </div>

  </div>
      
    </div>
  )
}

export default PlaceOrder