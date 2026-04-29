"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalOverlay, modalContent } from "@/lib/motion";

/**
 * Modal — accessible, animated modal with backdrop blur.
 *
 * Usage:
 *   <Modal open={open} onClose={() => setOpen(false)} title="Edit Property">
 *     <p>Content here</p>
 *   </Modal>
 */
export function Modal({ open, onClose, title, children, footer, size = "md" }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const maxWidths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={modalOverlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-modal flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(15,23,42,0.65)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`bg-white rounded-modal shadow-modal w-full ${maxWidths[size] ?? maxWidths.md} max-h-[90vh] flex flex-col`}
          >
            {/* Header */}
            <div className="re-modal-header">
              <h2 id="modal-title" className="text-lg font-semibold text-ink">{title}</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-card text-ink-muted hover:bg-surface-border hover:text-ink transition-colors duration-fast"
                aria-label="Close modal"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="re-modal-body overflow-y-auto flex-1 re-scrollbar">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="re-modal-footer">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
