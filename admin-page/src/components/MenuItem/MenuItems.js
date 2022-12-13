import { FaTh, FaUserAlt, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
export const MenuItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaTh />,
  },
  {
    path: "/user",
    name: "Quản lí người dùng",
    icon: <FaUserAlt />,
  },
  {
    path: "/recruiment",
    name: "Quản lí tin tuyển dụng",
    icon: <FaRegChartBar />,
  },
  {
    path: "/field",
    name: "Quản lí lĩnh vực",
    icon: <FaCommentAlt />,
  },
];
