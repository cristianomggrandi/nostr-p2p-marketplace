"use client"

// TODO: Change to NDK
import { useProductsEvents } from "../contexts/EventsContext"
import ProductCard from "./components/ProductCard"

export default function Products() {
    const productEvents = useProductsEvents()

    return (
        <main className="grid gap-6 bg-primary min-h-screen grid-cols-3 items-center justify-between p-24">
            {productEvents.map(event => (
                <ProductCard key={event.id} event={event} />
            ))}
        </main>
    )
}
