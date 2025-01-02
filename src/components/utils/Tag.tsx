import React from "react";

type TagProps = {
  label: string;
  onRemove: () => void;
};

const Tag: React.FC<TagProps> = ({ label, onRemove }) => {
  return (
    <div className="flex items-center bg-gray-100 border border-gray-300 rounded w-full p-2 hover:bg-gray-200 transition-all duration-200">
      <div className="flex items-center bg-blue-500 rounded py-1 px-2">
        <span className="text-sm text-white font-semibold">{label}</span>
        <button
          onClick={onRemove}
          className="ml-2 text-white bg-red-500 hover:bg-red-600 rounded w-5 h-5 flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Tag;
