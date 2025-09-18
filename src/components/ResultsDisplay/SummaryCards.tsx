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

      <div className="bg-green-50 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-green-700 font-medium">Energy Savings</h3>
          <Icons.Lightbulb className="text-green-600 h-5 w-5" />
        </div>
        <p className="text-2xl font-bold text-green-700 mt-2">
          {result.energySaved} kWh
        </p>
        <p className="text-sm text-green-600 mt-1">
          {savingsPercentage}% reduction potential
        </p>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-blue-700 font-medium">CO₂ Reduction</h3>
          <Icons.Leaf className="text-blue-600 h-5 w-5" />
        </div>
        <p className="text-2xl font-bold text-blue-700 mt-2">
          {result.co2Saved} kg
        </p>
        <p className="text-sm text-blue-600 mt-1">Environmental impact</p>
      </div>

      <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-purple-700 font-medium">Cost Savings</h3>
          <Icons.DollarSign className="text-purple-600 h-5 w-5" />
        </div>
        <p className="text-2xl font-bold text-purple-700 mt-2">
          R${result.moneySaved}
        </p>
        <p className="text-sm text-purple-600 mt-1">Monthly reduction</p>
      </div>
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
