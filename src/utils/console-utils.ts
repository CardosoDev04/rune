import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askForInput = (question: string): Promise<string> => {
    return new Promise(resolve => {
        rl.question(question, (answer: string) => {
            resolve(answer);
            rl.close();
        });
    });
}

export { askForInput, rl}
