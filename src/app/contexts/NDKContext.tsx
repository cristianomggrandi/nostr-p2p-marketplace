"use client"

import NDK, { NDKEvent } from "@nostr-dev-kit/ndk"
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { ContextProps } from "../types/ContextProps"
import { NOSTR_NIP15_TYPES } from "../utils/nostrTypes"
import RELAYS from "../utils/relays"

type NDKContextType = {
    ndk: NDK
    fetchedEvents: NDKEvent[]
    setFetchedEvents: Dispatch<SetStateAction<NDKEvent[]>>
}

const NDKContext = createContext<NDKContextType | null>(null)

const ndk = new NDK({
    explicitRelayUrls: RELAYS,
})

export function NDKContextProvider(props: ContextProps) {
    const [fetchedEvents, setFetchedEvents] = useState<NDKEvent[]>([])

    useEffect(() => {
        ndk.connect()

        localStorage.debug = "ndk:*"
    }, [])

    return <NDKContext.Provider value={{ ndk, fetchedEvents, setFetchedEvents }}>{props.children}</NDKContext.Provider>
}

export default function useNDK() {
    const context = useContext(NDKContext)

    if (!context) throw new Error("useNDK must be within a Context Provider")

    return context.ndk
}

export function useFetchedEvents(): [NDKEvent[], Dispatch<SetStateAction<NDKEvent[]>>] {
    const context = useContext(NDKContext)

    if (!context) throw new Error("useNDK must be within a Context Provider")

    // TODO: Not working when you go directly to a product
    if (!context.fetchedEvents.length)
        context.ndk
            .fetchEvents({
                kinds: NOSTR_NIP15_TYPES,
            })
            .then(events => {
                console.log("asdasd events finish")
                context.setFetchedEvents(Array.from(events))
            })

    return [context.fetchedEvents, context.setFetchedEvents]
}
