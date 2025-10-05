"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import profileMain from "@/static/profileMain.png";

const navItems = [
  { name: "Personas", href: "/" },
  { name: "Select Organization", type: "dropdown" },
  { name: "Dashboard", href: "/dashboard" },
];

const organizations = ["Zesty Cafe Inc.", "67 Burgers", "Peter Frank Estates"];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const [organization, setOrganization] = useState(organizations[0]);

  return (
    <nav className="flex items-center justify-between w-[100vw] h-[7vh] my-2 px-12">
      <button className="text-3xl ">
        Good Afternoon <b>Steven</b>
      </button>

      <div className="relative flex flex-row items-center bg-customDarkBlue rounded-full px-2 py-1 h-full gap-x-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          //   Navigation
          if (item.type !== "dropdown") {
            return (
              <button
                key={item.name}
                onClick={() => {router.push(item.href!); setDropdown(false)}}
                className="relative z-10 p-5 text-white text-sm font-medium transition-colors"
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 bg-white/20 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          }

          //    Dropdown
          return (
            <div key={item.name} className="relative">
              <button
                onClick={() => setDropdown((prev) => !prev)}
                className="relative z-10 px-5 py-2 text-white text-sm font-medium flex items-center gap-1"
              >
                {organization}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 transition-transform ${
                    dropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* 🔽 Dropdown menu */}
              {dropdown && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-customDarkBlue/90 border border-white/10 rounded-lg shadow-lg backdrop-blur-md z-50"
                >
                  {organizations.map((org) => (
                    <li key={org}>
                      <button
                        onClick={() => {
                          setOrganization(org);
                          setDropdown(false);
                        }}
                        className="block w-full text-left text-white px-4 py-2 text-sm hover:bg-white/10 transition"
                      >
                        {org}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          );
        })}
      </div>

      <div className="w-16 aspect-square rounded-full overflow-clip">
        <Image
          className="w-full aspect-square object-cover"
          src={profileMain}
          alt="Profile"
        />
      </div>
    </nav>
  );
}
