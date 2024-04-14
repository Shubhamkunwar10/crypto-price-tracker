// this would be a helper function to make request to the server to get the data

export class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  // helper function to add keys to the header
  addHeader(key, value) {
    this.headers[key] = value;
  }

  async get(endpoint) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: "GET",
      headers: this.headers,
    });
    const data = await response.json();
    return data;
  }

  async post(url, body) {
    const response = await fetch(this.baseUrl + url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
}
