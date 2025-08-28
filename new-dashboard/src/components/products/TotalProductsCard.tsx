"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface TotalProductsCardProps {
  total: number;
}

export default function TotalProductsCard({ total }: TotalProductsCardProps) {
  return (
    <Card className="bg-background text-foreground border border-border">
      <CardHeader>
        <CardDescription>Total Products</CardDescription>
        <CardTitle className="text-2xl font-semibold">{total}</CardTitle>
      </CardHeader>
    </Card>
  );
}
