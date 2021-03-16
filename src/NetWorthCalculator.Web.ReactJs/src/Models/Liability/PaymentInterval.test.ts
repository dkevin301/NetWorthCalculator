import { PaymentInterval, PaymentIntervalToString } from "./PaymentInterval"

describe("PaymentInterval", () => {
	it.each([
		[PaymentInterval.Monthly, "Monthly Payment"]
	])("will display proper string representation of passed in PaymentInterval", (paymentInterval: PaymentInterval, expected: string) => {
		expect(PaymentIntervalToString(paymentInterval)).toBe(expected);
	})

	it("will return an empty string if an invalid or empty PaymentInterval is passed", () => {
		expect(PaymentIntervalToString(1000)).toBe(null);
	})
})