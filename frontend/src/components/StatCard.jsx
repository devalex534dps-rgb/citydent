import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function StatCard({
  title,
  value,
  subValue,
  badge,
  icon: Icon,
  iconBg,
  iconText,
}) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 tracking-wide">
            {title}
          </p>
          <div className="mt-2 flex items-center gap-2.5">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-slate-900">{value}</span>
              {subValue && (
                <span className="text-slate-400 font-medium text-sm">
                  {subValue}
                </span>
              )}
            </div>
            {badge && (
              <Badge variant="success" className="gap-1 px-2 py-0.5">
                <TrendingUp className="size-3" />
                {badge}
              </Badge>
            )}
          </div>
        </div>
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg} ${iconText}`}
        >
          {Icon && <Icon className="size-5" />}
        </div>
      </CardContent>
    </Card>
  );
}
