"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

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
      { href: "/firearms/ammo", label: "弾薬一覧" },
      { href: "/firearms/scopes", label: "スコープ一覧" },
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
      { href: "/items/feeders", label: "給餌器" },
    ],
  },
  { href: "/animals", label: "動物一覧" },
  { href: "/areas", label: "保護区" },
  { href: "/multi-trophies", label: "マルチトロフィー" },
  { href: "/simulator", label: "重量シミュレータ" },
]

export function Navigation() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  const handleMouseEnter = (href: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpenMenu(href)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null)
    }, 150)
  }

  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileSubmenu(null)
  }, [pathname])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Desktop Header */}
      <nav className="hidden md:block bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary font-semibold shrink-0"
          >
            <Image 
              src="/favicon.png" 
              alt="TheHunter Simulator" 
              width={32} 
              height={32}
              className="rounded"
            />
            <span>TheHunter Simulator</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href)

              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.href)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === item.href ? null : item.href)
                      }
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openMenu === item.href && "rotate-180"
                        )}
                      />
                    </button>

                    {openMenu === item.href && (
                      <div
                        className="absolute top-full left-0 pt-1"
                        onMouseEnter={() => handleMouseEnter(item.href)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="bg-popover border border-border rounded-md shadow-lg py-1 min-w-[140px]">
                          {item.children.map((child) => {
                            const childActive = pathname === child.href
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-2 text-sm transition-colors",
                                  childActive
                                    ? "text-primary bg-secondary"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                )}
                              >
                                {child.label}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-card border border-border text-foreground shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
          <div className="pt-16 px-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href)

                if (item.children) {
                  const isSubmenuOpen = mobileSubmenu === item.href
                  return (
                    <div key={item.href}>
                      <button
                        onClick={() =>
                          setMobileSubmenu(isSubmenuOpen ? null : item.href)
                        }
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-4 rounded-md text-base font-medium transition-colors",
                          active
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-secondary"
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform",
                            isSubmenuOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {isSubmenuOpen && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/30 pl-4">
                          {item.children.map((child) => {
                            const childActive = pathname === child.href
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-3 rounded-md text-base transition-colors",
                                  childActive
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                {child.label}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-4 py-4 rounded-md text-base font-medium transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
