import React from "react";

/**
 * Reusable button used across all pages.
 * Per team convention, this is the single source for button styling —
 * don't recreate button markup on individual pages, import this instead.
 *
 * variant: "primary" | "secondary" | "ghost" | "gradient" | "outline" | "light"
 * shape:   "default" (rounded-lg) | "soft" (rounded-2xl, auth forms) | "pill" (rounded-full, landing/marketing CTAs)
 * size:    "sm" | "md" | "lg" | "auth" (controls padding/font-size — independent of variant/shape)
 *
 * For "gradient", pass gradientFrom/gradientTo to override the default
 * blue→violet (used by the auth screens) — e.g. Landing's indigo→cyan CTA.
 */
const VARIANT_CLASSES = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-300",
  secondary:
    "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 active:bg-slate-100 disabled:text-slate-300",
  ghost:
    "bg-transparent text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 disabled:text-indigo-200",
  gradient:
    "relative overflow-hidden text-white bg-gradient-to-r from-[#2563EB] to-[#9333EA] shadow-[0_18px_34px_-16px_rgba(124,58,237,0.7)] hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] disabled:opacity-50 disabled:hover:translate-y-0",
  // Outlined pill button on a light background — e.g. Landing's secondary CTA
  outline:
    "bg-white text-[#171A34] border-[1.5px] border-[rgba(23,26,52,0.14)] hover:border-[#4F46E5] hover:text-[#4F46E5] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0",
  // Solid white button meant to sit on a colored/gradient background
  light:
    "bg-white text-[#4F46E5] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0",
};

const SHAPE_CLASSES = {
  default: "rounded-lg",
  soft: "rounded-[14px]",
  pill: "rounded-full",
};

const SIZE_CLASSES = {
  sm: "px-[22px] py-[10px] text-[14px] font-bold",
  md: "px-4 py-2.5 text-sm font-medium",
  lg: "px-[28px] py-[14px] text-[15px] font-bold",
  auth: "px-4 py-[15px] text-[14.5px] font-bold",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  shape,
  size,
  gradientFrom,
  gradientTo,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  ...rest
}) => {
  const resolvedShape = shape || (variant === "gradient" ? "soft" : "default");
  const resolvedSize = size || (variant === "gradient" ? "auth" : "md");
  const hasShine = variant === "gradient";
  const customGradient = variant === "gradient" && (gradientFrom || gradientTo);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={
        customGradient
          ? {
              backgroundImage: `linear-gradient(120deg, ${gradientFrom || "#4F46E5"} 0%, ${
                gradientTo || "#06B6D4"
              } 100%)`,
            }
          : undefined
      }
      className={`group inline-flex items-center justify-center gap-2
        transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
        disabled:cursor-not-allowed
        ${SHAPE_CLASSES[resolvedShape]}
        ${SIZE_CLASSES[resolvedSize]}
        ${VARIANT_CLASSES[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}`}
      {...rest}
    >
      {hasShine && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-[-60%] h-full w-2/5
            bg-gradient-to-r from-transparent via-white/40 to-transparent
            transition-all duration-500 ease-out group-hover:left-[130%]"
        />
      )}
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;