type LinkCardProps = {
  link: string;
  className?: string;
};

const LinkCard = ({ link, className = "" }: LinkCardProps) => (
  <div
    className={`bg-white rounded-lg px-4 py-3 shadow-sm border border-neutral-100 flex items-center w-full h-12.5 ${className}`}
  >
    <span className="text-sm font-medium text-neutral-800 truncate">
      {link}
    </span>
  </div>
);

export default LinkCard;
