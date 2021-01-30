const URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export class BitcoinProvider {
  static async getCurrentPrice() {
    return (
      BitcoinProvider.getSessionStoragePrice() ||
      (await BitcoinProvider.fetchCurrentPrice())
    );
  }

  static async fetchCurrentPrice() {
    const response = await fetch(URL);
    const body = await response.json();

    sessionStorage.setItem('bitcoinPrice', JSON.stringify(body));

    return body;
  }

  static getSessionStoragePrice() {
    let result;
    try {
      result = JSON.parse(sessionStorage.getItem('bitcoinPrice'));
      const lastSync = new Date(result?.time?.updatedISO);
      if (new Date() - lastSync > 150000) {
        result = null;
      }
    } catch (e) {
      console.error(e);
    }
    return result;
  }
}
