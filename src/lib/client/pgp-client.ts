import {PgpService} from "../pgp/pgp-service";
import {allCharacters} from "../../character-sets/password";
import * as openpgp from 'openpgp';
import {MaybeStream, NodeStream, ReasonForRevocation, WebStream} from 'openpgp';

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
    async encryptMessage(messageToEncrypt: string, publicKey: string): Promise<MaybeStream<string>> {
        const  recipientPublicKey = await openpgp.readKey({armoredKey: publicKey});
        return await openpgp.encrypt({
               message: await openpgp.createMessage({text: messageToEncrypt}),
               encryptionKeys: recipientPublicKey
           });
        }
    async decryptMessage(message: string, privateKey: string, passphrase: string): Promise<MaybeStream<string>> {
          const messageObj = await openpgp.readMessage({
              armoredMessage: message
          });
        const privateKeyObj = await openpgp.readPrivateKey({armoredKey: privateKey});
       const {data: decrypted, signatures} = await openpgp.decrypt({
                message: messageObj,
                decryptionKeys: privateKeyObj,
        })
        try {
           await signatures[0].verified;
           console.log('Signature verified');
           return decrypted;
        } catch(e: any) {
            console.log('Signature could not be verified' + e.message);
            return Promise.reject(e.message)
        }
    }
}

export {PgpClient};