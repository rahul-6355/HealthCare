import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*   Left side  */}
            <div>
             <img className='mb-5 w-40' src={assets.logo} alt="" />
             <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio in eum recusandae cumque molestias omnis possimus quod harum eius eos fuga aliquam illum assumenda, officiis dolorem, dolor aspernatur nobis repudiandae.</p>
            </div>
             {/*   Center side  */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li className='cursor-pointer' onClick={()=>{navigate('/'); scrollTo(0,0)}}>Home</li>
                    <li className='cursor-pointer' onClick={()=>{navigate('/about');scrollTo(0,0)}}>About us</li>
                    <li className='cursor-pointer' onClick={()=>{navigate('/contact');scrollTo(0,0)}}>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
             {/*   Right side  */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 1234567890</li>
                    <li>HealthCare@gmail.com</li>

                </ul>
            </div>
        </div>
        {/*    Copyright text  */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2026@HealthCare- All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer