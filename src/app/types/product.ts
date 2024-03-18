export type ProductContentType = {
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
