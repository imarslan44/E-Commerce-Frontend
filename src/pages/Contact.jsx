import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10  ">
        <Title text1="CONTACT" text2="US"/>
      </div>
      <div className="my-10 flex flex-col m-auto md:flex-row gap-10 mb-28 border border-gray-400 max-w-[80%] rounded overflow-hidden">
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]"/>
        <div className="flex flex-col justify-center items-start gap-6 ml-2 mb-2">

          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">54709 Willms Station <br /> suite 350, washington, USA</p>
          <p className="text-gray-500">TEL: (415) 555-0132 <br /> Email: admin@forever.com</p>
          <p className="font-semibold text-xl text-gray-600"> Careers at Forever</p>
          <p className="text-gray">Learn more about our job openings.</p>
           <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact