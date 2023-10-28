export interface SelectItem {
    value: string,
    title: string
}


export interface CommonDataStore {
    genders: SelectItem[]
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