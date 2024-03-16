import { Event } from "nostr-tools"

type ProductContentType = {
    id: string
    name: string
    description: string
    currency: string
    price?: number
    quantity?: number
    images?: string[]
    shipping?: {
        id: string
        name?: string
        currency?: string
        cost?: number
        countries?: {
            id: string
            name: string
            currency: string
            cost: number
            countries: string[]
        }[]
    }[]
}

type ProductProps = { event: Event }

type TagProps = { tag: string[] }

function Tag(props: TagProps) {
    if (props.tag[0] !== "t") return null

    return (
        <span className="inline-block text-nowrap h-min bg-bitcoin text-secondary rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
            #{props.tag[1]}
        </span>
    )
}

export default function Product(props: ProductProps) {
    const product = props.event
    const content = JSON.parse(product.content) as ProductContentType

    const mainImage = content.images ? content.images[0] : null

    return (
        <div className="grid grid-rows-[min-content_min-content_min-content_min-content] content-between h-96 bg-secondary text-white rounded overflow-hidden shadow-xl px-6 py-4">
            {/* TODO: Create carousel for images */}
            <div
                className="w-full bg-center bg-no-repeat bg-contain h-32"
                style={{
                    backgroundImage: `url(${
                        mainImage ??
                        // TODO: Get a better png, with less pixels (better performance/load time)
                        "" // "https://static.vecteezy.com/system/resources/previews/019/767/953/non_2x/bitcoin-logo-bitcoin-icon-transparent-free-png.png"
                    })`,
                }}
            />

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
                <span className="text-bitcoin">{content.currency.toLocaleUpperCase()}</span>
            </div>
            <div className="flex h-6 self-end gap-2 flex-nowrap no-scrollbar no-wrap overflow-x-scroll">
                {product.tags.map(tag => (
                    <Tag tag={tag} />
                ))}
            </div>
        </div>
    )
}
