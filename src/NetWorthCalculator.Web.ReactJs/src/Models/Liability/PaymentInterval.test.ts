import { PaymentInterval, PaymentIntervalToString } from "./PaymentInterval"

describe("PaymentInterval", () => {
	it("will display proper string representation of passed in PaymentInterval", () => {
		expect(PaymentIntervalToString(PaymentInterval.Monthly)).toBe("Monthly Payment");
	})

	it("will return an empty string if an invalid or empty PaymentInterval is passed", () => {
		expect(PaymentIntervalToString(1000)).toBe(null);
	})
})