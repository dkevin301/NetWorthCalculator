import React, { useContext } from "react";
import { render } from "@testing-library/react";

import * as StoreInitializer from "../../Stores/StoreInitializer";
import InitializeStores, { StoresContext } from "../../Stores/StoreInitializer";
import LiabilityLineItemGroup from "./LiabilityLineItemGroup";
import { LiabilityGroup, LiabilityGroupToString } from "../../Models/Liability/LiabilityGroup";
import Liability from "../../Models/Liability/Liability";
import { PaymentInterval, PaymentIntervalToString } from "../../Models/Liability/PaymentInterval";

describe("LiabilityLineItemGroup", () => {
	it("can render passed in group header and assets", () => {
		// Arrange
		const mockGroup = LiabilityGroup.LongTerm;
		const mockPaymentInterval = PaymentInterval.Monthly;
		const mockLiabilities = [
			new Liability({ id: 1, description: "Liability 1", amount: 45, order: 1, group: mockGroup, paymentInterval: mockPaymentInterval, intervalAmount: 50 }),
			new Liability({ id: 2, description: "Liability 2", amount: 500, order: 2, group: mockGroup, paymentInterval: mockPaymentInterval, intervalAmount: 50 }),
		] as Liability[];

		let rootStore = new InitializeStores();

		// Mock out the React context with rootstore
		const testStoreContext = React.createContext(rootStore);
		jest.spyOn(StoreInitializer, "useStores").mockImplementation(() => useContext(testStoreContext));		

		// Act
		const { getByText, getAllByTestId } = render(
			<StoresContext.Provider value={{ ...rootStore }}>
				<LiabilityLineItemGroup group={mockGroup} liabilities={mockLiabilities} paymentInterval={mockPaymentInterval} />
			</StoresContext.Provider>
		);

		// Assert
		expect(getByText(LiabilityGroupToString(mockGroup)!)).toBeInTheDocument();
		expect(getByText(PaymentIntervalToString(mockPaymentInterval)!)).toBeInTheDocument();
		expect(getByText("Liability 1")).toBeInTheDocument();
		expect(getByText("Liability 2")).toBeInTheDocument();
		expect(getAllByTestId("currency-input-amount").length).toBe(mockLiabilities.length * 2);
	})
})