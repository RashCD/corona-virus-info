export default class api {
  static async get<T>(url: string): Promise<T> {
    return new Promise((resolve) => {
      fetch(`https://api.covid19api.com${url}`)
        .then((response) => response.json())
        .then((body) => {
          resolve(body)
        })
    })
  }
}
