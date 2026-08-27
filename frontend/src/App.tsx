import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import StationPage from "./pages/StationPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import TrainPage from "./pages/TrainPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoutes>
            <AppLayout />
          </ProtectedRoutes>
        }
      >
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/station"
          element={
            <ProtectedRoutes allowedRoles={["ADMIN"]}>
              <StationPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/trains"
          element={
            <ProtectedRoutes allowedRoles={["ADMIN"]}>
              <TrainPage />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
}
