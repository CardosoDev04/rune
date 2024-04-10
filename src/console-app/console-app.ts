
import {PgpClient} from "../lib/client/pgp-client";
import {PasswordClient} from "../lib/client/password-client";
import * as fs from 'fs/promises';
import {Readable} from "node:stream";
import * as openpgp from 'openpgp';

async function createFile(path:string,fileName:string): Promise<void> {
    console.log("Creating file...");
    const fileHandle = await fs.open(path + fileName, 'w')
    await fileHandle.close();
}
async function writeToFile(path:string, data:string): Promise<void> {
    console.log("Writing to file...");
    await fs.writeFile(path,data)
}

async function main() {
    const pgpClient = new PgpClient();
    const keyPairA = await pgpClient.generateKeyPair("Alice", "test123");
    const keyPairB = await pgpClient.generateKeyPair("Bob", "test123");
    const clearTextMessage: string = "Hello, Bob! This is Alice.";

    const recipientPublicKey = await openpgp.readKey({armoredKey: keyPairB.publicKey});
    const senderPrivateKey = await openpgp.readPrivateKey({armoredKey: keyPairA.privateKey});
    const decryptedSenderPrivateKey = await pgpClient.decryptAnyKey(senderPrivateKey, "test123");
    const encryptedMessage = await pgpClient.encryptMessage(clearTextMessage, recipientPublicKey);
    await createFile("./src/test-files/", "encrypted-message.txt");
    const toWrite = encryptedMessage.toString();
    await writeToFile("./src/test-files/encrypted-message.txt",toWrite );

    const keyToDecrypt = await openpgp.readPrivateKey({armoredKey: keyPairB.privateKey});
    const decryptedPrivateKey = await pgpClient.decryptAnyKey(keyToDecrypt, "test123");

    const decryptedMessage = await pgpClient.decryptMessage(toWrite, decryptedPrivateKey, "test123");
    const decryptedToWrite = decryptedMessage.toString();
    await createFile("./src/test-files/", "decrypted-message.txt");
    await writeToFile("./src/test-files/decrypted-message.txt", decryptedToWrite);

}

main().then(() => console.log("Done.")).catch((e) => console.log(e));