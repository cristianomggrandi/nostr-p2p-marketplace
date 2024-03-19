"use client"

import BitcoinIcon from "@/app/components/BitcoinIcon"
import useFetchedEvents from "@/app/contexts/EventsContext"
import { ProductContentType } from "@/app/types/product"
import { NDKEvent } from "@nostr-dev-kit/ndk"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
    params: {
        productId: string
    }
}

export default function Product(props: Props) {
    const fetchedEvents = useFetchedEvents()
    const [latestEvent, setLatestEvent] = useState<NDKEvent>()
    const eventContent = latestEvent ? (JSON.parse(latestEvent.content) as ProductContentType) : null

    // TODO: Save latestEvent on localStorage
    const getProductDetails = async () => {
        const eventCached = localStorage.getItem(props.params.productId)
        if (eventCached) {
            setLatestEvent(JSON.parse(eventCached) as NDKEvent)
            return
        }

        const matchingEventSet = new Set(
            fetchedEvents.filter(event => {
                const content = JSON.parse(event.content) as ProductContentType

                return content.id === props.params.productId
            })
        )

        // TODO:
        if (!matchingEventSet.size) return null

        const matchingEventArray = Array.from(matchingEventSet)

        const latestEvent = matchingEventArray.reduce((prev, event) => {
            if (!prev || !prev.created_at) return event

            if (!event.created_at) return prev

            if (event.created_at > prev.created_at) return event
            else return prev
        }, matchingEventArray[0])

        if (latestEvent) {
            setLatestEvent(latestEvent)
            localStorage.setItem(props.params.productId, JSON.stringify(await latestEvent.toNostrEvent()))
        }

        console.log("latestEvent", latestEvent)
    }

    useEffect(() => {
        if (fetchedEvents.length) getProductDetails()
    }, [fetchedEvents])

    if (!eventContent) return <div>No event</div>

    const mainImage = eventContent.images ? eventContent.images[0] : null

    return (
        <main className="h-[90%] grid grid-cols-2 items-center p-12 bg-primary text-secondary">
            <div>
                {eventContent.images && mainImage ? (
                    // TODO: Create carousel for images
                    <Image
                        // TODO: Ugly as fuck
                        loader={() => (eventContent.images ? eventContent.images[0] : (null as unknown as string))}
                        src={eventContent.images[0]}
                        alt={eventContent.name}
                        width={480}
                        height={480}
                    />
                ) : (
                    <div className="flex justify-center">
                        <BitcoinIcon width="180px" height="180px" />
                    </div>
                )}
            </div>
            <div className="flex flex-col h-full justify-between">
                <span className="text-4xl font-bold text-bitcoin">{eventContent.name}</span>
                <span className="text-gray-300">{eventContent.description}</span>
                <div className="flex gap-2">
                    {eventContent.price ? (
                        <>
                            <span className="text-white">{eventContent.price ?? 10000}</span>
                            <span className="text-bitcoin uppercase">{eventContent.currency}</span>
                        </>
                    ) : null}
                </div>
            </div>
        </main>
    )
}
