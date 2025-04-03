import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    // console.log("session =>", session);
    return (
        <div className="text-center space-y-3">
            {session?.user ? (
                <>
                    <h1 className="text-4xl mt-10">
                        Welcome {session?.user?.name}
                    </h1>
                    <p>Email: {session?.user?.email}</p>
                    {session?.user?.image && (
                        <Image
                            src={session?.user?.image}
                            alt="User Image"
                            height={100}
                            width={100}
                            className="mx-auto rounded-full"
                        />
                    )}
                </>
            ) : (
                <h1 className="text-4xl mt-10">Welcome To Dashboard</h1>
            )}
        </div>
    );
};

export default DashboardPage;
