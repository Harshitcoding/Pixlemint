import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Redirect root */}
        <Route 
          path="/" 
          element={<Navigate to={token ? "/home" : "/login"} replace />} 
        />

        {/* Home Page */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Page */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={token ? <Navigate to="/home" replace /> : <Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={token ? <Navigate to="/home" replace /> : <Signup />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
