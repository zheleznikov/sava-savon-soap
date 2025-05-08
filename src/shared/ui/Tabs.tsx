import {FC, useEffect, useRef} from "react";
import clsx from "clsx";


export interface Tab {
    key: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    value: Tab;
    onChange: (key: Tab) => void;
    show?: boolean;
}

const tabWrapper = "relative mb-6";

const scrollContainer = `
    flex
    overflow-x-auto
    scrollbar-none
    whitespace-nowrap
  `;

const tabButton = {
    base: `
  relative
  shrink-0
  px-4
  py-2
  text-lg
  font-medium
  text-gray-600
  transition-colors
  duration-200
  whitespace-nowrap
`,
    active: `
      text-indigo-600
      after:absolute
      after:left-2
      after:right-2
      after:bottom-0
      after:h-[2px]
      after:bg-indigo-600
      after:content-['']
    `,
    inactive: `
      hover:text-gray-800
      after:absolute
      after:left-2
      after:right-2
      after:bottom-0
      after:h-[2px]
      after:bg-gray-300
      after:content-['']
    `
};

export const Tabs: FC<TabsProps> = ({tabs, value, onChange, show = true}) => {

    if (!show) return null;


    return (
        <div className={tabWrapper}>
            <div className="flex items-center gap-x-1">
                <div className={clsx(scrollContainer, "flex-1")}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}

                            onClick={() => onChange(tab)}
                            className={clsx(
                                tabButton.base,
                                value.key === tab.key ? tabButton.active : tabButton.inactive
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>

    );
}
