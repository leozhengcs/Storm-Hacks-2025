import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function AvatarMenu({
  profileSrc,
  profileAlt = "Profile",
  profileHref = "/profile",
  onLogout,
}: {
  profileSrc: string | StaticImageData;
  profileAlt: string;
  profileHref: string;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(t) &&
        btnRef.current &&
        !btnRef.current.contains(t)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-label="Open user menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-16 aspect-square rounded-full overflow-clip ring-2 ring-transparent focus:outline-none focus:ring-2"
      >
        <Image
          className="w-full h-full object-cover"
          src={profileSrc}
          alt={profileAlt}
        />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="User menu"
          className="absolute right-0 z-50 mt-2 w-44 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden"
        >
          <div className="py-1" role="none">
            <Link
              href={profileHref}
              role="menuitem"
              className="block px-4 py-2 text-sm hover:bg-neutral-100 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <a
              href={profileHref}
              role="menuitem"
              className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 cursor-pointer"
              onClick={() => {
                setOpen(false);
                onLogout?.();
              }}
            >
              Log out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
