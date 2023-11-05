export interface SelectItem {
    value: string,
    title: string
}

export interface UserCredentials {
    email: string,
    password: string
}

export interface UserRegistrationData extends UserCredentials{
    name: string
}

export interface MetadataPagination {
    pageNumber: number,
    pageSize: number
    pageTotal: number
}


export interface CommonDataStore {
    genders: SelectItem[]
}
export interface AuthStore {
    user: User,
    token: string
}

export interface UseresStore {
    users: User[],
    metadata: MetadataPagination
}

export interface NotificationStore {
    notifications: Notification[]
}

export interface UiStore {
    sideNavIsOpen: boolean,
    pageTitle: string
}


export interface User {
    id: number
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

export interface Notification {
    text: string,
    type: string,
    timeout?: number
}