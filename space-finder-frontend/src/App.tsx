import { useState } from "react";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginComponent from "./components/LoginComponent";
import { AuthService } from "./services/AuthService";
import { DataService } from "./services/DataService";
import CreateSpace from "./components/spaces/CreateSpace";

const authService = new AuthService();
const dataService = new DataService();

function App() {
  const [username, setUsername] = useState<string | undefined>(undefined);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <Navbar username={username} />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/",
          element: <div>Hello world</div>,
        },
        {
          path: "/login",
          element: <LoginComponent authService={authService} setUsernameCb={setUsername} />,
        },
        {
          path: "/profile",
          element: <div>Hello profile</div>,
        },
        {
          path: "/createSpace",
          element: <CreateSpace dataService={dataService} />,
        },
        {
          path: "/spaces",
          element: <div>Hello spaces</div>,
        },
      ],
    },
  ]);
  return (
    <>
      <div className="wrapper">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
