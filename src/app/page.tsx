import { PageLayout } from "@/components/page-layout";
import { Sidebar } from "@/components/sidebar";
import { ContentGrid } from "@/components/content-grid";
import { gridItems } from "@/data/grid-items";

export default function HomePage() {
  return (
    <PageLayout sidebar={<Sidebar />}>
      <ContentGrid items={gridItems} />
    </PageLayout>
  );
}
