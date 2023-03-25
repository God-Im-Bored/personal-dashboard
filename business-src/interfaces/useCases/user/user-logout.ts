
export interface Logout {
    execute(email: String, password: String): Promise<boolean>
}