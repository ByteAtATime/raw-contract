import { BscScanApi } from "$lib/api";
import { Contract } from "$lib/contract";
import Web3 from "web3";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const contract = new Contract(params.address, new BscScanApi(""));
  await contract.init(new Web3("https://bsc-dataseed.binance.org/").eth.Contract);

  return { contract, readonlyMethods: await contract.getReadonlyMethods() };
};
