import { BscScanApi, CHAIN_TO_API, CHAIN_TO_RPC_URL } from "$lib/api";
import { Contract } from "$lib/contract";
import Web3 from "web3";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, url }) => {
  const chain = url.searchParams.get("chain") ?? "bsc";
  const api = CHAIN_TO_API[chain] ?? BscScanApi;
  const contract = new Contract(params.address, new api(""));

  try {
    await contract.init(new Web3(CHAIN_TO_RPC_URL[chain] ?? "https://bsc-dataseed.binance.org/").eth.Contract);
  } catch (e: any) {
    throw error(404, {
      message: e.message,
      chain,
    });
  }

  return { contract, readonlyMethods: await contract.getReadonlyMethods(), chain };
};
