/** @format */

"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/emptyOrg";
import { BoardList } from "./_components/boardList";

interface DashboardPageProps {
    searchParams: {
        search?: string;
        favourites?: string;
    };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
    const { organization } = useOrganization();

    return (
        <div className="flex-1 h-[calc(100%-92px)] p-6">
            {JSON.stringify(searchParams)}
            {!organization ? (
                <EmptyOrg />
            ) : (
                <BoardList orgId={organization.id} query={searchParams} />
            )}
        </div>
    );
};

export default DashboardPage;
