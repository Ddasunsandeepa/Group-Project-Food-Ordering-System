import SectionCard from "@/components/home/SectionCards";
import { DashboardWelcomeBanner } from "@/components/home/WelcomeBannerHome";

export default function Home() {
  return (
    <div className="px-6 w-full">
      <div className="w-full px-3">
        <DashboardWelcomeBanner />
        <SectionCard />
      </div>
    </div>
  );
}
