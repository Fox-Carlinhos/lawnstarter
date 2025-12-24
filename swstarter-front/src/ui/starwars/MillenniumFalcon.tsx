export const MillenniumFalcon = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 100 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse
      cx="50"
      cy="30"
      rx="40"
      ry="25"
      fill="#3a3a4a"
      stroke="#5a5a6a"
      strokeWidth="2"
    />
    <ellipse cx="50" cy="30" rx="30" ry="18" fill="#2a2a3a" />
    <circle
      cx="35"
      cy="25"
      r="8"
      fill="#1a1a2a"
      stroke="#4a9eff"
      strokeWidth="1"
    />
    <circle cx="35" cy="25" r="4" fill="#4a9eff" opacity="0.3" />
    <rect
      x="70"
      y="22"
      width="18"
      height="16"
      rx="3"
      fill="#2a2a3a"
      stroke="#5a5a6a"
      strokeWidth="1"
    />
    <rect x="73" y="25" width="4" height="4" fill="#4a9eff" opacity="0.5" />
    <rect x="79" y="25" width="4" height="4" fill="#4a9eff" opacity="0.5" />
    <rect x="73" y="31" width="4" height="4" fill="#4a9eff" opacity="0.5" />
    <rect x="79" y="31" width="4" height="4" fill="#4a9eff" opacity="0.5" />
    <path
      d="M10 30 L20 25 L20 35 Z"
      fill="#3a3a4a"
      stroke="#5a5a6a"
      strokeWidth="1"
    />
    <ellipse
      cx="50"
      cy="30"
      rx="12"
      ry="8"
      fill="#1a1a2a"
      stroke="#4a4a5a"
      strokeWidth="1"
    />
    <circle cx="50" cy="30" r="3" fill="#ffd700" opacity="0.6" />
    <line
      x1="5"
      y1="28"
      x2="12"
      y2="28"
      stroke="#4a9eff"
      strokeWidth="2"
      opacity="0.8"
    />
    <line
      x1="5"
      y1="32"
      x2="12"
      y2="32"
      stroke="#4a9eff"
      strokeWidth="2"
      opacity="0.8"
    />
  </svg>
);
