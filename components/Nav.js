import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

export default function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="text-2xl font-bold font-poppins border-2 border-gray-800 px-1">HYM
        </button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          /// auth/login
          <Link href={"https://wa.link/l0qisi"} className="py-2 px-4 text-sm bg-gray-800 text-white rounded-lg font-medium ml-8" target="_blank">
            Solicitar acesso
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="/post">
              <button className="font-medium bg-gray-800 rounded text-white py-2 px-4 rounded-mg textx-sm">
                Post
              </button>
            </Link>
            <Link href="/dashboard">
              <button>Meus posts</button>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}