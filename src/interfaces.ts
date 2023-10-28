export interface SelectItem {
    value: string,
    title: string
}
export interface MetadataPagination {
    pageNumber: number,
    pageSize: number
    total: number
}


export interface CommonDataStore {
    genders: SelectItem[]
}

export interface UseresStore {
    users: User[] | null,
    metadata: MetadataPagination | null
}

export interface User {
    userId: number
    name: string
    email: string
    lastName: string,
    phone: string,
    sex: string,
    birthdate: string,
    weight: number,
    height: number,
    address: string,
    city: string,
    zip: number,
    country: string,
    avatar: string,
    role: string
}