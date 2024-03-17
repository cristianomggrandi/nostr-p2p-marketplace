"use client"

import { NDKUser } from "@nostr-dev-kit/ndk"
import { createContext, useContext, useEffect, useState } from "react"
import { ContextProps } from "../types/ContextProps"
import useNDK from "./NDKContext"

type UserContextType = {
    user: NDKUser | null
}

const UserContext = createContext<UserContextType | null>(null)

export function UserContextProvider(props: ContextProps) {
    const [user, setUser] = useState<NDKUser | null>(null)

    const ndk = useNDK()

    useEffect(() => {
        //TODO: Change to mine "npub1pptz0wg6w5hlnsquafthd00wtceshxu97mhdw0r53m4j9de9y8pqgq2amn" })
        //TODO: Change to the user's
        const user = ndk.getUser({ npub: "npub1lrnvvs6z78s9yjqxxr38uyqkmn34lsaxznnqgd877j4z2qej3j5s09qnw5" })
        user.fetchProfile().then(() => setUser(user))
    }, [])

    return <UserContext.Provider value={{ user }}>{props.children}</UserContext.Provider>
}

export default function useUser() {
    const context = useContext(UserContext)

    if (!context) throw new Error("useNDK must be within a Context Provider")

    return context.user
}
