import {allCharacters, specialCharacters, lowerCase, upperCase, numbers} from '../../character-sets/password'
import {PasswordService} from "../passwords/password-service";

class PasswordClient implements PasswordService {
    async  generatePassword(
        length: number | undefined = 24,
        includeSpecialCharacters: boolean | undefined = true,
        includeNumbers: boolean | undefined = true,
        includeUppercase: boolean | undefined = true,
        includeLowercase: boolean | undefined = true
    ): Promise<string> {
        let characters: string = '';
        if (includeSpecialCharacters) {
            characters += specialCharacters;
        }
        if (includeNumbers) {
            characters += numbers;
        }
        if (includeUppercase) {
            characters += upperCase;
        }
        if (includeLowercase) {
            characters += lowerCase;
        }

        let password: string = "";

        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return password;

    }
}
export {PasswordClient};