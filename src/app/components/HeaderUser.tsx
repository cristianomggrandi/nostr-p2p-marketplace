"use client"

import Link from "next/link"
import useUser from "../contexts/UserContext"

export default function HeaderUser() {
    const { user, loginWithNIP07 } = useUser()

    if (!user || !user.profile)
        return (
            <div className="h-12 w-24 flex justify-center items-center">
                <button onClick={loginWithNIP07} className="px-4 py-2 rounded-lg bg-bitcoin text-secondary">
                    Login
                </button>
            </div>
        )

    const profileName = user.profile.name ? user.profile.name[0].toLocaleUpperCase() : "User"

    return (
        <div className="h-12 w-24 flex justify-center">
            <Link
                href="/profile"
                className="block h-12 w-12 bg-bitcoin text-xl text-secondary rounded-full leading-[48px] text-center overflow-hidden"
            >
                {user.profile.image ? <img width={48} height={48} src={user.profile.image} /> : profileName}
            </Link>
        </div>
    )
}
