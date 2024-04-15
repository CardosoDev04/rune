
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
    await createFile('./src/test-files/','francisco.txt');
    await createFile('./src/test-files/','cardoso.txt');
    await writeToFile('./src/test-files/francisco.txt',keyPairA.privateKey + "\n" + keyPairA.publicKey + "\n" + keyPairA.revocationCertificate);
    await writeToFile('./src/test-files/cardoso.txt',keyPairB.privateKey + "\n" + keyPairB.publicKey + "\n" + keyPairB.revocationCertificate);
}

main().then(() => console.log("Done.")).catch((e) => console.log(e));