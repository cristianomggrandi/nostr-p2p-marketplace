"use client"

import { useFetchedEvents } from "@/app/contexts/NDKContext"
import { ProductContentType } from "@/app/types/product"
import { NDKEvent } from "@nostr-dev-kit/ndk"
import { useEffect, useState } from "react"

type Props = {
    params: {
        productId: string
    }
}

export default function Product(props: Props) {
    const [fetchedEvents] = useFetchedEvents()
    const [latestEvent, setLatestEvent] = useState<NDKEvent>()
    const eventContent = latestEvent ? (JSON.parse(latestEvent.content) as ProductContentType) : null

    const getProductDetails = () => {
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

        setLatestEvent(latestEvent)

        console.log("latestEvent", latestEvent)
    }

    useEffect(() => {
        if (fetchedEvents.length) getProductDetails()
    }, [fetchedEvents])

    if (!eventContent) return <div>No event</div>

    return (
        <div>
            <div>{eventContent.name}</div>
            <div>{eventContent.description}</div>
            <div>{eventContent.price}</div>
            <div>{eventContent.currency}</div>
        </div>
    )
}