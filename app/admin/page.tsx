import { ProtectedRoute } from '../../components/ProtectedRoute';
import { AdminDashboard } from '../../views/Admin/Dashboard';

export const metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
