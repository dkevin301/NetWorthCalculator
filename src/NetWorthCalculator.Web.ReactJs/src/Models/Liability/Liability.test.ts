import Liability from "./Liability";
import { LiabilityGroup } from "./LiabilityGroup";
import { PaymentInterval } from "./PaymentInterval";

describe("Liability", () => {
	it("can store and output required fields", () => {
		const mockLiability: Liability = new Liability({
			id: 1,
			group: LiabilityGroup.ShortTerm,
			description: "Credit Card 1",
			amount: 4342,
			paymentInterval: PaymentInterval.Monthly,
			intervalAmount: 50,
			order: 1
		});

		expect(mockLiability.id).toBe(1);
		expect(mockLiability.group).toBe(LiabilityGroup.ShortTerm);
		expect(mockLiability.description).toBe("Credit Card 1");
		expect(mockLiability.amount).toBe(4342);
		expect(mockLiability.paymentInterval).toBe(PaymentInterval.Monthly);
		expect(mockLiability.intervalAmount).toBe(50);
		expect(mockLiability.order).toBe(1);
	})
})