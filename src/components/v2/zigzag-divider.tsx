export function ZigzagDivider() {
  return (
    <svg
      className="w-full h-[5px]"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id="zigzag"
        x="0"
        y="0"
        width="10"
        height="5"
        patternUnits="userSpaceOnUse"
        viewBox="0 0 14 7"
      >
        <path
          d="M0 6C4 6 3.5 0.5 7 0.5C10.5 0.5 10 6 14 6"
          fill="none"
          stroke="var(--color-divider)"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#zigzag)" />
    </svg>
  );
}
