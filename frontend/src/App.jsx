import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import PublicNavbar from "./Components/Navbar/PublicNavbar";
import Register from "./Components/Users/Register";
import Login from "./Components/Users/Login";
import PrivateNavbar from "./Components/Navbar/PrivateNavbar";
import AddCategory from "./Components/Category/AddCategory";
import { useSelector } from "react-redux";
import CategoryList from "./Components/Category/CategoryList";
import UpdateCategory from "./Components/Category/UpdateCategory";
import TransactionForm from "./Components/Transactions/TransactionForm";
import Dashboard from "./Components/Users/Dashboard";

function App() {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <BrowserRouter>
    {/* Navbar */}
    {user ? <PrivateNavbar/> : <PublicNavbar/>}
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add-category" element={<AddCategory/>}/>
        <Route path="/categories" element={<CategoryList/>}/>
        <Route path="/update-category/:id" element={<UpdateCategory/>}/>
        <Route path="/add-transaction" element={<TransactionForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
