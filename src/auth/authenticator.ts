export interface Authenticator {
    login(username: string, password: string): Promise<String>
    register(username: string, password: string): Promise<Object>
    authenticate(token: string, id:string): Promise<Boolean>
    authenticateAdmin(token: string): Promise<Boolean>
    getIDFromToken(token: string): Promise<string>
}