import type { ApiProvider } from "../src/lib/api";
import { Contract } from "../src/lib/contract";

describe("contracts", () => {
  it("should be able to get the readonly functions of a contract", async () => {
    const abi = [
      {
        inputs: [],
        name: "readonlyFunction",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "notReadonlyFunction",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const mockApiProvider: ApiProvider = {
      getAbi: jest.fn().mockReturnValue(abi),
    };

    const contract = new Contract("0x01234", mockApiProvider);

    const readonlyMethods = await contract.getReadonlyMethods();

    expect(mockApiProvider.getAbi).toHaveBeenCalledTimes(1);
    expect(readonlyMethods).toHaveLength(1);
    expect(readonlyMethods[0]).toHaveProperty("name", "readonlyFunction");
  });
});
