const testApiBtn = document.querySelector("#testApiBtn");

testApiBtn.onclick = async () => {
    const payload = { name: 'Master', role: 'Developer' };

    let url
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    fakeFetch('save-user', options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

const loginSuccessBtn = document.querySelector("#loginSuccessBtn");
const loginFailureBtn = document.querySelector("#loginFailureBtn");

loginSuccessBtn.onclick = () => login("master", "password");
loginFailureBtn.onclick = () => login("pepito", "pepete");


function login(user, pass) {
    fakeFetch('login-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    })
        .then(res => res.json())
        .then(data => console.log(data));
}