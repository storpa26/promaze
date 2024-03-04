import Link from "next/link";
import Image from "next/image";
import avatar from "../public/asset/Shared/avatar.svg";
import { IoSettings } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";

const NavBar = () => {
    const currentUserName = useAuth().currentUser?.displayName;
    const { logOut } = useAuth();
    const auth = useAuth();

    const handleLogout = () => {
        try {
            logOut(auth)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            setModalStatus({ status: "error", message: error.message });
        }
    };
    return (

        <div className="sticky my-5 z-10 ">
            <div className="w-full flex justify-between items-center text-center">
                <Link href="/dashboard">
                    <div className="md:px-7 px-6 scale-175 h-8 w-auto sm:h-10 relative flex gap-x-1">
                        <IoSettings />
                        <h5 className="font-bold gap-0">Pro <span className="text-teal-600">maze</span></h5>

                    </div>
                </Link>
                <div className="flex items-center text-center">
                    <span className="mr-3 font-semibold">
                        {currentUserName}
                    </span>
                    <Link
                        href="/dashboard/profile"
                        className="font-medium hover:scale-105"
                    >
                        <Image
                            src={avatar}
                            alt="profile-img"
                            height={50}
                            width={50}
                        />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
