"use client"

import { Event, Filter, SimplePool } from "nostr-tools"
import { useEffect, useState } from "react"
import Product from "./components/Product"

const RELAYS = [
    "wss://nos.lol",
    "wss://dev-relay.nostrassets.com",
    "wss://relay.nostrassets.com",
    "wss://relay.varke.eu",
    "wss://nostr.dogdogback.com",
    "wss://nostr.neilalexander.dev",
    "wss://nostr.rubberdoll.cc",
    "wss://global-relay.cesc.trade",
    "wss://relay.bitcoinbarcelona.xyz",
    "wss://nostr-verif.slothy.win",
]

const FILTERS: Filter[] = [
    {
        kinds: [30017, 30018],
        limit: 10,
    },
]

export default function Products() {
    const [pool, setPool] = useState<SimplePool | null>(null)
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        const pool = new SimplePool()

        setPool(pool)

        return () => pool.close(RELAYS)
    }, [])

    useEffect(() => {
        if (!pool) return

        const h = pool.subscribeMany(RELAYS, FILTERS, {
            onevent(e) {
                setEvents(prev => [...prev, e])
            },
            oneose() {
                h.close()
            },
        })

        return () => h.close()
    }, [pool])

    return (
        <main className="grid gap-6 bg-primary min-h-screen grid-cols-3 items-center justify-between p-24">
            {events.map(event => (
                <Product key={event.id} event={event} />
            ))}
        </main>
    )
}
