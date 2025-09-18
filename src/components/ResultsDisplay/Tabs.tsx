interface TabsProps<T> {
  tabs: T[];
  activeTab: T;
  onClick: (tab: T) => void;
}

export const Tabs = <T,>({ tabs, activeTab, onClick }: TabsProps<T>) => {
  const renderTabName = (tab: string) => {
    return tab.substring(0, 1).toUpperCase() + tab.substring(1);
  };

  return (
    <div className="flex mb-6 pb-3 border-b flex-wrap gap-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onClick(tab)}
          className={`rounded bg-gray-900 px-4 py-2 font-medium transition-colors w-full sm:w-full md:w-auto lg:w-auto xl:w-auto ${
            activeTab === tab
              ? 'text-green-600 border-b-2 border-none'
              : 'text-gray-500 hover:text-green-600'
          }`}
        >
          {renderTabName(tab as string)}
        </button>
      ))}
    </div>
  );
};
