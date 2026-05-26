import React from "react";

interface LayoutWrapperProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ sidebar, children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-bg-base relative">
      {/* Fixed sidebar container */}
      {sidebar}
      
      {/* Main scrolling viewport */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
};
