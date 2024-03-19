"use client"

import { NDKEvent, NDKKind } from "@nostr-dev-kit/ndk"
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { ContextProps } from "../types/ContextProps"
import ndk from "../utils/ndk"

type EventsContextType = {
    fetchedEvents: NDKEvent[]
    setFetchedEvents: Dispatch<SetStateAction<NDKEvent[]>>
    productEvents: NDKEvent[]
    setProductEvents: Dispatch<SetStateAction<NDKEvent[]>>
    stallEvents: NDKEvent[]
    setStallEvents: Dispatch<SetStateAction<NDKEvent[]>>
}

const EventsContext = createContext<EventsContextType | null>(null)

export function EventsContextProvider(props: ContextProps) {
    const [fetchedEvents, setFetchedEvents] = useState<NDKEvent[]>([])
    const [productEvents, setProductEvents] = useState<NDKEvent[]>([])
    const [stallEvents, setStallEvents] = useState<NDKEvent[]>([])

    useEffect(() => {
        if (!fetchedEvents.length)
            ndk.fetchEvents({
                kinds: [NDKKind.MarketStall, NDKKind.MarketProduct],
            }).then(events => setFetchedEvents(Array.from(events)))

        localStorage.debug = "ndk:*"
    }, [])

    useEffect(() => {
        const products: NDKEvent[] = []
        const stalls: NDKEvent[] = []

        fetchedEvents.forEach(event => {
            if (event.kind === 30017) stalls.push(event)
            else if (event.kind === 30018) products.push(event)
            else console.error("eventKind does not match kinds fetched")
        })

        setProductEvents(products)
        setStallEvents(stalls)
    }, [fetchedEvents])

    return (
        <EventsContext.Provider value={{ fetchedEvents, setFetchedEvents, productEvents, setProductEvents, stallEvents, setStallEvents }}>
            {props.children}
        </EventsContext.Provider>
    )
}

export function useFetchedEvents() {
    const context = useContext(EventsContext)

    if (!context) throw new Error("useFetchedEvents must be within a Context Provider")

    return context.fetchedEvents
}

export function useProductsEvents() {
    const context = useContext(EventsContext)

    if (!context) throw new Error("useProductsEvents must be within a Context Provider")

    return context.productEvents
}

export function useStallsEvents() {
    const context = useContext(EventsContext)

    if (!context) throw new Error("useStallsEvents must be within a Context Provider")

    return context.stallEvents
}
