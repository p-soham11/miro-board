/** @format */

interface UsersLayoutProps {
    children: React.ReactNode;
}

const UsersLayout = ({ children }: UsersLayoutProps) => {
    return (
        <div className="flex flex-col gap-y-4">
            <nav className=" p-1 bg-red-500 text-white">
                I am reuseable Navbar!
            </nav>
            {children}
        </div>
    );
};

export default UsersLayout;
