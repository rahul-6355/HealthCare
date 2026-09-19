import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {

    const navigate=useNavigate()

    const {doctors}=useContext(AppContext)

    const [relDoc,setRelDoc]=useState([])

    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctorsData=doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        } 
    },[doctors,speciality,docId])

  return (
     <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {relDoc.slice(0,5).map((item, index) => (
                <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='group bg-white border border-teal-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300' >
                    <div className='relative overflow-hidden bg-mist'>
                        <img className='aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105' src={item.image} alt={item.name} />
                        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${item.available ? 'bg-white text-emerald-700' : 'bg-white/90 text-gray-500'}`}>
                            {item.available ? 'Available' : 'Not available'}
                        </span>
                    </div>
                    <div className='p-4 min-h-28'>
                        <p className='text-ink text-lg font-semibold'>{item.name}</p>
                        <p className='mt-1 text-gray-500 text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-mist text-primary border border-teal-100 px-12 py-3 rounded-full mt-10 font-semibold'>View all doctors</button>
    </div>
  )
}

export default RelatedDoctors