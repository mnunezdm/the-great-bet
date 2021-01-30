import { BitcoinPrice } from './bitcoinPrice';

export default class Price {
  static PROVIDERS = {
    bitcoin: BitcoinPrice,
  };

  /**
   * @type {Number}
   */
  get price() {
    return 0;
  }

  /**
   * @type {Date}
   */
  get lastSync() {
    return new Date();
  }

  /**
   *
   * @param {String} cryptoName
   * @returns {Promise<Price>}
   */
  static async getPrice(cryptoName) {
    if (Price.PROVIDERS[cryptoName]) {
      return await Price.PROVIDERS[cryptoName].get();
    } else {
      throw new Error('PROVIDER_NOT_CONFIGURED');
    }
  }
}
