import React from 'react';
import SectionCard from './SectionCard';

const DraftOrderCard = () => {
  return (
    <SectionCard title="Draft Order">
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <p>Category picking order in live draft randomised to ensure fairness.</p>
      </div>
    </SectionCard>
  );
};

export default DraftOrderCard;
