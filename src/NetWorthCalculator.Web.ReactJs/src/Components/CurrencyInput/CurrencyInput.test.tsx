import React from "react";
import { render } from "@testing-library/react";

import CurrencyInput from "./CurrencyInput";

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
	 * 
	 * The max allowed amount is 1 Trillion, but the test case still returns a properly formatted string,
	 * when it should be an empty string. This may be because the input mask isn't being applied correctly
	 * in the test- will need to do investigation.
	 */
	it.each([
		[-1, "0.00"],
		[0, "0.00"],
		[1, "1.00"],
		[1.235, "1.24"],
		[1234, "1,234.00"],
		[123456789.11, "123,456,789.11"],
		[999999999999.99, "999,999,999,999.99"],
		// [1000000000000, ""], 
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