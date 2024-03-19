"use client"

import { NDKEvent } from "@nostr-dev-kit/ndk"
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { ContextProps } from "../types/ContextProps"
import ndk from "../utils/ndk"
import { NOSTR_NIP15_TYPES } from "../utils/nostrTypes"

type EventsContextType = {
    fetchedEvents: NDKEvent[]
    setFetchedEvents: Dispatch<SetStateAction<NDKEvent[]>>
}

const EventsContext = createContext<EventsContextType | null>(null)

export function EventsContextProvider(props: ContextProps) {
    const [fetchedEvents, setFetchedEvents] = useState<NDKEvent[]>([])

    useEffect(() => {
        // TODO: Not working when you go directly to a product
        if (!fetchedEvents.length)
            ndk.fetchEvents({
                kinds: NOSTR_NIP15_TYPES,
            }).then(events => setFetchedEvents(Array.from(events)))

        localStorage.debug = "ndk:*"
    }, [])

    return <EventsContext.Provider value={{ fetchedEvents, setFetchedEvents }}>{props.children}</EventsContext.Provider>
}

export default function useFetchedEvents() {
    const context = useContext(EventsContext)

    if (!context) throw new Error("useFetchedEvents must be within a Context Provider")

    return context.fetchedEvents
}
