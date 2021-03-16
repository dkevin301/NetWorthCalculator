import BalanceSheetService from "../../Services/BalanceSheet/BalanceSheetService";
import BalanceSheetStore from "../../Stores/BalanceSheetStore";
import RootStore from "../../Stores/StoreInitializer";
import Asset from "../Asset/Asset";
import { AssetGroup } from "../Asset/AssetGroup";
import { Currency } from "../Currency/Currency";
import Liability from "../Liability/Liability";
import { LiabilityGroup } from "../Liability/LiabilityGroup";
import { PaymentInterval } from "../Liability/PaymentInterval";
import BalanceSheet from "./BalanceSheet";

describe("BalanceSheet", () => {
	// Net worth is returned by the server
	it("can store and output required fields", () => {
		const mockStore: BalanceSheetStore = new BalanceSheetStore(new RootStore(), new BalanceSheetService());
		const mockSheet: BalanceSheet = new BalanceSheet(1, mockStore);
		mockSheet.assets = [
			{
				amount: 100,
				group: AssetGroup.CashAndInvestments,
				description: "Chequing",
			} as Asset
		];
		mockSheet.liabilities = [
			{
				amount: 500,
				description: "Credit Card 1",
				group: LiabilityGroup.ShortTerm,
				paymentInterval: PaymentInterval.Monthly,
			} as Liability
		];
		mockSheet.currency = Currency.CAD;
		mockSheet.netWorth = 1000;

		expect(mockSheet.assets[0].amount).toBe(100);
		expect(mockSheet.assets[0].group).toBe(AssetGroup.CashAndInvestments);
		expect(mockSheet.assets[0].description).toBe("Chequing");

		expect(mockSheet.currency).toBe(Currency.CAD);
		expect(mockSheet.netWorth).toBe(1000);

		expect(mockSheet.liabilities[0].amount).toBe(500);
		expect(mockSheet.liabilities[0].group).toBe(LiabilityGroup.ShortTerm);
		expect(mockSheet.liabilities[0].description).toBe("Credit Card 1");
		expect(mockSheet.liabilities[0].paymentInterval).toBe(PaymentInterval.Monthly);
	})
})