import Asset from "./Asset"
import { AssetGroup } from "./AssetGroup";

describe("Asset", () => {
	it("can store and output required fields", () => {
		const testAsset: Asset = new Asset({ 
			id: 1, 
			amount: 50.1, 
			description: "Chequing", 
			group: AssetGroup.CashAndInvestments, 
			order: 1 
		});
		
		expect(testAsset.id).toBe(1);
		expect(testAsset.amount).toBe(50.1);
		expect(testAsset.description).toBe("Chequing");
		expect(testAsset.group).toBe(AssetGroup.CashAndInvestments);
		expect(testAsset.order).toBe(1);
	})
})