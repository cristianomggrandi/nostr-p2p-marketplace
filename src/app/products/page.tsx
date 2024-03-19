"use client"

// TODO: Change to NDK
import { Filter, SimplePool } from "nostr-tools"
import { useEffect, useState } from "react"
import { useFetchedEvents } from "../contexts/NDKContext"
import RELAYS from "../utils/relays"
import ProductCard from "./components/ProductCard"


export default function Products() {
    const [fetchedEvents] = useFetchedEvents()

    return (
        <main className="grid gap-6 bg-primary min-h-screen grid-cols-3 items-center justify-between p-24">
            {fetchedEvents.map(event => (
                <ProductCard key={event.id} event={event} />
            ))}
        </main>
    )
}
