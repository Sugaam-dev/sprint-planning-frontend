/**
 * Shared password validation helpers.
 * Reused by SignUp.jsx and ResetPassword.jsx — per team convention this
 * lives in one place instead of each page scoring passwords itself.
 */

export const PASSWORD_STRENGTH_LABELS = [
  "Use 8+ characters with a number and symbol",
  "Weak password",
  "Getting there",
  "Good password",
  "Strong password",
];

// Hex values (not Tailwind classes) — the auth pages style via CSS/inline
// style, not Tailwind utility classes.
export const PASSWORD_STRENGTH_COLORS = ["#DC2626", "#DC2626", "#9333EA", "#16A34A"];

export function scorePassword(value) {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  return score;
}