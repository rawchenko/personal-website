import { PageLayout } from "@/components/v2/page-layout";
import { Info } from "@/components/v2/info";
import { Portfolio } from "@/components/v2/portfolio";


export default function HomePage() {
  return (
    <PageLayout
      info={<Info />}
      portfolio={<Portfolio />}
    />
  );
}
