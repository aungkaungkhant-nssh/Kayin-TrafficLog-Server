import { getServerSession } from "next-auth/next";
import { handlers } from "@/server/auth";
import Link from "next/link";
import Image from "next/image";

const Navbar = async () => {
    const session = await getServerSession(handlers);

    if (!session) {
        return (
            <div className="fixed right-7 top-3 p-2 bg-gray-100 rounded shadow">
                <p className="text-sm text-gray-700">You need to log in to view this page.</p>
                <Link href="/auth/signin" className="text-blue-600 hover:underline mt-1 block">
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <nav className="fixed right-7 top-3 flex items-center gap-3 bg-primary shadow-md rounded-full px-4 py-2">
            {/* Avatar */}
            <Image
                src={"/police.png"}
                alt="User Avatar"
                className="w-10 h-10 "
                width={50}
                height={50}
            />
            {/* Name */}
            <div className="flex flex-col">
                <span className="font-semibold text-white">{session.user?.name}</span>

            </div>
            {/* Optional: simple logout link */}

        </nav>
    );
};

export default Navbar;
