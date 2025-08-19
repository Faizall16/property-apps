import Header from "../../components/Header";
import PropertyList from "../../components/PropertyList";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function PropertiesPage() {
  return (
    <ProtectedRoute>
      <Header currentPage="property" />
      <PropertyList />
    </ProtectedRoute>
  );
}
