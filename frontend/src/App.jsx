import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CropDetails from './pages/CropDetails'
import ProductDetails from './pages/ProductDetails'
import { CropProvider } from './contexts/CropContext'
import { UserProvider} from './contexts/UserContext'
import Profile from './pages/Profile'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import { AdminProvider } from './contexts/AdminContext.jsx'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import UserProductDetails from './pages/UserProductDetails.jsx'
import Footer from './components/Footer.jsx'
import "./App.css"


const App = () => {
  return (
    <AdminProvider>
    <UserProvider>
      <CropProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/crop/:cropName" element={<CropDetails/>}/>
            <Route path="/crop/:cropName/:qualityType" 
            element={
              (function protectedLogin(){
                const user = Cookies.get("token");
                const admin = Cookies.get("adminToken");
                return user ? <UserProductDetails/> : <ProductDetails/>;
              })()

            }
            />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/login"
             element={
              (function protectedLogin(){
                const user = Cookies.get("token");
                const admin = Cookies.get("adminToken");
                const isAuthenticated = user || admin;
                return isAuthenticated ? <Navigate to="/" replace /> : <Login />;
              })()
             } />
             
            <Route path="/register" element={<Register/>}/>
            <Route path="/admin-login"
             element={
              (function protectedLogin(){
                const user = Cookies.get("token");
                const admin = Cookies.get("adminToken");
                const isAuthenticated = user || admin;
                return isAuthenticated ? <Navigate to="/" replace /> : <AdminLogin />;
              })()
             } />
          </Routes>
          <Footer/>
        </Router>
      </CropProvider>
    </UserProvider>
    </AdminProvider>
  )
}

export default App