export class CustomError {
    status: number
    message: string
    constructor(message: string, status: number = 500) {
        this.message = message;
        this.status = status;
    }
}