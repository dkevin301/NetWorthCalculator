import { action, observable } from "mobx";
import Asset from "../Models/Asset/Asset";
import { AssetGroup } from "../Models/Asset/AssetGroup";
import BalanceSheet from "../Models/BalanceSheet/BalanceSheet";
import { Currency } from "../Models/Currency/Currency";
import Liability from "../Models/Liability/Liability";
import { LiabilityGroup } from "../Models/Liability/LiabilityGroup";
import { PaymentInterval } from "../Models/Liability/PaymentInterval";
import BalanceSheetService from "../Services/BalanceSheet/BalanceSheetService";
import BalanceSheetDto from "../Services/BalanceSheet/Dto/BalanceSheetDto";
import RootStore from "./StoreInitializer";

export default class BalanceSheetStore {

	// Could be a collection if serving multiple users, but for the purposes of this application it can just be a single model
	@observable balanceSheet!: BalanceSheet;

	rootStore: RootStore;

	balanceSheetService: BalanceSheetService;

	constructor(rootStore: RootStore, balanceSheetService: BalanceSheetService) {
		this.rootStore = rootStore;
		this.balanceSheetService = balanceSheetService;

		this.initializeDefaultBalanceSheet();
	}

	@action updateCurrency(id: number, newCurrency: Currency) {
		// TODO
		const mock = new BalanceSheetDto();
		mock.currency = newCurrency;
		this.update(mock);

		console.log(`Serialize and call service with ${id} and ${newCurrency}`);
	}

	@action updateAssetAmount(assetId: number, amount: number) {
		// TODO
		console.log(`Serialize and call service with ${assetId} ${amount}`);
	}

	@action updateLiabilityAmount(liabilityId: number, amount: number) {
		// TODO
		console.log(`Serialize and call service with ${liabilityId} ${amount}`);
	}

	@action update(json: BalanceSheetDto) {
		this.balanceSheet.updateFromJson(json);
	}

	initializeDefaultBalanceSheet = () => {
		this.balanceSheet = new BalanceSheet(1, this);
		this.balanceSheet.currency = Currency.CAD;
		this.balanceSheet.netWorth = 1212130;
		this.balanceSheet.totalAssets = 2120427;
		this.balanceSheet.assets = [
			new Asset({ id: 1, group: AssetGroup.CashAndInvestments, description: "Chequing", amount: 2000, order: 1 }),
			new Asset({ id: 2, group: AssetGroup.CashAndInvestments, description: "Savings for Taxes", amount: 4000, order: 2 }),
			new Asset({ id: 3, group: AssetGroup.CashAndInvestments, description: "Rainy Day Fund", amount: 506, order: 3 }),
			new Asset({ id: 4, group: AssetGroup.CashAndInvestments, description: "Savings for Fun", amount: 5000, order: 4 }),
			new Asset({ id: 5, group: AssetGroup.CashAndInvestments, description: "Savings for Travel", amount: 400, order: 5 }),
			new Asset({ id: 6, group: AssetGroup.CashAndInvestments, description: "Savings for Personal Development", amount: 200, order: 6 }),
			new Asset({ id: 7, group: AssetGroup.CashAndInvestments, description: "Investment 1", amount: 5000, order: 7 }),
			new Asset({ id: 8, group: AssetGroup.CashAndInvestments, description: "Investment 2", amount: 60000, order: 8 }),
			new Asset({ id: 9, group: AssetGroup.CashAndInvestments, description: "Investment 3", amount: 24000, order: 9 }),
			new Asset({ id: 10, group: AssetGroup.LongTerm, description: "Primary Home", amount: 455000, order: 1 }),
			new Asset({ id: 11, group: AssetGroup.LongTerm, description: "Second Home", amount: 1564321, order: 2 }),
			new Asset({ id: 12, group: AssetGroup.LongTerm, description: "Other", amount: 0, order: 3 }),
		];
		this.balanceSheet.totalLiabilities = 908297;
		this.balanceSheet.liabilities = [
			new Liability({ id: 1, group: LiabilityGroup.ShortTerm, description: "Credit Card 1", amount: 4342, paymentInterval: PaymentInterval.Monthly, intervalAmount: 200, order: 1 }),
			new Liability({ id: 2, group: LiabilityGroup.ShortTerm, description: "Credit Card 2", amount: 322, paymentInterval: PaymentInterval.Monthly, intervalAmount: 150, order: 2 }),
			new Liability({ id: 3, group: LiabilityGroup.LongTerm, description: "Mortgage 1", amount: 250999, paymentInterval: PaymentInterval.Monthly, intervalAmount: 2000, order: 1 }),
			new Liability({ id: 4, group: LiabilityGroup.LongTerm, description: "Mortgage 2", amount: 632634, paymentInterval: PaymentInterval.Monthly, intervalAmount: 3500, order: 2 }),
			new Liability({ id: 5, group: LiabilityGroup.LongTerm, description: "Line of Credit", amount: 10000, paymentInterval: PaymentInterval.Monthly, intervalAmount: 500, order: 3 }),
			new Liability({ id: 6, group: LiabilityGroup.LongTerm, description: "Investment Loan", amount: 10000, paymentInterval: PaymentInterval.Monthly, intervalAmount: 700, order: 4 }),
		];
	}
}