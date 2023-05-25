export const setContractName = (address: string, name: string) => {
  const names = {
    ...JSON.parse(localStorage.getItem("contractNames") || "{}"),
    [address]: name,
  };

  localStorage.setItem("contractNames", JSON.stringify(names));
};

export const getContractName = (address: string): string => {
  if (typeof window === "undefined") return address;

  const names = JSON.parse(localStorage.getItem("contractNames") || "{}");
  return names[address] ?? address;
}
