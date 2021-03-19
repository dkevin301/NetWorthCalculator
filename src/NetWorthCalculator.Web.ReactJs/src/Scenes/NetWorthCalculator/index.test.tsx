import React, { useContext } from "react";
import { render } from "@testing-library/react";
import Asset from "../../Models/Asset/Asset";
import { AssetGroup } from "../../Models/Asset/AssetGroup";
import Liability from "../../Models/Liability/Liability";
import { LiabilityGroup } from "../../Models/Liability/LiabilityGroup";
import NetWorthCalculator from "./index";
import * as StoreInitializer from "../../Stores/StoreInitializer";
import InitializeStores, { StoresContext } from "../../Stores/StoreInitializer";
import { PaymentInterval } from "../../Models/Liability/PaymentInterval";
import BalanceSheet from "../../Models/BalanceSheet/BalanceSheet";
import { Currency } from "../../Models/Currency/Currency";

/**
 * https://stackoverflow.com/questions/64813447/cannot-read-property-addlistener-of-undefined-react-testing-library
 * <MaskedInput /> initially did not play well with react-testing-library until this was added
 * possibly due to some internals that couldn't be mocked by jest
 */
 global.matchMedia = global.matchMedia || function (query) {
	return {
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // Deprecated
		removeListener: jest.fn(), // Deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	};
};

describe("NetWorthCalculator", () => {
	it("can render calculator", () => {
		// Arrange
		const mockAssets = [
			new Asset({ id: 1, description: "Asset 1", amount: 500, order: 1, group: AssetGroup.CashAndInvestments }),
			new Asset({ id: 2, description: "Asset 2", amount: 45, order: 1, group: AssetGroup.CashAndInvestments }),
		] as Asset[];

		const mockLiabilities = [
			new Liability({ id: 1, description: "Liability 1", amount: 45, order: 1, group: LiabilityGroup.LongTerm, paymentInterval: PaymentInterval.Monthly, intervalAmount: 50 }),
			new Liability({ id: 2, description: "Liability 2", amount: 500, order: 2, group: LiabilityGroup.LongTerm, paymentInterval: PaymentInterval.Monthly, intervalAmount: 50 }),
		] as Liability[];

		let rootStore = new InitializeStores();

		// Mock out the React context with rootstore
		const testStoreContext = React.createContext(rootStore);
		jest.spyOn(StoreInitializer, "useStores").mockImplementation(() => useContext(testStoreContext));	

		const mockBalanceSheet = new BalanceSheet(1, rootStore.balanceSheetStore);
		mockBalanceSheet.currency = Currency.CAD;
		mockBalanceSheet.netWorth = 1212130;
		mockBalanceSheet.totalAssets = 2120427;
		mockBalanceSheet.totalLiabilities = 2120427;
		mockBalanceSheet.assets = mockAssets;
		mockBalanceSheet.liabilities = mockLiabilities;

		// Act
		const { getByText, getByTestId } = render(
			<StoresContext.Provider value={{ ...rootStore }}>
				<NetWorthCalculator />
			</StoresContext.Provider>
		);

		// Assert
		expect(getByText("Tracking Your Net Worth")).toBeInTheDocument();
		expect(getByText("Select Currency:")).toBeInTheDocument();
		expect(getByText("Net Worth")).toBeInTheDocument();
		expect(getByTestId("asset-section")).toBeInTheDocument();
		expect(getByTestId("liability-section")).toBeInTheDocument();
	})
})