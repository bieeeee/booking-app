import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import "./style/dark.scss";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { hotelInputs, productInputs, roomInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />
    } else {
      return children;
    }
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><List columns={userColumns} /></ProtectedRoute>} />
          <Route path="/users/:userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
          <Route path="/users/new" element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>} />
          <Route path="/hotels" element={<ProtectedRoute><List columns={hotelColumns} /></ProtectedRoute>} />
          <Route path="/hotels/:hotelId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
          <Route path="/hotels/new" element={<ProtectedRoute><New inputs={hotelInputs} title="Add New Hotel" /></ProtectedRoute>} />
          <Route path="/rooms" element={<ProtectedRoute><List columns={roomColumns} /></ProtectedRoute>} />
          <Route path="/rooms/:roomId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
          <Route path="/rooms/:hotelId" element={<ProtectedRoute><New inputs={roomInputs} title="Add New Room" /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
