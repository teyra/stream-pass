import { createPortal } from "react-dom";
import { useState } from "react";
import Toast from "@/components/Toast";

export function useToast() {
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: "error" | "success" }[]
  >([]);

  const show = (message: string, type: "error" | "success" = "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const remove = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const render = () =>
    createPortal(
      <div>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => remove(toast.id)}
          />
        ))}
      </div>,
      document.body
    );

  return {
    error: (msg: string) => show(msg, "error"),
    success: (msg: string) => show(msg, "success"),
    render,
  };
}
