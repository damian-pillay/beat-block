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
      className="bg-[#272626] text-white p-3 rounded-full hover:bg-[#3a3a3a] transition focus:outline-none"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className="material-icons align-middle">{icon}</span>
    </button>
  );
}
