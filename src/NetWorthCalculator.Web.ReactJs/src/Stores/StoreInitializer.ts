import React from "react";
import BalanceSheetService from "../Services/BalanceSheet/BalanceSheetService";
import BalanceSheetStore from "./BalanceSheetStore";

/**
 * Initialize the RootStore and put it into a React Context.
 * Multiple stores can be defined in here as more entities are added.
 */
export default class RootStore {
	balanceSheetStore: BalanceSheetStore;

	constructor() {
		this.balanceSheetStore = new BalanceSheetStore(this, new BalanceSheetService());
	}	
}

export const initializedStores = new RootStore();

export const StoresContext = React.createContext(initializedStores);

export const useStores = (): RootStore => React.useContext(StoresContext);