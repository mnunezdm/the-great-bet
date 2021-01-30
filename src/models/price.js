import { BitcoinPrice } from './bitcoinPrice';

const PROVIDERS = {
  bitcoin: BitcoinPrice,
};

export default class Price {
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
    if (PROVIDERS[cryptoName]) {
      return await PROVIDERS[cryptoName].get();
    } else {
      throw new Error('PROVIDER_NOT_CONFIGURED');
    }
  }
}
