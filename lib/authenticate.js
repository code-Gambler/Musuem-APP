import jwt_decode from 'jwt-decode';

// => Designed explicitly to store the token
function setToken(token) {
    localStorage.setItem('access_token', token);
}

// => Designed explicitly to retrieve the token from "localStorage" using getItem()
export function getToken() {
    try {
      return localStorage.getItem('access_token');
    } catch (err) {
      return null;
    }
}

// => Removes the token from localStorage using removeItem()
export function removeToken() {
    localStorage.removeItem('access_token');
}

// => Used to obtain the payload from the JWT
export function readToken() {
    try {
      const token = getToken();
      return token ? jwt_decode(token) : null;
    } catch (err) {
      return null;
    }
  }

// => Serves to determine whether or not the current user is "authenticated"
export function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
}

// => Attempts to obtain a JWT from the API using an async fetch request
export async function authenticateUser(user, password) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password: password }),
      headers: {
        'content-type': 'application/json',
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
      setToken(data.token);
      return true;
    } else {
      throw new Error(data.message);
    }
}

// => Attempts to register the user
export async function registerUser(user, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password: password, password2: password2 }),
      headers: {
        'content-type': 'application/json',
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
      return true;
    } else {
      throw new Error(data.message);
    }
}