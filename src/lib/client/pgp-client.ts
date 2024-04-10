import {PgpService} from "../pgp/pgp-service";
import {allCharacters} from "../../character-sets/password";
import * as openpgp from 'openpgp';
import {MaybeStream, PrivateKey, PublicKey, ReasonForRevocation} from 'openpgp';
import {KeyPair} from "../../interfaces/key-pair"

class PgpClient implements PgpService {
      generatePassphrase(length: number): string {
        const characters: string = allCharacters;
        let passphrase: string = "";
        for(let i = 0; i<= length; i++) {
            passphrase += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    return passphrase;
    }

    async generateKeyPair(id: string, passphrase: string): Promise<KeyPair> {
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
    async encryptMessage(messageToEncrypt: string, publicKey: PublicKey): Promise<MaybeStream<string>> {
        return await openpgp.encrypt({
               message: await openpgp.createMessage({text: messageToEncrypt}),
               encryptionKeys: publicKey,

           });
        }
    async decryptMessage(message: string, privateKey: PrivateKey, passphrase: string): Promise<MaybeStream<string>> {
          const messageObj = await openpgp.readMessage({
              armoredMessage: message
          });
       const {data: decrypted, signatures} = await openpgp.decrypt({
                message: messageObj,
                decryptionKeys: privateKey,
        })
        try {
           return decrypted;
        } catch(e: any) {
            console.log('Signature could not be verified' + e.message);
            return Promise.reject(e.message)
        }


    }
    async decryptAnyKey(key: PrivateKey, passphrase: string): Promise<PrivateKey> {
        return await openpgp.decryptKey({
            privateKey: key,
            passphrase: passphrase
        });
    }
}



export {PgpClient};