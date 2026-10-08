import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireBusiness } from "@/lib/business";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, business } = await requireBusiness();

  return (
    <DashboardShell businessName={business.name} userName={user.name} phone={user.phone}>
      {children}
    </DashboardShell>
  );
}