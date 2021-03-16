import { LiabilityGroup, LiabilityGroupToString } from "./LiabilityGroup"

describe("LiabilityGroup", () => {
	it.each([
		[LiabilityGroup.LongTerm, "Long Term Debt"], 
		[LiabilityGroup.ShortTerm, "Short Term Liabilities"]
	])("will display proper string representation of passed in LiabilityGroup", (liabilityGroup: LiabilityGroup, expected: string) => {
		expect(LiabilityGroupToString(liabilityGroup)).toBe(expected);
	})

	it("will return an empty string if an invalid or empty LiabilityGroup is passed", () => {
		expect(LiabilityGroupToString(1000)).toBe(null);
	})
})