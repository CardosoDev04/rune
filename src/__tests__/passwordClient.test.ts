import {PasswordClient} from "../lib/client/password-client";

const pClient = new PasswordClient()

test('generatePassword without parameters generates a 24 character long string password', async () => {
        const result = await pClient.generatePassword()
        expect(result.length).toBe(24)
        expect(typeof result).toBe('string')
    }
);

test('generatePassword with length 12 generates a 12 character long string password', async () => {
    const result = await pClient.generatePassword(12);
    expect(result.length).toBe(12);
    expect(typeof result).toBe('string')
});

test('generatePassword generates unique passwords', async () => {
    const result1 = await pClient.generatePassword();
    const result2 = await pClient.generatePassword();
    expect(result1).not.toBe(result2);
});

test('generatePassword generates a password with only valid lowercase characters', async () => {
    const result = await pClient.generatePassword(24, false, false, false, true);
    const isValid = /^[a-z]*$/.test(result);
    expect(isValid).toBe(true);
});

test('generatePassword generates a password with only valid uppercase characters', async () => {
    const result = await pClient.generatePassword(24, false, false, true, false);
    const isValid = /^[A-Z]*$/.test(result);
    expect(isValid).toBe(true);
});

test('generatePassword generates a password with only valid numbers', async () => {
    const result = await pClient.generatePassword(24, false, true, false, false);
    const isValid = /^[0-9]*$/.test(result);
    expect(isValid).toBe(true);
});

test('generatePassword generates a password with only valid special characters', async () => {
    const result = await pClient.generatePassword(24, true, false, false, false);
    const isValid = /^[!@#$%^&*]*$/.test(result);
    expect(isValid).toBe(true);
});
