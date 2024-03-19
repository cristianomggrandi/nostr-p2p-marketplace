const NOSTR_STALL_TYPE = 30017
const NOSTR_PRODUCT_TYPE = 30017

const NOSTR_NIP15_TYPES = [NOSTR_STALL_TYPE, NOSTR_PRODUCT_TYPE]

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

type StallContentType = {
    id: string
    name: string
    description?: string
    currency: string
    shipping: {
        id: string
        name: string
        cost: number // Base cost for shipping
        regions: string[]
    }[]
}

export { NOSTR_NIP15_TYPES, NOSTR_PRODUCT_TYPE, NOSTR_STALL_TYPE, type ProductContentType, type StallContentType }
