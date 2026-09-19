import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Doctors = () => {

        const {speciality} = useParams();
        const [filterDoc,setFilterDoc] = useState([]);
        const [showFilter, setShowFilter] = useState(false);
        const navigate = useNavigate();
       
        const {doctors} = useContext(AppContext);
 
        const applyFilter = () => {
          if(speciality){
            setFilterDoc(doctors.filter((item) => item.speciality === speciality));
          } else {
            setFilterDoc(doctors);
          }
        }

        useEffect(() => {
          applyFilter();
        }, [speciality, doctors]);


  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'} `}>
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-teal-100 text-primary font-semibold" : ""} `}>General physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-teal-100 text-primary font-semibold" : ""} `}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-teal-100 text-primary font-semibold" : ""} `}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-teal-100 text-primary font-semibold" : ""} `}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-teal-100 text-primary font-semibold" : ""} `}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-teal-100 text-primary font-semibold" : ""} `}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
                <div onClick={()=>navigate(`/appointment/${item._id}`)} className='group bg-white border border-teal-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300' >
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
            ))
          }
        </div>
      </div>
    </div>
    
  )
}

export default Doctors