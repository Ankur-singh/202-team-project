import React, { useState } from "react";

interface TabProps {
  name: string;
  content: React.ReactNode;
}

interface Props {
  tabs: TabProps[];
}

export function Tab({ tabs }: Props): JSX.Element {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <div className="flex justify-center border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            className={`px-4 py-2 text-lg font-medium ${
              index === activeTabIndex
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTabIndex(index);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTabIndex].content}</div>
    </div>
  );
}
