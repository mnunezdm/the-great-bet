import { BitcoinProvider } from '../providers/bitcoin';

export class BitcoinPrice {
  static async get() {
    const response = await BitcoinProvider.getCurrentPrice();
    return BitcoinPrice.fromJson(response);
  }

  static fromJson(response) {
    const price = new BitcoinPrice();
    price.lastSync = new Date(response?.time?.updatedISO);
    price.price = response?.bpi?.EUR?.rate;
    return price;
  }
}
