// Native fetch used

async function testRegisterAndLogin() {
    const email = `test${Date.now()}@test.com`;
    const password = 'password123';
    const name = 'Test User';

    console.log(`Attempting to register: ${email}`);

    try {
        // Register
        const regResponse = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const regData = await regResponse.json();
        console.log('Register Status:', regResponse.status);
        console.log('Register Data:', regData);

        if (regResponse.status !== 201) return;

        // Login
        const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const loginData = await loginResponse.json();
        console.log('Login Status:', loginResponse.status);
        console.log('Login Data:', loginData);

    } catch (error) {
        console.error('Error:', error);
    }
}

testRegisterAndLogin();
