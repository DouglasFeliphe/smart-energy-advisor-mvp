export const Header = () => {
  return (
    <div className="text-center space-y-3">
      <h1 className="text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
        Smart Energy Advisor
        <span className="animate-pulse">⚡</span>
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto">
        Enter your monthly energy consumption (kWh) and see how small actions
        can generate savings, reduce CO<sub>2</sub> and costs.
      </p>
    </div>
  );
};
