
export interface Signup {
    // verifyAuth(email:String, password:String): Promise<boolean>
    execute(email:String, password:String): Promise<boolean>
}