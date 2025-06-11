type ActionButtonProps = {
  icon: string;
  ariaLabel: string;
  onClick?: () => void;
};

export default function ActionButton({
  icon,
  ariaLabel,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      className="bg-[#272626] text-white p-2 rounded-full aspect-square hover:bg-[#383737] transition focus:outline-none cursor-pointer select-none"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className="material-icons align-middle">{icon}</span>
    </button>
  );
}
