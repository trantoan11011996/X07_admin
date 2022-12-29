import Login from "../components/auth/Login/Login";
import Register from "../components/auth/Register/Register";
import CreateAdmin from "../components/Form/CreateAdmin/CreateAdmin";
import UpdateAdmin from "../components/Form/UpdateAdmin/UpdateAdmin";
import Dashboard from "../pages/Dashboard/Dashboard";
import Fields from "../pages/Fields/Fields";
import RecruimentDetail from "../pages/Recruiments/RecruimentDetail";
import Recruiments from "../pages/Recruiments/Recruiments";
import Users from "../pages/Users/Users";

const publicRoute = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/user",
    component: Users,
  },
  {
    path: "/recruiment",
    component: Recruiments,
  },
  {
    path: "/field",
    component: Fields,
  },
  {
    path: "/createAdmin",
    component: CreateAdmin,
  },
  {
    path: "/updateAdmin",
    component: UpdateAdmin,
  },
  {
    path: "/login",
    component: Login,
    layout: null,
  },
  {
    path: "/register",
    component: Register,
    layout: null,
  },
  {
    path : "/recruimentDetail/:idRecruiment",
    component : RecruimentDetail,
  }
];

export { publicRoute };
