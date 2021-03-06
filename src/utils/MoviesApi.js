class ApiMovies {
    constructor(options) {
        this._options = options;
    }

    _answerForServer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialMovies() {
        return fetch(`${this._options.baseUrl}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => this._answerForServer(res));
    }
}

const apiOptions = {
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
};

const apiMovies = new ApiMovies(apiOptions);

export default apiMovies;
