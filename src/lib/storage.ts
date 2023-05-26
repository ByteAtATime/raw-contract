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

export const toggleFavorite = (address: string, chain: string) => {
  if (typeof window === "undefined") return;

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const index = favorites.indexOf(JSON.stringify([address, chain]));

  if (index === -1) {
    favorites.push(JSON.stringify([address, chain]));
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const isFavorite = (address: string, chain: string): boolean => {
  if (typeof window === "undefined") return false;

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.includes(JSON.stringify([address, chain]));
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

