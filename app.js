document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Form submitted');

    const url = "https://process-request-vercel.livelyground-855de826.westus.azurecontainerapps.io/"
    // const url = "http://127.0.0.1:5001"
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('Username:', username, 'Password:', password);

    axios.post(`${url}/auth/login`, {
        email: username,
        password: password
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json', // Ensure the server can respond with JSON
        }
    })
        .then(function (response) {
            console.log('Login successful', response.data);
            return axios.post(`${url}/auth/session`, {}, {
                withCredentials: true // This allows cookies to be sent with the request
            });
        })
        .then(function (response) {
            document.getElementById('message').textContent = 'Session is active!';
            console.log('Session active', response.data);
        })
        .catch(function (error) {
            if (error.response) {
                document.getElementById('message').textContent = 'Error: ' + (error.response.data.message || error.response.statusText);
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                document.getElementById('message').textContent = 'Error: No response received';
                console.error('Error request:', error.request);
            } else {
                document.getElementById('message').textContent = 'Error: ' + error.message;
                console.error('Error message:', error.message);
            }
        });
});
