import './App.css';
import UserLogin from "../src/Pages/Userlogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegistration from './Pages/Registration';
import Home from './Pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="register" element={<UserRegistration />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
