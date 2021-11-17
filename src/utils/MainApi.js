class ApiMain {
    constructor(options) {
        this._options = options;
    }

    _answerForServer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // postProfileInfo(name, about) {
    //     return fetch(`${this._options.baseUrl}/users/me`, {
    //         method: "PATCH",
    //         headers: {
    //             authorization: `${this._options.authorization}`,
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name: name,
    //             about: about,
    //         }),
    //     }).then((res) => this._answerForServer(res));
    // }

    getInitialSavedMovies() {
        return fetch(`${this._options.baseUrl}/movies`, {
            method: "GET",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }

    SaveMovie( { country,
        director,
        name,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId }) 
        {
        return fetch(`${this._options.baseUrl}/movies`, {
            method: "POST",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }

    login(userEmail, userPassword) {
        return fetch(`${this._options.baseUrl}/signin`, {
            method: "POST",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: userPassword,
                email: userEmail,
            }),
        }).then((res) => this._answerForServer(res));
    }

    logout() {
        return fetch(`${this._options.baseUrl}/signout`, {
            method: "POST",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }

    register(userEmail, userPassword, userName) {
        return fetch(`${this._options.baseUrl}/signup`, {
            method: "POST",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: userPassword,
                email: userEmail,
                name: userName,
            }),
        }).then((res) => this._answerForServer(res));
    }

    checkToken() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "GET",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }
}

const apiOptions = {
    baseUrl: 'http://localhost:3000',
};

const apiMain = new ApiMain(apiOptions);

export default apiMain;
