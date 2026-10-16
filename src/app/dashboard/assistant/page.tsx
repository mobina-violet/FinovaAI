import QuickEntry from "@/components/dashboard/QuickEntry";
import AssistantComposer from "@/components/dashboard/AssistantComposer";
import { getCategoryOptions, requireBusiness } from "@/lib/business";

export const metadata = { title: "دستیار هوشمند | Finova AI" };

export default async function AssistantPage() {
  const { business } = await requireBusiness();
  const categories = await getCategoryOptions(business.id);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-bold">دستیار هوشمند</h1>
        <p className="mt-1 text-sm text-muted">
          تراکنش را با یک جمله ثبت کنید یا از دستیار درباره‌ی وضعیت مالی‌تان بپرسید.
        </p>
      </div>

      <QuickEntry categories={categories} />
      <AssistantComposer />
    </div>
  );
}