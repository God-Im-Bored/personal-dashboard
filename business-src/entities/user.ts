export interface User {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    getFullName(): string
    birthday: Date
    isAdmin: boolean
    token: String
    createdAt: EpochTimeStamp
}


