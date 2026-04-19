"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Crosshair } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "トップ" },
  {
    label: "銃器一覧",
    href: "/firearms",
    children: [
      { href: "/firearms/rifles", label: "ライフル" },
      { href: "/firearms/shotguns", label: "ショットガン" },
      { href: "/firearms/handguns", label: "ハンドガン" },
      { href: "/firearms/bows", label: "弓" },
    ],
  },
  {
    label: "アイテム一覧",
    href: "/items",
    children: [
      { href: "/items/calls", label: "呼び笛" },
      { href: "/items/scents", label: "匂いアイテム" },
      { href: "/items/equipment", label: "装備" },
      { href: "/items/structures", label: "構造物" },
    ],
  },
  { href: "/simulator", label: "重量シミュレータ" },
];

export function Navigation() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav className="bg-stone-900 border-b border-stone-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-6">
        <Link href="/" className="flex items-center gap-2 text-amber-400 font-bold shrink-0">
          <Crosshair className="w-5 h-5" />
          <span className="hidden sm:block text-sm">TheHunter Simulator</span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 rounded text-sm transition-colors",
                    isActive
                      ? "bg-amber-600 text-white"
                      : "text-stone-300 hover:text-white hover:bg-stone-800"
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.href} className="relative">
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors",
                    isActive
                      ? "bg-amber-600 text-white"
                      : "text-stone-300 hover:text-white hover:bg-stone-800"
                  )}
                  onMouseEnter={() => setOpenMenu(item.href)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onClick={() => setOpenMenu(openMenu === item.href ? null : item.href)}
                >
                  {item.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {openMenu === item.href && (
                  <div
                    className="absolute top-full left-0 mt-1 bg-stone-800 border border-stone-700 rounded shadow-lg min-w-36 z-50"
                    onMouseEnter={() => setOpenMenu(item.href)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors",
                          pathname === child.href
                            ? "text-amber-400 bg-stone-700"
                            : "text-stone-300 hover:text-white hover:bg-stone-700"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
