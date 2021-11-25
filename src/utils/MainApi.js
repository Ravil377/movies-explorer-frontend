class ApiMain {
    constructor(options) {
        this._options = options;
    }

    _answerForServer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getInitialSavedMovies() {
        return fetch(`${this._options.baseUrl}/movies`, {
            method: "GET",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }

    saveMovie(movie) {
        return fetch(`${this._options.baseUrl}/movies`, {
            method: "POST",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailer: movie.trailerLink,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
                movieId: `${movie.id}`,
            }),
        }).then((res) => this._answerForServer(res));
    }

    deleteMovie(id) {
        return fetch(`${this._options.baseUrl}/movies/${id}`, {
            method: "DELETE",
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

    updateUser(userName, userEmail) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "PATCH",
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail
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
   // baseUrl: 'https://ravil-movies-api.nomoredomains.monster',
    baseUrl: 'http://localhost:3000',
};

const apiMain = new ApiMain(apiOptions);

export default apiMain;
