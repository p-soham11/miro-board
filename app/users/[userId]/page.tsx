/** @format */

interface UserIdPageProps {
    params: {
        userId: string;
    };
}

const Page = ({ params: { userId } }: UserIdPageProps) => {
    return <div>User ID : {userId}</div>;
};

export default Page;
