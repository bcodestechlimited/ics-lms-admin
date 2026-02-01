export const Icons = {
  paymentIcon: PaymentIcon,
};

export function PaymentIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M14 13q-1.25 0-2.125-.875T11 10t.875-2.125T14 7t2.125.875T17 10t-.875 2.125T14 13m-7 3q-.825 0-1.412-.587T5 14V6q0-.825.588-1.412T7 4h14q.825 0 1.413.588T23 6v8q0 .825-.587 1.413T21 16zm2-2h10q0-.825.588-1.412T21 12V8q-.825 0-1.412-.587T19 6H9q0 .825-.587 1.413T7 8v4q.825 0 1.413.588T9 14m11 6H3q-.825 0-1.412-.587T1 18V7h2v11h17zM7 14V6z"
      ></path>
    </svg>
  );
}

export const TotalCouponsIcon = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background coupons (stack effect) */}
    <rect
      x="6"
      y="18"
      width="32"
      height="18"
      rx="3"
      fill="#9191F5"
      opacity="0.3"
    />
    <rect
      x="4"
      y="15"
      width="32"
      height="18"
      rx="3"
      fill="#9191F5"
      opacity="0.5"
    />

    {/* Main coupon */}
    <rect x="8" y="12" width="32" height="18" rx="3" fill="#9191F5" />

    {/* Perforation circles */}
    <circle cx="20" cy="21" r="1.5" fill="white" />
    <circle cx="24" cy="21" r="1.5" fill="white" />
    <circle cx="28" cy="21" r="1.5" fill="white" />

    {/* Dashed line */}
    <line
      x1="14"
      y1="21"
      x2="34"
      y2="21"
      stroke="white"
      strokeWidth="1.5"
      strokeDasharray="2 2"
      opacity="0.6"
    />

    {/* Number indicator */}
    <text x="16" y="19" fill="white" fontSize="8" fontWeight="bold">
      ALL
    </text>
  </svg>
);

// Coupon Usage Icon - Coupon with checkmark
export const CouponUsageIcon = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main coupon */}
    <rect x="8" y="14" width="32" height="20" rx="3" fill="#FF9DA5" />

    {/* Perforation circles */}
    <circle cx="18" cy="24" r="1.5" fill="white" />
    <circle cx="22" cy="24" r="1.5" fill="white" />
    <circle cx="26" cy="24" r="1.5" fill="white" />
    <circle cx="30" cy="24" r="1.5" fill="white" />

    {/* Dashed line */}
    <line
      x1="12"
      y1="24"
      x2="36"
      y2="24"
      stroke="white"
      strokeWidth="1.5"
      strokeDasharray="2 2"
      opacity="0.6"
    />

    {/* Checkmark circle */}
    <circle cx="34" cy="18" r="8" fill="#FF502A" />
    <path
      d="M31 18L33 20L37 16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Active Coupons Icon - Coupon with sparkle/active indicator
export const ActiveCouponsIcon = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main coupon */}
    <rect x="10" y="16" width="28" height="18" rx="3" fill="#34D399" />

    {/* Perforation circles */}
    <circle cx="18" cy="25" r="1.5" fill="white" />
    <circle cx="22" cy="25" r="1.5" fill="white" />
    <circle cx="26" cy="25" r="1.5" fill="white" />
    <circle cx="30" cy="25" r="1.5" fill="white" />

    {/* Dashed line */}
    <line
      x1="14"
      y1="25"
      x2="34"
      y2="25"
      stroke="white"
      strokeWidth="1.5"
      strokeDasharray="2 2"
      opacity="0.6"
    />

    {/* Active sparkles */}
    <path
      d="M36 12L37 15L40 16L37 17L36 20L35 17L32 16L35 15L36 12Z"
      fill="#FF502A"
    />
    <path
      d="M40 28L40.5 29.5L42 30L40.5 30.5L40 32L39.5 30.5L38 30L39.5 29.5L40 28Z"
      fill="#FF502A"
    />

    {/* Text indicator */}
    <text x="16" y="23" fill="white" fontSize="7" fontWeight="bold">
      LIVE
    </text>
  </svg>
);

// Alternative: Simpler Filled Icons
export const TotalCouponsIconSimple = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="20" fill="#9191F5" opacity="0.2" />
    <circle cx="24" cy="24" r="16" fill="#9191F5" />
    <path
      d="M18 24H30M24 18V30"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <rect
      x="14"
      y="20"
      width="20"
      height="8"
      rx="2"
      fill="white"
      opacity="0.3"
    />
  </svg>
);

export const CouponUsageIconSimple = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="20" fill="#FF9DA5" opacity="0.2" />
    <circle cx="24" cy="24" r="16" fill="#FF9DA5" />
    <path
      d="M18 24L22 28L30 20"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ActiveCouponsIconSimple = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="20" fill="#34D399" opacity="0.2" />
    <circle cx="24" cy="24" r="16" fill="#34D399" />
    <path
      d="M24 14L26 20L32 22L26 24L24 30L22 24L16 22L22 20L24 14Z"
      fill="white"
    />
  </svg>
);
