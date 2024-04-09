import {PgpService} from "./lib/pgp/pgp-service";
import {allCharacters} from "./character-sets/password";
import * as openpgp from 'openpgp';
import {ReasonForRevocation} from 'openpgp';

class PgpClient implements PgpService {
      generatePassphrase(length: number): string {
        const characters: string = allCharacters;
        let passphrase: string = "";
        for(let i = 0; i<= length; i++) {
            passphrase += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    return passphrase;
    }

    async generateKeyPair(id: string, passphrase: string): Promise<Object> {
         const {privateKey,publicKey,revocationCertificate} = await openpgp.generateKey({
                type: "ecc",
             curve: "curve25519",
             userIDs: [{name: id}],
             passphrase: passphrase,
             format: "armored"
         });
         return {privateKey: privateKey, publicKey: publicKey, revocationCertificate: revocationCertificate};
    }

    async revokeKeyPair(privateKeyArmored: string, revocationCertificate: string, reason: ReasonForRevocation): Promise<string> {
        const privateKey = await openpgp.readPrivateKey({armoredKey: privateKeyArmored});
        const revocationSignature = await openpgp.readSignature({armoredSignature: revocationCertificate});
        const date = new Date()
        await privateKey.revoke(reason,date);
        return privateKey.armor();
    }
    async encryptMessage(message: string, publicKey: string): Promise<string> {
        // TODO()
    }
    async decryptMessage(message: string, privateKey: string, passphrase: string): Promise<string> {
        // TODO()
    }
}