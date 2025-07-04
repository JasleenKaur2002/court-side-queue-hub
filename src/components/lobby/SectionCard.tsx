
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, action, children, className, titleClassName }) => {
  return (
    <Card className={cn("bg-white dark:bg-zinc-900 shadow-md border-gray-200 dark:border-zinc-800", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className={cn("text-lg font-bold text-gray-800 dark:text-gray-100", titleClassName)}>{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
};

export default SectionCard;
