import type { AbiItem } from "web3-utils";

export interface ApiProvider {
  getAbi(address: string): Promise<AbiItem[]>;
}

export class BscScanApi implements ApiProvider {
  private readonly baseUrl = "https://api.bscscan.com/api";

  constructor(private readonly apiKey: string) {}

  public async getAbi(address: string): Promise<AbiItem[]> {
    const url = `${this.baseUrl}?module=contract&action=getabi&address=${address}&apikey=${this.apiKey}`;

    const response = await fetch(url);
    const json = await response.json();

    return json.result;
  }
}
