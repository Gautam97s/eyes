"use client";
import { motion, Variants, Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import { Badge } from "./badge"
import {
  Blocks,
  ChevronsUpDown,
  FileClock,
  GraduationCap,
  Layout,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  MessagesSquare,
  Plus,
  Settings,
  UserCircle,
  UserCog,
  UserSearch,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./avatar"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton"

// FIX: Removed staggerChildren from transitionProps to satisfy Framer types
const transitionProps: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  // Remove staggerChildren from here since it belongs in staggerVariants
};

const sidebarVariants: Variants = {
  open: {
    width: "15rem",
    transition: transitionProps,
  },
  closed: {
    width: "3.05rem",
    transition: transitionProps,
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

// Keep stagger here for children only
const staggerVariants: Variants = {
  open: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02,
      ...transitionProps, // Include base transition props if needed
    },
  },
};



export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  return (
    <motion.div
      className={cn("sidebar fixed left-0 z-40 h-full shrink-0 border-r")}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div
        className="relative z-40 flex h-full shrink-0 flex-col bg-white dark:bg-black transition-all text-muted-foreground"
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            {/* Top Organization Section */}
            <div className="flex h-[54px] w-full shrink-0 border-b p-2">
              <div className="mt-[1.5px] flex w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex w-fit items-center gap-2 px-2"
                >
                  <Avatar className="rounded size-4">
                    <AvatarFallback>E</AvatarFallback>
                  </Avatar>
                  <motion.li
                    variants={variants}
                    className="flex w-fit items-center gap-2"
                  >
                  <p className="text-sm font-medium">Eyes</p>
                  </motion.li>
                </Button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex h-full w-full flex-col">
              <ScrollArea className="h-16 grow p-2">
                <div className={cn("flex w-full flex-col gap-1")}>
                  {/* Core Links */}
                  <Link href="/dashboard" className={cn(
                    "flex h-8 w-full items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                    pathname?.includes("dashboard") && "bg-muted text-blue-600"
                  )}>
                    <LayoutDashboard className="h-4 w-4" />
                    <motion.li variants={variants}>
                      {!isCollapsed && <p className="ml-2 text-sm font-medium">Dashboard</p>}
                    </motion.li>
                  </Link>

                  <Link href="/incidents" className={cn(
                    "flex h-8 w-full items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                    pathname?.includes("incidents") && "bg-muted text-blue-600"
                  )}>
                    <FileClock className="h-4 w-4" />
                    <motion.li variants={variants}>
                      {!isCollapsed && <p className="ml-2 text-sm font-medium">Report Incident</p>}
                    </motion.li>
                  </Link>

                  <Link href="/lost" className={cn(
                    "flex h-8 w-full items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                    pathname?.includes("lost") && "bg-muted text-blue-600"
                  )}>
                    <UserSearch className="h-4 w-4" />
                    <motion.li variants={variants}>
                      {!isCollapsed && <p className="ml-2 text-sm font-medium">Lost & Found</p>}
                    </motion.li>
                  </Link>

                  <Link href="/dispatch" className={cn(
                    "flex h-8 w-full items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                    pathname?.includes("dispatch") && "bg-muted text-blue-600"
                  )}>
                    <MessagesSquare className="h-4 w-4" />
                    <motion.li variants={variants}>
                      {!isCollapsed && <p className="ml-2 text-sm font-medium">Dispatch Panel</p>}
                    </motion.li>
                  </Link>

                  <Link href="/summary" className={cn(
                    "flex h-8 w-full items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                    pathname?.includes("summary") && "bg-muted text-blue-600"
                  )}>
                    <MessageSquareText className="h-4 w-4" />
                    <motion.li variants={variants}>
                      {!isCollapsed && <p className="ml-2 text-sm font-medium">AI Summary</p>}
                    </motion.li>
                  </Link>

                  <Link href="/map" className={cn(
                    "flex h-8 w-full items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary",
                    pathname?.includes("map") && "bg-muted text-blue-600"
                  )}>
                    <Layout className="h-4 w-4" />
                    <motion.li variants={variants}>
                      {!isCollapsed && <p className="ml-2 text-sm font-medium">Heatmap</p>}
                    </motion.li>
                  </Link>
                </div>
              </ScrollArea>

              {/* Settings + Account */}
              <div className="flex flex-col p-2 pb-10">
                <Link href="/settings" className="flex h-8 items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary">
                  <Settings className="h-4 w-4" />
                  <motion.li variants={variants}>
                    {!isCollapsed && <p className="ml-2 text-sm font-medium">Settings</p>}
                  </motion.li>
                </Link>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="w-full">
                    <div className="flex h-8 items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-primary">
                      <Avatar className="size-4"><AvatarFallback>U</AvatarFallback></Avatar>
                      <motion.li variants={variants} className="flex w-full items-center gap-2">
                        {!isCollapsed && <>
                          <p className="text-sm font-medium">Account</p>
                          <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
                        </>}
                      </motion.li>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={5}>
                    <DropdownMenuItem asChild>
                      <Link href="/settings/profile" className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
