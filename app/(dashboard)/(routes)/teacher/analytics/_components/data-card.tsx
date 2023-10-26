import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import formatPrice from '@/lib/format';

interface DataCardProps {
  value: number;
  label: string;
  shoudlFormat?: boolean;
}

export default function DataCard({
  value,
  label,
  shoudlFormat,
}: DataCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-bold">
        {shoudlFormat ? formatPrice(value) : value}
      </CardContent>
    </Card>
  );
}
