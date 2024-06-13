/** @format */

"use client"; // Ensure this is a client component

import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation"; // Correct import for App Router

const font = Poppins({ subsets: ["latin"], weight: ["700"] });

export const OrgSidebar: React.FC = () => {
    const searchParams = useSearchParams();
    const favourites = searchParams.get("favourites");
    const router = useRouter();

    const handleNavigation = (isFavourites: boolean) => {
        const url = new URL(window.location.href);
        if (isFavourites) {
            url.searchParams.set("favourites", "true");
        } else {
            url.searchParams.delete("favourites");
        }
        router.push(url.toString());
    };

    return (
        <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 h-screen">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <Image src="/logo.svg" alt="logo" width={54} height={54} />
                    <span
                        className={cn("text-xl text-blue-950", font.className)}
                    >
                        mIRO Board
                    </span>
                </div>
            </Link>
            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            justifyContent: "space-between",
                            backgroundColor: "#FFFFFF",
                        },
                    },
                }}
            />
            <div className="space-y-1 w-full">
                <Button
                    className="font-normal justify-start w-full px-2 mb-3"
                    startContent={<LayoutDashboard className="h-4 w-4 mr-2" />}
                    color="primary"
                    size="md"
                    variant={favourites ? "ghost" : "solid"}
                    onClick={() => handleNavigation(false)}
                >
                    Team Boards
                </Button>
                <Button
                    className="font-normal justify-start w-full px-2"
                    startContent={<Star className="h-4 w-4 mr-2" />}
                    color="primary"
                    size="md"
                    variant={favourites ? "solid" : "ghost"}
                    onClick={() => handleNavigation(true)}
                >
                    Favourites
                </Button>
            </div>
        </div>
    );
};
