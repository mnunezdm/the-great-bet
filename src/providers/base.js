export class BaseProvider {
  /**
   *
   * @param {Response} response
   */
  static async getBody(response) {
    let body;
    try {
      body = await response.json();
    } catch (_) {
      body = {
        errors: [
          {
            message: 'Could not deserialize response',
          },
        ],
      };
    }
    return body;
  }

  /**
   *
   * @param {*} error
   * @returns {String}
   */
  static getErrorMessage(body) {
    return body?.errors?.[0]?.message || body?.error?.message || body;
  }

  static urlEncodeBody(body) {
    const formBody = [];
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
}
