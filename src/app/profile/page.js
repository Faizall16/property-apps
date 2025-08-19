import Header from "../../components/Header";
import Profile from "../../components/Profile";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Header currentPage="profile" />
      <Profile />
    </ProtectedRoute>
  );
}
