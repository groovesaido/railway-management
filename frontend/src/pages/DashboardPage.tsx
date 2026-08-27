import AdminDashboardPage from "../components/AdminDashboardPage";
import { useAuth } from "../context/AuthContext";
export default function DashboardPage() {
  const { user } = useAuth();
  switch (user?.role) {
    case "ADMIN":
      return <AdminDashboardPage />;
    case "STAFF":
      return <div>COMING SOON</div>;
    case "PASSENGER":
      return <div>COMING SOON</div>;
    default:
      return null;
  }
}
