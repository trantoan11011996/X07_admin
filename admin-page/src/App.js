import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";

import { AdminProvider } from "./components/AdminContext/AdminContext";
import { AuthContext } from "./components/AdminContext/Context";

import { Fragment } from "react";
import { publicRoute } from "./routes";
function App() {
  return (
    <AuthContext.Provider>
      <AdminProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            {publicRoute.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout === null ? Fragment : Sidebar;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </AuthContext.Provider>
  );
}

export default App;
