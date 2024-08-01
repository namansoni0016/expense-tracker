import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import PublicNavbar from "./Components/Navbar/PublicNavbar";
import Register from "./Components/Users/Register";
import Login from "./Components/Users/Login";

function App() {
  return (
    <BrowserRouter>
    {/* Navbar */}
    <PublicNavbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
