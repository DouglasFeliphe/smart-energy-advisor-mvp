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
    <div className="flex space-x-2 mb-6 pb-2 border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onClick(tab)}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === tab
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
        >
          {renderTabName(tab as string)}
        </button>
      ))}
    </div>
  );
};
