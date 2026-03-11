export function OpenTome() {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-50 h-40"
    >
      <ellipse cx="100" cy="152" rx="60" ry="5" fill="rgba(0,0,0,0.5)" />

      <path
        d="M100 20 C80 18 40 22 20 30 L18 135 C38 127 78 123 100 125 Z"
        fill="#1a1510"
        stroke="#b8922a"
        strokeWidth="0.8"
        opacity="0.95"
      />

      {[50, 60, 70, 80, 90, 100].map((y, i) => (
        <line
          key={i}
          x1={35 - i * 0.5}
          y1={y}
          x2={90 - i * 0.5}
          y2={y - 4}
          stroke="#2e2820"
          strokeWidth="0.7"
        />
      ))}

      <text
        x="30"
        y="45"
        fontFamily="serif"
        fontSize="18"
        fill="#b8922a"
        opacity="0.55"
      >
        T
      </text>

      <path
        d="M100 20 C120 18 160 22 180 30 L182 135 C162 127 122 123 100 125 Z"
        fill="#1a1510"
        stroke="#b8922a"
        strokeWidth="0.8"
        opacity="0.95"
      />

      {[46, 56, 66, 76, 86, 96].map((y, i) => (
        <line
          key={i}
          x1={110 + i * 0.5}
          y1={y}
          x2={165 + i * 0.5}
          y2={y + 4}
          stroke="#2e2820"
          strokeWidth="0.7"
        />
      ))}

      <g transform="translate(148,65)" opacity="0.5">
        <circle
          cx="0"
          cy="0"
          r="14"
          stroke="#b8922a"
          strokeWidth="0.6"
          fill="none"
        />
        <line
          x1="0"
          y1="-12"
          x2="0"
          y2="12"
          stroke="#b8922a"
          strokeWidth="0.6"
        />
        <line
          x1="-12"
          y1="0"
          x2="12"
          y2="0"
          stroke="#b8922a"
          strokeWidth="0.6"
        />
        <line
          x1="-8"
          y1="-8"
          x2="8"
          y2="8"
          stroke="#b8922a"
          strokeWidth="0.4"
        />
        <line
          x1="8"
          y1="-8"
          x2="-8"
          y2="8"
          stroke="#b8922a"
          strokeWidth="0.4"
        />
        <polygon points="0,-10 2,-4 -2,-4" fill="#c94c1a" opacity="0.8" />
      </g>

      <path
        d="M100 20 L100 125"
        stroke="#b8922a"
        strokeWidth="1.2"
        opacity="0.7"
      />
      <path
        d="M20 30 C60 20 140 20 180 30"
        stroke="#b8922a"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
