import React, { useState } from 'react';
import SectionCard from './SectionCard';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ALL_AVAILABLE_CATEGORIES } from '@/lib/dynamic-draft-data';
import { useToast } from '@/hooks/use-toast';
import { useLeague } from '@/contexts/LeagueContext';

interface DraftCategoriesCardProps {
  isCommissioner: boolean;
}

const DraftCategoriesCard: React.FC<DraftCategoriesCardProps> = ({ isCommissioner }) => {
  const { settings, toggleCategory } = useLeague();
  const { toast } = useToast();

  const handleCategoryToggle = (category: string, checked: boolean) => {
    if (!isCommissioner) return;

    toggleCategory(category);
    toast({
      title: checked ? "Category Added" : "Category Removed",
      description: `${category} ${checked ? 'added to' : 'removed from'} draft`,
    });
  };

  return (
    <SectionCard title="Draft Categories *" action={<Badge variant="secondary">{settings.selectedCategories.length} selected</Badge>}>
      <div className="mb-3">
        <p className="text-xs text-gray-400">Required: Select at least 5 categories for your draft. More categories = longer draft.</p>
      </div>
      <ScrollArea className="h-48 pr-4">
        <div className="space-y-3">
          {ALL_AVAILABLE_CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={settings.selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                disabled={!isCommissioner}
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </SectionCard>
  );
};

export default DraftCategoriesCard;
