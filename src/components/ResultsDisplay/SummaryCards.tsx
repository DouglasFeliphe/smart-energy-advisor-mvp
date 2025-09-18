import * as Icons from 'lucide-react';
import React from 'react';

interface SummaryCardsProps {
  result: {
    energySaved: string;
    co2Saved: string;
    moneySaved: string;
  };
  savingsPercentage: number;
}

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

type CardProps = {
  title: string;

  value: string | number;

  unit: string;
  description: string;
  icon: keyof typeof Icons;
  textColor: 'green' | 'blue' | 'purple';
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

  return (
    <>
      <div className="bg-green-50 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium text-${textColor}-700`}>{title}</h3>
          {Icon && <Icon className={`text-${textColor}-600 h-5 w-5`} />}
        </div>
        <p className={`text-2xl font-bold text-${textColor}-700 mt-2`}>
          {value} {unit}
        </p>
        <p className={`text-sm text-${textColor}-600 mt-1`}>{description}</p>
      </div>
    </>
  );
};
