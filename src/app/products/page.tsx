"use client"

// TODO: Change to NDK
import { Filter, SimplePool } from "nostr-tools"
import { useEffect, useState } from "react"
import { useFetchedEvents } from "../contexts/NDKContext"
import RELAYS from "../utils/relays"
import ProductCard from "./components/ProductCard"

const FILTERS: Filter[] = [
    {
        kinds: [30017, 30018],
        limit: 10,
    },
]

export default function Products() {
    const [pool, setPool] = useState<SimplePool | null>(null)
    const [fetchedEvents, setFetchedEvents] = useFetchedEvents()

    useEffect(() => {
        const pool = new SimplePool()

        setPool(pool)

        return () => pool.close(RELAYS)
    }, [])

    useEffect(() => {
        if (!pool) return

        const h = pool.subscribeMany(RELAYS, FILTERS, {
            onevent(e) {
                setFetchedEvents(prev => [...prev, e])
            },
            oneose() {
                h.close()
            },
        })

        return () => h.close()
    }, [pool])

    return (
        <main className="grid gap-6 bg-primary min-h-screen grid-cols-3 items-center justify-between p-24">
            {fetchedEvents.map(event => (
                <ProductCard key={event.id} event={event} />
            ))}
        </main>
    )
}
