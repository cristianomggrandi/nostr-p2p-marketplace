"use client"

import BitcoinIcon from "@/app/components/BitcoinIcon"
import { ProductContentType } from "@/app/types/product"
import { NDKEvent } from "@nostr-dev-kit/ndk"
import Link from "next/link"

type ProductProps = { event: NDKEvent }

type TagProps = { tag: string[] }

function Tag(props: TagProps) {
    if (props.tag[0] !== "t") return null

    return (
        <span className="inline-block text-nowrap h-min bg-bitcoin text-secondary rounded-full px-3 py-1 text-xs font-semibold">
            #{props.tag[1]}
        </span>
    )
}

export default function ProductCard(props: ProductProps) {
    const product = props.event
    const content = JSON.parse(product.content) as ProductContentType

    console.log("prod", product, content)

    const mainImage = content.images ? content.images[0] : null

    return (
        <Link
            href={"/product/" + content.id}
            className="grid grid-rows-[min-content_min-content_min-content_min-content] content-between h-96 bg-secondary text-white rounded-xl overflow-hidden shadow-2xlxl px-6 py-4"
        >
            {/* TODO: Create carousel for images */}
            {/* {mainImage ? (
                <div style={{ backgroundImage: `url(${mainImage})` }} className="bg-center bg-no-repeat bg-contain h-32" />
            ) : (
            )} */}
            <div className="flex justify-center">
                <BitcoinIcon />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center h-14">
                    <p className="font-bold text-xl line-clamp-2">{content.name}</p>
                </div>
                <div className="flex items-center h-[4.5rem]">
                    <p className="text-gray-400 text-base line-clamp-3">{content.description}</p>
                </div>
            </div>
            <div className="flex flex-row gap-2 text-xl">
                <span>{content.price ?? 10000}</span>
                <span className="text-bitcoin uppercase">{content.currency}</span>
            </div>
            <div className="flex h-6 self-end gap-2 flex-nowrap no-scrollbar no-wrap overflow-x-scroll">
                {product.tags.map((tag, i) => (
                    <Tag key={i} tag={tag} />
                ))}
            </div>
        </Link>
    )
}
