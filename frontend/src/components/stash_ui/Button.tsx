type NavButtonProps = {
  text: string;
};

export default function NavButton({ text }: NavButtonProps) {
  return (
    <div className="flex px-3 py-0.5 bg-white font-slab rounded-lg text-center justify-center items-center hover:shadow-sm transition-all duration-300 text-sm">
      {text}
    </div>
  );
}
