"use client"

// TODO: Change to NDK
import { useStallsEvents } from "../contexts/EventsContext"
import StallCard from "./components/StallCard"

export default function Stalls() {
    const stallEvents = useStallsEvents()

    return (
        <main className="grid gap-6 bg-primary min-h-screen grid-cols-3 items-center justify-between p-24">
            {stallEvents.map(event => (
                <StallCard key={event.id} event={event} />
            ))}
        </main>
    )
}
