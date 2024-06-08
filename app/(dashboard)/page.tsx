/** @format */

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Switch } from "@nextui-org/switch";
import { Checkbox } from "@nextui-org/checkbox";

const DashboardPage = () => {
    return (
        <div>
            <Checkbox>Select</Checkbox>
            <br />
            <Switch color="success">Automatic updates</Switch>
            <div>Dashboard Root page</div>
        </div>
    );
};

export default DashboardPage;
