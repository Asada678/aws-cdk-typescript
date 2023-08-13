import { useState } from "react";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [username] = useState<string | undefined>(undefined);

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
          element: <div>Hello login</div>,
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
