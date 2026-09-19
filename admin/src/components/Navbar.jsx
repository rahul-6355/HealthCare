import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

  const {aToken,setAToken}=useContext(AdminContext)
  const {dToken,setDToken} = useContext(DoctorContext)

  const navigate = useNavigate()


  const logout = ()=>{
    navigate('/')
   aToken && setAToken('' )
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
  
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-4 border-b border-teal-100 bg-white/90 backdrop-blur'>
        
   <div className='flex items-center gap-2 text-x5'>
<img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo1} alt="" />
<p className='border px-3 py-1 rounded-full border-teal-200 text-primary text-xs font-semibold uppercase tracking-wider'>{aToken ? 'Admin' : 'Doctor'}</p>

   </div>
  <button onClick={logout} className='bg-primary text-sm px-8 py-2.5 rounded-full text-white shadow-sm'>Logout</button>

    </div>
  )
}

export default Navbar