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

type Props = {
    event: Event
}

function Tag(props: { tag: string[] }) {
    if (props.tag[0] !== "t") return null

    return <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{props.tag[1]}</span>
}

export default function Product(props: Props) {
    const product = props.event
    const content = JSON.parse(product.content) as ProductContentType

    const mainImage = content.images ? content.images[0] : null

    console.log(product.tags)

    return (
        <div className="h-96 bg-primary text-white grid rounded overflow-hidden shadow-xl px-6 py-4">
            {/* {mainImage ? <img width={100} height={70} alt={content.name} src={mainImage} className="w-full" /> : null}{" "} */}
            {/* TODO: Change to next/Image */}

            <div
                className="w-full bg-center bg-no-repeat bg-contain h-32"
                style={{
                    backgroundImage: `url(${
                        mainImage ??
                        // TODO: Get a better png, with less pixels (better performance/load time)
                        "https://static.vecteezy.com/system/resources/previews/019/767/953/non_2x/bitcoin-logo-bitcoin-icon-transparent-free-png.png"
                    })`,
                }}
            />

            <div className="">
                <div className="font-bold text-xl mb-2">{content.name}</div>
                <p className="text-gray-400">{content.description}</p> {/* TODO: Limit to 2 lines */}
                <p className="text-gray-400">{content.currency}</p>
            </div>
            <div className="text-xl">
                <span className="">{content.price ?? 10000}</span>{" "}
                <span className="text-bitcoin">{content.currency.toLocaleUpperCase()}</span>
            </div>
            <div className="">
                {/* TODO: Limit to 1 line with horizontal scroll */}
                {product.tags.map(tag => (
                    <Tag tag={tag} />
                ))}
            </div>
        </div>
    )
}
