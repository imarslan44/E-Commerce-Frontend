import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const [Address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    state: "",
    city: "",
    zip: "",
    country: "",
    phone: ""
  });
  
  const [Items, setItems] = useState([]);
 const {navigate, cartItems, getCartAmount, token} = useContext(ShopContext);
  
 //set cart items from context to local state
 useEffect(() => {
  console.log("CartItems in PlaceOrder:", cartItems);
   setItems(cartItems);
 }, [cartItems])




  const HandleAddress = (e) => {
    const {name, value} = e.target;
    setAddress({
      ...Address,
      [name]: value
    })
  }

//place order function
  const OrderOnCOD = async()=>{
    if(!Address.firstName || !Address.lastName || !Address.email || !Address.street || !Address.state || !Address.city || !Address.zip || !Address.country || !Address.phone){
      alert("Please fill all the fields");
      return;
    }
    if(Items.length === 0){
      alert("Your cart is empty");
      return;
    }
    const orderData = {
      items: Items.map((item)=>{
        return {
          productId: item.productId._id,
          quantity: item.quantity,
          size: item.size
        }
      }),
      totalAmount: getCartAmount(),
      shippingAddress: Address,
      paymentMethodId: method === "COD",
    }


 try{
      const response = await fetch("http://localhost:4400/api/order/create", {
        method: "POST",
        headers : {
           "Content-Type" : "application/json",
           "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
     console.log(response);
      const data = await response.json();
     console.log(data);
      if(response.status === 200){
        toast.success("Order placed successfully");
        
      }else{
        toast.error(data.message || "Something went wrong");
      }


 } catch(error){
  console.log(error);
 }
  }

const OrderOnStripe = async()=>{
   try{

     const orderData = {
      items: Items.map((item)=>{
        return {
          productId: item.productId._id,
          quantity: item.quantity,
          size: item.size
        }
      }),
      totalAmount: getCartAmount(),
      shippingAddress: Address,
      paymentMethodId: method === "COD",
    }

    const response = await fetch('http://localhost:4400/api/order/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
  console.log(response);
    const data = await response.json();
    if(response.success){
      window.location.href = data.session_url; // Redirect to Stripe Checkout

    } else {
      toast.error(data.message || "Something went wrong");
    }

   } catch(error){
    console.log(error);
   }
  }

  const handlePlaceOrder = ()=>{
    switch(method){
      case "COD":
        OrderOnCOD();
        break;
      case "stripe":
        OrderOnStripe();
        break;
      case "razorpay":
        // OrderOnRazorpay();
        break;
      default:
        break;
    }
  }



  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-12 min-h-[80vh] border-t">
      {/* ------ Left Side ------- */}
  <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <Title text1={`DELIVERY`} text2={`INFORMATION`}/>
        <div className="flex gap-3">
        <input name="firstName" value={Address.firstName} onChange={HandleAddress} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='First Name'/>
         <input name="lastName" value={Address.lastName} onChange={HandleAddress} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Last Name'/>
      </div>
       <input name="email" value={Address.email} onChange={HandleAddress} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder='Email address'/>
       <input name="street" value={Address.street} onChange={HandleAddress} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Street'/>
      <div className="flex gap-3">
         <input name="state" value={Address.state} onChange={HandleAddress} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='State'/>
         <input name="city" value={Address.city} onChange={HandleAddress} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='City'/>
      </div>
      <div className="flex gap-3">
         <input name="zip" value={Address.zip} onChange={HandleAddress} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder='ZIP code'/>
         <input name="country" value={Address.country} onChange={HandleAddress}className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder='Country'/>
      </div>
      <input name="phone" value={Address.phone} onChange={HandleAddress}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="numbere" placeholder='Phone number'/>
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
         <div onClick={()=>setMethod("COD")} className="flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer">
          <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === "COD" ? "bg-green-500" : ""}`}></p>
          <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
        </div>
      </div>
      <div className="w-full text-end mt-8">
        <button onClick={handlePlaceOrder}  className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
      </div>
    </div>

  </div>
      
    </div>
  )
}

export default PlaceOrder