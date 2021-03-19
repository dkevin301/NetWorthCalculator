import React from "react";
import { render } from "@testing-library/react";

import CurrencyInput from "./CurrencyInput";

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

describe("CurrencyInput", () => {

	it("displays correct currency sybmol", () => {
		// Arrange
		// Act
		const { getByText } = render(
			<CurrencyInput currencySymbol="$" amount={1234.56} />
		);

		// Assert
		expect(getByText("$")).toBeInTheDocument();
	})

	/**
	 * Tests that the inputted amount (as a number) is properly represented in its string format
	 */
	it.each([
		[-1, "0.00"],
		[0, "0.00"],
		[1, "1.00"],
		[1.235, "1.24"],
		[1234, "1,234.00"],
		[123456789.11, "123,456,789.11"],
		[999999999999.99, "999,999,999,999.99"],
		// [1000000000000, ""], // Max allowed amount is 1 Trillion. This condition will fail because the masking isn't being applied.
	])(`displays properly formatted amount of %f, as %s`, async (amount: number, expected: string) => {
		// Arrange
		// Act
		const { getByTestId } = render(
			<CurrencyInput currencySymbol="$" amount={amount} />
		);

		// Assert
		expect(getByTestId("currency-input-amount")).toHaveAttribute("value", expect.stringMatching(expected));
	});
})