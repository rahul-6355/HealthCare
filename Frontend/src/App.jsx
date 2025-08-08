import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import MyAppointments from './pages/MyAppointments'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Doctor from './pages/Doctors'
import About from './pages/About'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]' >
      <ToastContainer/>
     <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/doctors' element={<Doctor />} />
      <Route path='/doctors/:speciality' element={<Doctor />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/my-profile' element={<MyProfile />} />
      <Route path='/my-appointments' element={<MyAppointments />} />
      <Route path='/appointment/:docId' element={<Appointment />} />
      

    </Routes>
     <Footer />
    </div>
  )
}

export default App