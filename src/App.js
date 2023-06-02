import './App.css';
import Navbar from './components/Header/Navbar';
import Newnav from './components/newnavbar/Newnav';
import Maincomp from './components/home/Maincompo';
import Footer from './components/footer/Footer';
import Sign_in from './components/signup_signin/Sign_in';
import Sign_up from './components/signup_signin/Sign_up';
import {Routes , Route} from "react-router-dom";
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
function App() {

  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])

  return (
  <>
  {
        data ? (
          <>
            <Navbar/>
                  <Newnav />
                  <Routes>
                    <Route path='/' element={<Maincomp />} /> 
                    <Route path='/login' element={<Sign_in />} />
                    <Route path='/register' element={<Sign_up />} /> 
                    <Route path='/getproductsone/:id' element={<Cart />} /> 
                    <Route path='/buynow' element={<Buynow />} /> 


                  </Routes>
                  <Footer />
          </>
        ) : (
          <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )
      }
  
  </>
  );
}

export default App;
