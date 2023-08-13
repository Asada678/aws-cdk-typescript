import { useState } from "react";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginComponent from "./components/LoginComponent";
import { AuthService } from "./services/AuthService";

const authService = new AuthService();

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
          element: <div>Hello createSpace</div>,
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
