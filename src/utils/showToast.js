import { toast } from "react-toastify";

/**
 * Show a toast notification.
 * Accepts an object containing exactly 'type' and 'text'.
 *
 * @param {Object} options
 * @param {string} options.type - The type of toast (e.g., 'success', 'error', 'info', 'warning')
 * @param {string} options.text - The message content to show
 */
export function showToast({ type, text }) {
  if (toast[type]) {
    toast[type](text);
  } else {
    toast(text);
  }
}

export default showToast;
