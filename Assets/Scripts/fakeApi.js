function fakeFetch(url, options = {}) {
    return new Promise(resolve => {
        const delay = Math.floor(Math.random() * 1000) + 100;
        const method = options.method || "GET";
        const body = options.body ? JSON.parse(options.body) : null;

        setTimeout(() => {
            const data = handleRequestByMethodAndPath(url, method, body);

            resolve({
                json: () => Promise.resolve(data)
            });
        }, delay);
    });
}

function handleRequestByMethodAndPath(path, method, body) {
    const key = `${method}:${path}`;

    switch (key) {
        case "POST:save-user":
            return saveUser(body);
        case "POST:login-user":
            return loginUser(body);
        default:
            console.warn("No handler for this method/path");
            return { error: "No handler found" };
    }
}

// Simulated endpoint: Save user
function saveUser(body) {
    db.users.push({
        id: Date.now(),
        username: body.username,
        passwordHash: hashPassword(body.password),
        role: body.role || "user"
    });

    return {
        success: true,
        message: "User saved",
        user: { username: body.username, role: body.role }
    };
}

// Simulated endpoint: Login
function loginUser(body) {
    const { username, password } = body;
    const user = db.users.find(u => u.username === username);

    if (!user) {
        return { success: false, message: "User not found" };
    }

    const hashed = hashPassword(password);
    if (user.passwordHash !== hashed) {
        return { success: false, message: "Invalid password" };
    }

    return {
        success: true,
        message: "Login successful",
        user: { id: user.id, username: user.username, role: user.role }
    };
}

// Very simple (insecure) hash simulation using MD5 hex-like stubs
function hashPassword(password) {
    // Fake hash mapping for demo
    const fakeHashes = {
        "password": "5f4dcc3b5aa765d61d8327deb882cf99",
        "abc123": "e99a18c428cb38d5f260853678922e03"
    };

    return fakeHashes[password] || "invalid_hash";
}
