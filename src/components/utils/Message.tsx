import { useState, useEffect } from "react";

interface MessageProps {
  text: string | null;
  type: "error" | "success";
}

const Message: React.FC<MessageProps> = ({ text, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (text) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [text]);

  if (!isVisible || !text) return null;

  return (
    <div
      className={`fixed top-0 right-0 m-4 p-4 rounded-md shadow-md ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {text}
    </div>
  );
};

export default Message;
