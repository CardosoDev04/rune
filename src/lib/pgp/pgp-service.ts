import {MaybeStream, NodeStream, PrivateKey, PublicKey, ReasonForRevocation, WebStream} from "openpgp";
import { KeyPair } from "../../interfaces/key-pair";
interface PgpService {
    generatePassphrase(length: number): string;
    generateKeyPair(id: string, passphrase: string): Promise<KeyPair>;
    revokeKeyPair(privateKeyArmored: string,revocationCertificate: string, reason: ReasonForRevocation): Promise<string>;
    encryptMessage(message: string, publicKey: PublicKey): Promise<MaybeStream<string>>;
    decryptMessage(message: string, privateKey: PrivateKey, passphrase: string): Promise<MaybeStream<string>>;
    decryptAnyKey(key:PrivateKey,passphrase: string): Promise<PrivateKey>;
}

export { PgpService };