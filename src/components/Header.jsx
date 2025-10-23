import { TiHome } from "react-icons/ti";
import React from "react";

const Header = ({ breadcrumb = ["Upload"] }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
        <TiHome size={20} className="mb-1" />
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <span>/</span>
            <span>{item}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default Header;
