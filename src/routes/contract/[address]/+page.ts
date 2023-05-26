import { BscScanApi, CHAIN_TO_API } from "$lib/api";
import { Contract } from "$lib/contract";
import Web3 from "web3";
import type { PageLoad } from "./$types";

const CHAIN_TO_RPC_URL: Record<string, string> = {
  bsc: "https://bsc-dataseed.binance.org/",
  eth: "https://eth.llamarpc.com",
  polygon: "https://polygon-rpc.com/",
};

export const load: PageLoad = async ({ params, url }) => {
  const chain = url.searchParams.get("chain") ?? "bsc";
  const api = CHAIN_TO_API[chain] ?? BscScanApi;
  const contract = new Contract(params.address, new api(""));
  await contract.init(new Web3(CHAIN_TO_RPC_URL[chain] ?? "https://bsc-dataseed.binance.org/").eth.Contract);

  return { contract, readonlyMethods: await contract.getReadonlyMethods(), chain };
};
