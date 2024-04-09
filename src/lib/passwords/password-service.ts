interface PasswordService {
    generatePassword(length: number,
                     includeSpecialCharacters: boolean,
                     includeNumbers: boolean,
                     includeUpperCase: boolean,
                     includeLowerCase: boolean): Promise<string>;

}

export { PasswordService };