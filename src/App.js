import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';
import Adminhome from './Pages/AdminHome/Adminhome';
import CreateProducts from './Pages/CreateProducts/CreateProducts';
import CreateCategories from './Pages/CreateCategories/CreateCategories';
import MyProducts from './Pages/MyProducts/MyProducts';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin/1032/login' element={<Admin/>}/>
        <Route path='/admin-home' element={<Adminhome/>}></Route>
        <Route path='/new-products' element={<CreateProducts/>}></Route>
        <Route path='/my-products' element={<MyProducts/>}></Route>
        <Route path='/categories' element={<CreateCategories/>}></Route>
        <Route path='/sales'></Route>
      </Routes>
    </div>    
    </Router>
    
  );
}

export default App;
