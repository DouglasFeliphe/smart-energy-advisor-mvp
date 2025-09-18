import * as Icons from 'lucide-react';
import React from 'react';
import { cn } from '../../lib/utils';

interface SummaryCardsProps {
  result: {
    energySaved: string;
    co2Saved: string;
    moneySaved: string;
  };
  savingsPercentage: number;
}

type CardProps = {
  title: string;

  value: string | number;

  unit: string;
  description: string;
  icon: keyof typeof Icons;
  textColor: 'green' | 'blue' | 'purple';
};

export const SummaryCards = ({
  result,
  savingsPercentage,
}: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        title="Energy Savings"
        value={result.energySaved}
        unit="kWh"
        description={`${savingsPercentage}% reduction potential`}
        icon="Lightbulb"
        textColor="green"
      />
      <Card
        title={'CO₂ Reduction'}
        value={result.co2Saved}
        unit={'kg'}
        description="Environmental impact"
        icon="Leaf"
        textColor={'blue'}
      />
      <Card
        title={'Cost Savings'}
        value={result.moneySaved}
        unit={'R$'}
        description="Monthly reduction"
        icon={'DollarSign'}
        textColor={'purple'}
      />
    </div>
  );
};

const Card = ({
  title,
  value,
  unit,
  description,
  icon,
  textColor,
}: CardProps) => {
  const Icon = Icons[icon] as React.FC<React.SVGProps<SVGElement>>;
  const textColorClasses = {
    green: {
      title: 'text-green-700',
      icon: 'text-green-600',
      value: 'text-green-700',
      description: 'text-green-600',
    },
    blue: {
      title: 'text-blue-700',
      icon: 'text-blue-600',
      value: 'text-blue-700',
      description: 'text-blue-600',
    },
    purple: {
      title: 'text-purple-700',
      icon: 'text-purple-600',
      value: 'text-purple-700',
      description: 'text-purple-600',
    },
  };

  return (
    <div className="card bg-green-50 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className={`font-medium ${textColorClasses[textColor].title}`}>
          {title}
        </h3>
        {Icon && (
          <Icon className={`${textColorClasses[textColor].icon} h-5 w-5`} />
        )}
      </div>
      <p
        className={`text-2xl font-bold ${textColorClasses[textColor].value} mt-2`}
      >
        {value} {unit}
      </p>
      <p
        className={cn('text-sm mt-1', textColorClasses[textColor].description)}
      >
        {description}
      </p>
    </div>
  );
};
