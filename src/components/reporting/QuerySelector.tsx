import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface QuerySelectorProps {
  selectedQuery: string;
  onQueryChange: (query: string) => void;
  queries: readonly string[];
}

export function QuerySelector({ selectedQuery, onQueryChange, queries }: QuerySelectorProps) {
  const handleMenuClick = ({ key }: { key: string }) => {
    onQueryChange(key);
  };

  const menuItems = queries.map((option) => ({
    key: option,
    label: option,
  }));

  return (
    <div className="mb-3">
      <div className="flex items-center text-lg font-medium">
        <span className="text-gray-700 dark:text-gray-300 mr-1 text-base">
          Show me
        </span>
        <div>
          <Dropdown
            className="text-base text-blue-400 dark:text-blue-300"
            menu={{
              items: menuItems,
              onClick: handleMenuClick,
            }}
            trigger={["click"]}
          >
            <a
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <span>{selectedQuery}</span>
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
