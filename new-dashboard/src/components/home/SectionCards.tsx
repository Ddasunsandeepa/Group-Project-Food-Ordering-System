import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { StatsCard } from "./StatsCard";

export default function SectionCards() {
  return (
    <div className="w-full lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <StatsCard
        title="Total Revenue"
        value="$1,250.00"
        description="Total Revenue"
        badgeValue="+12.5%"
        badgeIcon={<IconTrendingUp />}
        footerNote="Visitors for the last 6 months"
        trend="up"
      />
      <StatsCard
        title="New Customers"
        value="1,234"
        description="New Customers"
        badgeValue="-20%"
        badgeIcon={<IconTrendingDown />}
        footerNote="Acquisition needs attention"
        trend="down"
      />
      <StatsCard
        title="Active Accounts"
        value="45,678"
        description="Active Accounts"
        badgeValue="+12.5%"
        badgeIcon={<IconTrendingUp />}
        footerNote="Engagement exceed targets"
        trend="up"
      />
      <StatsCard
        title="Growth Rate"
        value="4.5%"
        description="Growth Rate"
        badgeValue="+4.5%"
        badgeIcon={<IconTrendingUp />}
        footerNote="Meets growth projections"
        trend="up"
      />
    </div>
  );
}
