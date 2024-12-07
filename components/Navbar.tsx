import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <div className="flex-col">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-zinc-800 via-zinc-500 to-yellow-500 inline-block text-transparent bg-clip-text">
              Start
            </h1>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-800 to-indigo-700 inline-block text-transparent bg-clip-text">
              -up-on!
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <div className="flex flex-col">
                  <button type="submit">
                    <span className="max-sm:hidden">Logout</span>
                  </button>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </div>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
                {/* <span>{session?.user?.name}</span> */}
                <Avatar className="size-10">
                  <AvatarImage
                    src={
                      session?.user?.image ||
                      "https://i.pinimg.com/originals/6d/5f/c6/6d5fc60bae3dc6139eefa31af206596f.jpg"
                    }
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
