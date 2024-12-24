import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./pages/Home"
import {Login} from "@/pages/Login.tsx";
import {Register} from "@/pages/Register.tsx";
import ProtectedRoute from "@/pages/ProtectedRoute.tsx";
import {AuthHome} from "@/pages/AuthHome.tsx";
import {Movie} from "@/pages/Movie.tsx";

function App() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/login" element={
                      <Login />
                  } />

                  <Route path="/register" element={
                        <Register />
                  } />

                  <Route path="/home" element={
                      <ProtectedRoute>
                          <AuthHome />
                      </ProtectedRoute>
                  } />

                  <Route path="/browse/:id" element={
                      <Movie />
                  } />

              </Routes>
          </div>
      </Router>
  )
}

export default App
