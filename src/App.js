import logo from './logo.svg';
import './App.css';
import Fetch from './getData';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import PartRestaurants from './Component/restaurantPart';
import Cart from './Component/cart';
import Dishes from './Component/dishes';
import SearchRestaurants from './Component/searchRestaurant';






function App() {
  return (
       <>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Fetch/>}/>
        <Route path="/restaurant/:id" element={<PartRestaurants/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/dishes" element={<Dishes/>}/>
        <Route path="/rest"  element={<SearchRestaurants/>}/>
        
       </Routes>
       </BrowserRouter>
       {/* <PartRestaurants/> */}


{/* <Fetch/> */}

       </>
  );
}

export default App;
