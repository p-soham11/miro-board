/** @format */

"use client";

import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./searchInput";
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { InviteBtn } from "./sidebar/inviteBtn";

export const Navbar = () => {
    const { organization } = useOrganization();

    return (
        <div className="flex items-center gap-x-4 p-5 rounded-large">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: "360px",
                            },
                            organizationSwitcherTrigger: {
                                padding: "6px",
                                width: "100%",
                                borderRadius: "10px",
                                border: "1px solid #9B999B",
                                justifyContent: "space-between",
                                backgroundColor: "#FFFFFF",
                            },
                        },
                    }}
                />
            </div>
            {organization && <InviteBtn />}

            <UserButton
                appearance={{
                    elements: {
                        avatarBox: "h-[36px] w-[36px]",
                    },
                }}
            />
        </div>
    );
};
