export interface SelectItem {
    value: string,
    title: string
}

export interface UserCredentials {
    email: string,
    password: string
}

export interface UpdatePassword {
    email: string,
    password: string,
    passwordConfirm: string,
    token: string
}

export interface UserRegistrationData extends UserCredentials{
    name: string
}

export interface MetadataPagination {
    pageNumber: number,
    pageSize: number,
    pageTotal: number
}

export interface NavItem {
    icon: string,
    key:string,
    route: string,
    label: string,
    allowed: UserRole[]
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

export interface ExercisesStore {
    exercises: Exercise[],
    metadata: MetadataPagination
}

export interface CardsStore {
    cards: Card[],
    metadata: MetadataPagination
}
export interface NotificationStore {
    notifications: Notification[]
}

export interface UiStore {
    sideNavIsOpen: boolean,
    pageTitle: string,
    navItems: NavItem[],
    onSearch: Function | undefined
}

export type UserRole = '0' | '1' | '2';

export interface User {
    id: string
    name: string
    email: string
    lastName: string,
    phone: string,
    sex: string,
    birthDate: string,
    job: string,
    weight: number,
    height: number,
    address: string,
    city: string,
    zip: number,
    country: string,
    avatar: string,
    role: UserRole
}

export interface Exercise {
    id: string
    name: string,
    description: string,
    mediaUrl: string,
    notes: string,
    creatorUserId: string
}

export interface Card {
    id: string,
    name: string,
    disabled: boolean,
    dateFrom: string,
    dateTo: string,
    user: User
    cardDetails: CardDetail[]
}
export interface CardDetail {
    id: string,
    quantity: number,
    timeDuration: number,
    timeRecovery: number,
    weight: number,
    notes: string,
    exercise: Exercise
}

export interface Notification {
    text: string,
    type: string,
    timeout?: any
}

// FROM API
export interface RetrieveDataResponseInterface {
    data: any,
    meta: {
      current_page: number,
      last_page: number,
      per_page: number
    };
  }