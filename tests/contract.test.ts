import type { AbiItem } from "web3-utils";
import type { ApiProvider } from "../src/lib/api";
import { Contract } from "../src/lib/contract";

const abi: AbiItem[] = [
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
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "readonlyFunctionWithParams",
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

const mockContractProvider = ({
  readonlyFunction,
  readonlyFunctionWithParams,
  notReadonlyFunction,
}: {
  readonlyFunction?: jest.Mock;
  readonlyFunctionWithParams?: jest.Mock;
  notReadonlyFunction?: jest.Mock;
}) => {
  return class {
    public methods = {
      readonlyFunction:
        readonlyFunction ??
        (() => ({
          call: () => Promise.resolve(123),
        })),
      readonlyFunctionWithParams:
        readonlyFunctionWithParams ??
        (() => ({
          call: () => Promise.resolve(234),
        })),
      notReadonlyFunction:
        notReadonlyFunction ??
        (() => ({
          call: () => Promise.resolve(345),
        })),
    };
  };
};

describe("contracts", () => {
  it("should be able to get the readonly functions of a contract", async () => {
    const mockApiProvider: ApiProvider = {
      getAbi: jest.fn().mockReturnValue(abi),
    };

    const contract = new Contract("0x01234", mockApiProvider);
    await contract.init(
      class {
        public methods = {};
      }, // getReadonlyMethods doesn't use this, so we can just pass an empty object
    );

    const readonlyMethods = await contract.getReadonlyMethods();

    expect(mockApiProvider.getAbi).toHaveBeenCalledTimes(1);
    expect(readonlyMethods).toHaveLength(2);
    expect(readonlyMethods[0]).toHaveProperty("name", "readonlyFunction");
    expect(readonlyMethods[1]).toHaveProperty("name", "readonlyFunctionWithParams");
  });

  it("should be able to read a constant function", async () => {
    const mockApiProvider: ApiProvider = {
      getAbi: jest.fn().mockReturnValue(abi),
    };

    const contract = new Contract("0x01234", mockApiProvider);

    const mockConstantFunction = jest.fn().mockReturnValue({ call: () => Promise.resolve(123) });

    await contract.init(mockContractProvider({ readonlyFunction: mockConstantFunction }));

    const result = await contract.readMethod(abi[0]);

    expect(mockApiProvider.getAbi).toHaveBeenCalledTimes(1);
    expect(mockConstantFunction).toHaveBeenCalledTimes(1);
    expect(result).toBe(123);
  });

  it("should be able to read a constant function with params", async () => {
    const mockApiProvider: ApiProvider = {
      getAbi: jest.fn().mockReturnValue(abi),
    };

    const contract = new Contract("0x01234", mockApiProvider);

    const mockFunctionWithParams = jest.fn((num) => ({ call: () => Promise.resolve(num) }));

    await contract.init(
      mockContractProvider({ readonlyFunctionWithParams: mockFunctionWithParams }),
    );

    const result = await contract.readMethod(abi[1], 234);

    expect(mockApiProvider.getAbi).toHaveBeenCalledTimes(1);
    expect(mockFunctionWithParams).toHaveBeenCalledTimes(1);
    expect(mockFunctionWithParams).toHaveBeenCalledWith(234);
    expect(result).toBe(234);
  });

  it("should throw an error when trying to read a non-constant function", async () => {
    const mockApiProvider: ApiProvider = {
      getAbi: jest.fn().mockReturnValue(abi),
    };

    const contract = new Contract("0x01234", mockApiProvider);

    const mockNotReadonlyFunction = jest.fn().mockReturnValue({ call: () => Promise.resolve(345) });

    await contract.init(mockContractProvider({ notReadonlyFunction: mockNotReadonlyFunction }));

    expect(mockApiProvider.getAbi).toHaveBeenCalledTimes(1);
    await expect(contract.readMethod(abi[2])).rejects.toThrow(
      "readMethod called on writable function",
    );
    expect(mockNotReadonlyFunction).toHaveBeenCalledTimes(0);
  });

  it("should throw an error when trying to read a function on an uninitialized contract", async () => {
    const mockApiProvider: ApiProvider = {
      getAbi: jest.fn().mockReturnValue(abi),
    };

    const contract = new Contract("0x01234", mockApiProvider);

    expect(mockApiProvider.getAbi).toHaveBeenCalledTimes(0);
    await expect(contract.readMethod(abi[0])).rejects.toThrow("Contract was not initialized");
  });
});
