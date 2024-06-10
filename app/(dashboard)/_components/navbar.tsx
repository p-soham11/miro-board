/** @format */

"use client";

import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./searchInput";
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { InviteBtn } from "./sidebar/inviteBtn";

export const Navbar = () => {
    const { organization } = useOrganization();

    return (
        <div className="h-full flex items-center gap-x-4 pt-5 pr-5 pb-5 pl-1 rounded-large max-h-[92px]">
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
                                height: "100%",
                                maxWidth: "360px",
                                marginLeft: "8px",
                            },
                            organizationSwitcherTrigger: {
                                padding: "6px",
                                width: "100%",
                                height: "40px",
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
