export function ZigzagDivider() {
  return (
    <div
      className="w-full h-[5px]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 14 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6C4 6 3.5 0.5 7 0.5C10.5 0.5 10 6 14 6' stroke='%23DFDFDF'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "10px 5px",
      }}
    />
  );
}
