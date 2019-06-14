export class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path) {
    return this.request('GET', path);
  }

  request(method, path) {
    return fetch(`${this.baseUrl}/${path}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw response.error();
      });
  }
}
