import React, { useContext } from "react";
import { render } from "@testing-library/react";

import Asset from "../../Models/Asset/Asset";
import { AssetGroup, AssetGroupToString } from "../../Models/Asset/AssetGroup"
import * as StoreInitializer from "../../Stores/StoreInitializer";
import InitializeStores, { StoresContext } from "../../Stores/StoreInitializer";
import AssetLineItemGroup from "./AssetLineItemGroup";

describe("AssetLineItemGroup", () => {
	it("can render passed in group header and assets", () => {
		// Arrange
		const mockGroup = AssetGroup.CashAndInvestments;
		const mockAssets = [
			new Asset({ id: 1, description: "Asset 1", amount: 500, order: 1, group: mockGroup }),
			new Asset({ id: 2, description: "Asset 2", amount: 45, order: 1, group: mockGroup }),
		] as Asset[];

		let rootStore = new InitializeStores();

		// Mock out the React context with rootstore
		const testStoreContext = React.createContext(rootStore);
		jest.spyOn(StoreInitializer, "useStores").mockImplementation(() => useContext(testStoreContext));		

		// Act
		const { getByText, getAllByTestId } = render(
			<StoresContext.Provider value={{ ...rootStore }}>
				<AssetLineItemGroup group={mockGroup} assets={mockAssets} />
			</StoresContext.Provider>
		);

		// Assert
		expect(getByText(AssetGroupToString(mockGroup)!)).toBeInTheDocument();
		expect(getByText("Asset 1")).toBeInTheDocument();
		expect(getByText("Asset 2")).toBeInTheDocument();
		expect(getAllByTestId("currency-input-amount").length).toBe(mockAssets.length);
	})
})