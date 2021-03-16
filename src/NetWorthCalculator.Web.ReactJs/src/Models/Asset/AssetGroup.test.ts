import { AssetGroup, AssetGroupToString } from "./AssetGroup"

describe("AssetGroup", () => {
	it.each([
		[AssetGroup.CashAndInvestments, "Cash and Investments"], 
		[AssetGroup.LongTerm, "Long Term Assets"]
	])("will display proper string representation of passed in AssetGroup", (assetGroup: AssetGroup, expected: string) => {
		expect(AssetGroupToString(assetGroup)).toBe(expected);
	})

	it("will return an empty string if an invalid or empty AssetGroup is passed", () => {
		expect(AssetGroupToString((1000))).toBe(null);
	})
})