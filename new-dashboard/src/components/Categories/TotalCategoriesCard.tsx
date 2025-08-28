"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface TotalCategoriesCardProps {
  total: number;
}

export default function TotalCategoriesCard({ total }: TotalCategoriesCardProps) {
  return (
    <Card className="w-40 h-40 rounded-2xl flex flex-col items-center border-4 border-gray-200/20 justify-center bg-gray-400/20">
      <CardHeader>
        <CardDescription>Total Categories</CardDescription>
        <CardTitle className="text-2xl font-semibold text-center">{total}</CardTitle>
      </CardHeader>
    </Card>
  );
}
