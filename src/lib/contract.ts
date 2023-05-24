import Web3 from "web3";
import type { ApiProvider } from "./api";
import type { AbiItem } from "web3-utils";
import type { Contract as RawContract } from "web3-eth-contract";

const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

export class Contract {
  private initialized = false;

  private rawContract: RawContract|null = null;
  private abi: AbiItem[]|null = null;

  constructor(private address: string, private provider: ApiProvider) {}

  public async init() {
    this.abi = await this.provider.getAbi(this.address);
    this.rawContract = new web3.eth.Contract(this.abi, this.address);

    this.initialized = true;
  }

  public async getReadonlyMethods() {
    this.requireInitialized();

    return this.abi!!.filter((x) => x.stateMutability === "view" || x.stateMutability === "pure");
  }

  public async readMethod(method: AbiItem, ...params: any[]) {
    this.requireInitialized();

    if (method.stateMutability !== "view" && method.stateMutability !== "pure") {
      throw new Error("readMethod called on writable function");
    }

    return await this.rawContract!!.methods[method.name!!](...params).call();
  }

  private requireInitialized() {
    if (!this.initialized) {
      throw new Error("Contract was not initialized");
    }
  }
}
