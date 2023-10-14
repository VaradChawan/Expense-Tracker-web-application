import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/LoginPage";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={

            // protected routers are use to prevent unauthorized or unauthenticated users from accessing the pages/components
            // eg -> if a user is not logged in and try to access the protected routes then the users must redirect to the login page.
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
export default App;
