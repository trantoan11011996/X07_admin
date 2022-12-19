import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Fields from "./pages/Fields/Fields";
import Recruiments from "./pages/Recruiments/Recruiments";
import CreateAdmin from "./components/Form/CreateAdmin/CreateAdmin";
import UpdateAdmin from "./components/Form/UpdateAdmin/UpdateAdmin";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<Users />} />
          <Route path="/recruiment" element={<Recruiments />} />
          <Route path="/field" element={<Fields />} />
          <Route path="/createAdmin" element={<CreateAdmin />} />
          <Route path="/updateAdmin" element={<UpdateAdmin />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
