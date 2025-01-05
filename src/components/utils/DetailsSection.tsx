import { CiCircleInfo } from "react-icons/ci";

const DetailsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 border-b">
    <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4 border-b p-1">
      <CiCircleInfo className="w-5 h-5 text-blue-500" />
      {title}
    </h2>
    {children}
  </div>
);

export default DetailsSection;
