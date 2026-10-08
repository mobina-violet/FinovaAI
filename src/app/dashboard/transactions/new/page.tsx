import TransactionForm from "@/components/dashboard/TransactionForm";
import { getCategoryOptions, requireBusiness } from "@/lib/business";

export const metadata = { title: "ثبت تراکنش | Finova AI" };

export default async function NewTransactionPage() {
  const { business } = await requireBusiness();
  const categories = await getCategoryOptions(business.id);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-bold">ثبت تراکنش جدید</h1>
      <p className="mt-1 text-sm text-muted">
        درآمد یا هزینه‌ی خود را ثبت کنید. برای ثبت سریع‌تر می‌توانید از کادر «ثبت سریع» داشبورد هم استفاده کنید.
      </p>

      <div className="glass mt-6 rounded-2xl p-6 sm:p-8">
        <TransactionForm categories={categories} redirectTo="/dashboard" />
      </div>
    </div>
  );
}