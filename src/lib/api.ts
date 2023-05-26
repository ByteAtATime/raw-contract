import type { AbiItem } from "web3-utils";

export interface ApiProvider {
  getAbi(address: string): Promise<AbiItem[]>;
}

abstract class ScanApi implements ApiProvider {
  abstract baseUrl: string;

  constructor(private readonly apiKey: string) {}

  public async getAbi(address: string): Promise<AbiItem[]> {
    const url = `${this.baseUrl}?module=contract&action=getabi&address=${address}&apikey=${this.apiKey}`;

    const response = await fetch(url);
    const json = await response.json();

    return JSON.parse(json.result);
  }
}

export class BscScanApi extends ScanApi {
  baseUrl = "https://api.bscscan.com/api";
}

export class EtherScanApi extends ScanApi {
  baseUrl = "https://api.etherscan.io/api";
}

export class PolygonScanApi extends ScanApi {
  baseUrl = "https://api.polygonscan.com/api";
}

export const CHAIN_TO_API: Record<string, new (...args: any[]) => ApiProvider> = {
  bsc: BscScanApi,
  eth: EtherScanApi,
  polygon: PolygonScanApi,
};
