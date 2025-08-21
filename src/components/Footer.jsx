import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div className="">
                <img src={assets.logo} alt="" />
                <p className="w-full md:w-2/3 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eius vero nesciunt id esse ipsum harum, veniam magnam quaerat blanditiis.</p>
            </div>
            <div>
                <p className="text-xl font-medium mb-3">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privicy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-3'>GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>+44-121-343-7890</li>
                    <li>contact@foreveryou.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2025@ forver.com - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer