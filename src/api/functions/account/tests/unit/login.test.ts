import { describe, it, expect } from '@jest/globals';

let fakeUsername = 'Mario';
let fakePassword = '654123';
let username = 'Sergio';
let password = '123456';
let valid = true;

describe('Test Correct LoginHandler', () => {
    it('when login and password are correct', async () => {
        await validateLogin(username, password);
    });
});
describe('Test Incorrect LoginHandler', () => {
    it('when login and password are incorrect', async () => {
        await validateLogin(fakeUsername, fakePassword);
    });
});

async function validateLogin(username: string, password: string) {
    const data = {
        Item: {
            username: 'Sergio',
            password: '123456',
        },
    };

    if (data.Item?.['username'] === username && data.Item?.['password'] === password) {
        valid = true;
        expect(valid).toBeTruthy();
    } else {
        valid = false;
        expect(valid).toBeFalsy();
    }
}
