import { Button } from "./ui/button";
import NavButton from "./stash_ui/Button";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between px-10 py-4">
      <div>
        <h1 className="font-serif text-2xl">Stash</h1>
      </div>
      <div className="flex gap-2">
        <NavButton text="login" />
        <NavButton text="signup" />
      </div>
    </div>
  );
}
