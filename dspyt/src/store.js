import create from "zustand";

export const useStore = create((set) => ({
  contract: null,
  currentUser: null,
  nearConfig: null,
  wallet: null,
  setUpStore: (contract, currentUser, nearConfig, wallet) =>
    set(() => ({
      contract: contract,
      currentUser: currentUser,
      nearConfig: nearConfig,
      wallet: wallet,
    })),
}));
