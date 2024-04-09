import {ReasonForRevocation} from "openpgp";

interface PgpService {
    generatePassphrase(length: number): string;
    generateKeyPair(id: string, passphrase: string): Promise<Object>;
    revokeKeyPair(privateKeyArmored: string,revocationCertificate: string, reason: ReasonForRevocation): Promise<string>;
    encryptMessage(message: string, publicKey: string): Promise<string>;
    decryptMessage(message: string, privateKey: string, passphrase: string): Promise<string>;
}

export { PgpService };