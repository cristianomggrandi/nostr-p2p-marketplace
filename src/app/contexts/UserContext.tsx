"use client"

import { NDKNip07Signer, NDKUser } from "@nostr-dev-kit/ndk"
import { createContext, useContext, useState } from "react"
import { ContextProps } from "../types/ContextProps"
import useNDK from "./NDKContext"

type UserContextType = {
    user: NDKUser | null
    loginWithNIP07: () => void
}

const UserContext = createContext<UserContextType | null>(null)

export function UserContextProvider(props: ContextProps) {
    const [user, setUser] = useState<NDKUser | null>(null)

    const ndk = useNDK()

    const loginWithNIP07 = () => {
        const nip07signer = new NDKNip07Signer()
        ndk.signer = nip07signer

        nip07signer.user().then(user => {
            if (user.npub) {
                user.fetchProfile().then(userProfile => {
                    console.log("userProfile:", userProfile)

                    if (userProfile) setUser(user)
                    else throw new Error("User profile not found")
                })
            } else {
                throw new Error("Failed to fetch for your user")
            }
        })
    }

    return <UserContext.Provider value={{ user, loginWithNIP07 }}>{props.children}</UserContext.Provider>
}

export default function useUser() {
    const context = useContext(UserContext)

    if (!context) throw new Error("useUser must be within a Context Provider")

    return context
}
