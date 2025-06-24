"use client";
import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react"; // 推荐用 lucide icons，你也可换

export default function Toast({
  message,
  type = "error",
  duration = 3000,
  onClose,
}: {
  message: string;
  type?: "error" | "success";
  duration?: number;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icon =
    type === "error" ? (
      <AlertTriangle className="w-5 h-5 text-red-400" />
    ) : (
      <CheckCircle className="w-5 h-5 text-green-400" />
    );

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] min-w-[240px] max-w-sm px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm border-l-4 text-sm flex items-start gap-3
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      transition-all duration-300
      ${
        type === "error"
          ? "border-red-500 bg-[#2a2a2a]/90"
          : "border-green-500 bg-[#1f2d24]/90"
      }
    `}
    >
      <div className="pt-0.5">{icon}</div>
      <div className="text-gray-100">{message}</div>
    </div>
  );
}
