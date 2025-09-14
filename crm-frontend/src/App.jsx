import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Leads from "./pages/Leads";
import Opportunities from "./pages/Opportunities";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContex";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/opportunities"
            element={
              <ProtectedRoute>
                <Opportunities />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
