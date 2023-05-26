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
};

export const toggleFavorite = (address: string) => {
  if (typeof window === "undefined") return;

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const index = favorites.indexOf(address);

  if (index === -1) {
    favorites.push(address);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const isFavorite = (address: string): boolean => {
  if (typeof window === "undefined") return false;

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.includes(address);
};

export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export const setDefaultChain = (chain: string) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("defaultChain", chain);
}

export const getDefaultChain = (): string => {
  if (typeof window === "undefined") return "bsc";

  return localStorage.getItem("defaultChain") || "bsc";
}

