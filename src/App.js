import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import Register from './screens/Register';
import Login from './screens/Login';
import 'antd/dist/reset.css'
import ProfileScreen from './screens/ProfileScreen';
import Admin from './screens/Admin';
import Landing from './screens/Landing';


function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/book/:roomid/:fromdate/:todate" element={<BookingScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/' element={<HomeScreen />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
