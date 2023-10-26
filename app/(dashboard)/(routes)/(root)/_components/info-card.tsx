import { IconBadge } from '@/components/icons-badge';
import { LucideIcon } from 'lucide-react';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

interface InforCardProps {
  icon: LucideIcon;
  numberOfItems: number;
  variant?: 'default' | 'success';
  label: string;
}

export default function InfoCard({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InforCardProps) {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
        </p>
      </div>
    </div>
  );
}
