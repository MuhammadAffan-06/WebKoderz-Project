import './App.css';
import UserLogin from "../src/Pages/Userlogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegistration from './Pages/Registration';
import Home from './Pages/Home';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import Portfolio from './Pages/PortFolios';
import Vote from './Pages/Vote';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/" element={<UserLogin />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="register" element={<UserRegistration />} />
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
