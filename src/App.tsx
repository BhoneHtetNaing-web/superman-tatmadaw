import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./modules/auth/Login"
import Register from "./modules/auth/Register"
import Dashboard from "./modules/dashboard/Dashboard"
import AdminPanel from "./modules/admin/AdminPanel"
import ProtectedRoute from "./layout/ProtectedRoute"
import AdminRoute from "./layout/AdminRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App