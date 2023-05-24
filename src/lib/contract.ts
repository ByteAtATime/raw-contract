import type { ApiProvider } from "./api";

export class Contract {
  constructor(private address: string, private provider: ApiProvider) {}

  public async getReadonlyMethods() {
    const abi = await this.provider.getAbi(this.address);

    return abi.filter((x) => x.stateMutability === "view" || x.stateMutability === "pure");
  }
}
