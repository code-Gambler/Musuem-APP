"use strict";
exports.id = 60;
exports.ids = [60];
exports.modules = {

/***/ 60:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $8: () => (/* binding */ isAuthenticated),
/* harmony export */   LP: () => (/* binding */ getToken),
/* harmony export */   So: () => (/* binding */ authenticateUser),
/* harmony export */   YG: () => (/* binding */ readToken),
/* harmony export */   a$: () => (/* binding */ registerUser),
/* harmony export */   gy: () => (/* binding */ removeToken)
/* harmony export */ });
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5567);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_0__);

// => Designed explicitly to store the token
function setToken(token) {
    localStorage.setItem("access_token", token);
}
// => Designed explicitly to retrieve the token from "localStorage" using getItem()
function getToken() {
    try {
        return localStorage.getItem("access_token");
    } catch (err) {
        return null;
    }
}
// => Removes the token from localStorage using removeItem()
function removeToken() {
    localStorage.removeItem("access_token");
}
// => Used to obtain the payload from the JWT
function readToken() {
    try {
        const token = getToken();
        return token ? jwt_decode__WEBPACK_IMPORTED_MODULE_0___default()(token) : null;
    } catch (err) {
        return null;
    }
}
// => Serves to determine whether or not the current user is "authenticated"
function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
}
// => Attempts to obtain a JWT from the API using an async fetch request
async function authenticateUser(user, password) {
    const res = await fetch(`${"https://modern-scrubs.cyclic.app/api/user"}/login`, {
        method: "POST",
        body: JSON.stringify({
            userName: user,
            password: password
        }),
        headers: {
            "content-type": "application/json"
        }
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
async function registerUser(user, password, password2) {
    const res = await fetch(`${"https://modern-scrubs.cyclic.app/api/user"}/register`, {
        method: "POST",
        body: JSON.stringify({
            userName: user,
            password: password,
            password2: password2
        }),
        headers: {
            "content-type": "application/json"
        }
    });
    const data = await res.json();
    if (res.status === 200) {
        return true;
    } else {
        throw new Error(data.message);
    }
}


/***/ })

};
;