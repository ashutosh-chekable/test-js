document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Form submitted');

    const url = "https://process-request-vercel.livelyground-855de826.westus.azurecontainerapps.io/"
    // const url = "http://127.0.0.1:5001"
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('Username:', username, 'Password:', password);

    fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json', // Ensure the server can respond with JSON
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
        // ,
        // credentials: 'include' // Include credentials for cross-origin requests
    })
        .then(function (response) {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error('Login failed: ' + (error.message || response.statusText));
                });
            }
            return response.json();
        })
        .then(function (data) {
            console.log('Login successful', data);

            return fetch(`${url}/auth/session`, {
                method: 'POST',
                credentials: 'include' // This allows cookies to be sent with the request
            });
        })
        .then(function (response) {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error('Session check failed: ' + (error.message || response.statusText));
                });
            }
            return response.json();
        })
        .then(function (data) {
            document.getElementById('message').textContent = 'Session is active!';
            console.log('Session active', data);
        })
        .catch(function (error) {
            document.getElementById('message').textContent = error.message;
            console.error(error);
        });
});
