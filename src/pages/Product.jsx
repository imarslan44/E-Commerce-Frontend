import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const  {productId} = useParams()
 const {products, currency,  addToCart} = useContext(ShopContext)
 const [productData, setProductData] = useState(false);
 const [image, setImage] = useState("");
 const [size, setSize] = useState("");

 
 const fetchProductdata = async() =>{
  products.map((item)=>{
    if(item._id == productId){
      setProductData(item)
      setImage(item.images[0])
      return null;
    }
  })
 }
 
 useEffect(() => {
   fetchProductdata();
 }, [productId]);
 
  return productData ? (
<div className="border-t-2 pt-10 tansition-opacity ease-in duration-500 opacity-100">
    {/* product data */}
<div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
   {/*------- product images---------- */}
   <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
    <div className="flex sm:flex-col overflow-x-auto overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
      {productData.images.map((item, index)=>(
        <img src={item} alt="" key={index} className={`w-[24%] sm:w-full sm:mb-3 border-2  flex-shrink-0 cursor-pointer  ${item === image ? "border-black": "border-white" }`} onClick={()=>setImage(item)} />
      ))}
    </div>
     <div className="w-full sm:w-80%">
      <img src={image} alt="" className="w-full h-auto"/>
     </div>
   </div>

      {/*------- product info---------- */}
   <div className="flex-1">

    <div className="flex items-center gap-1 mt-2">
      <img src={assets.star_icon} alt="" className="w-3 5"/>
      <img src={assets.star_icon} alt="" className="w-3 5"/>
      <img src={assets.star_icon} alt="" className="w-3 5"/>
      <img src={assets.star_icon} alt="" className="w-3 5"/>
      <img src={assets.star_icon} alt="" className="w-3 5"/>
      <p className="pl-2">(122)</p>
    </div>

    <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
    <p className="mt-5 text-gray-500 w-4/5 block">{productData.description}</p>
    <div className="flex flex-col gap-4 my-8">
     <p>Select Size</p>
     <div className="flex gap-2">
      {productData.sizes.map((item, index)=>(
    <button onClick={()=>setSize(item)} className={`border border-gray-300 py-2 px-4 bg-gray-100 cursor-pointer ${size === item ? "border-orange-300" : ""}`} key={index}>{item}</button>
      ))}
     </div>
    </div>
     <button onClick={()=>addToCart(productData._id, size)} className="bg-black text-white px-8 py-4 text-sm active:bg-gray-700">Add To Cart</button>
     <hr className="mt-8 sm:w-4/5"/>
     <div className="text-sm text-gray-500 mt-5 flex-col gap-1">
      <li>100% original product.</li>
      <li>Cash on delivery is availabe on this product.</li>
      <li>Easy return and exchange policy within 7 days.</li>
     </div>
   </div>
</div>

{/* ----Description and review section------ */}
<div className="mt-20">
  <div className="flex gap-3 ">
    <b className="border px-5 py-3 text-sm">Description</b>
    <p className="border px-5 py-3 text-sm ">Reviews (122)</p>
  </div>
  <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-6 text-sm text-gray-500 mt-2">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laudantium dolores nostrum sit quaerat! Aut.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, doloremque.</p>
  </div>

  {/* ----Display Related Products-----*/}
  <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>


</div>


</div>
  ) : <div className='opacity-0'></div>
}

export default Product