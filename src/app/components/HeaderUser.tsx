"use client"

import useUser from "../contexts/UserContext"

export default function HeaderUser() {
    const user = useUser()

    if (!user || !user.profile) return null

    return (
        <div>
            {user.profile.displayName}
            {user.profile.about}
            {user.profile.image ? <img width={48} height={48} src={user.profile.image} /> : null}
        </div>
    )
}
