import ToolTipProvider from "../toolTip/ToolTipProvider";

export default function IconLabel({
  icon,
  text,
  alt,
}: {
  icon: string;
  text?: string;
  alt: string;
}) {
  return (
    <ToolTipProvider text={alt}>
      {({ onMouseEnter, onMouseLeave, renderToolTip }) => (
        <li
          className="relative flex justify-start items-center gap-2"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <span>
            <img
              src={icon}
              alt={alt}
              className="object-cover md:h-8 md:w-8 h-5 w-5"
            />
          </span>
          <span>
            <p className="md:text-[1.1em] text-sm">{text}</p>
          </span>
          {renderToolTip()}
        </li>
      )}
    </ToolTipProvider>
  );
}
