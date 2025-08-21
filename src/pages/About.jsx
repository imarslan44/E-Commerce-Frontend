import React from 'react'
import Title from "../components/Title"
import {assets}  from '../assets/frontend_assets/assets.js'
import NewsLetterbox from '../components/NewsLetterBox.jsx'
import NewsLetterBox from '../components/NewsLetterBox.jsx'
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={`ABOUT`} text2={`US`}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 bg-white border border-gray-400 pr-3 rounded overflow-hidden">

        <img src={assets.about_img} alt="" className="w-full md:max-w-[450px]"/>

        <div className="flex flex-col justify-center gap-6 md:w-2/3 text-gray-600 mb-2 ml-2">
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis mollitia expedita molestias enim quos, hic earum repellat veritatis ab totam? </p>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, maxime rem voluptatibus laboriosam non aliquid sunt expedita optio iure aut sapiente error est tempora explicabo reiciendis, ducimus corrupti mollitia ipsum.</p>
         <b className="text-gray-800">Our Mission</b>
         <p>Our mission at Forever is to customers with choice, convenience, Lorem ipsum dolor sit amet.</p>
        </div>
      </div>

      <div className="text-xl py-4">
         <Title text={`WHY`} text2={`CHOOSE US`}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 ">
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
         <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className="border border-gray-200  px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exeptional Customer Service:</b>
          <p className="text-gray-600">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About