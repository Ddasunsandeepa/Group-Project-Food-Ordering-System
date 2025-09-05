import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  badgeValue: string;
  badgeIcon: ReactNode;
  footerNote: string;
  trend: "up" | "down"; // New prop
}

export function StatsCard({
  value,
  description,
  badgeValue,
  badgeIcon,
  footerNote,
  trend,
}: StatsCardProps) {
  // Conditional styles based on trend
  const cardBorderClass =
    trend === "up"
      ? "border border-green-200/50"
      : trend === "down"
      ? "border border-red-200/50"
      : "";

  const badgeVariant = trend === "up" ? "outline" : "destructive"; // Example: outline for up, red for down

  return (
    <Card className={`@container/card ${cardBorderClass}`}>
      <CardHeader>
        <div className="flex items-center justify-between w-full mb-1">
          <CardDescription>{description}</CardDescription>
          <Badge variant={badgeVariant} className="flex items-center gap-1">
            {badgeIcon}
            {badgeValue}
          </Badge>
        </div>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">{footerNote}</div>
      </CardFooter>
    </Card>
  );
}
