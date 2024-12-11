import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./pages/Home"
import {Login} from "@/pages/Login.tsx";
import {Register} from "@/pages/Register.tsx";

function App() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
              </Routes>
          </div>
      </Router>
  )
}

export default App
