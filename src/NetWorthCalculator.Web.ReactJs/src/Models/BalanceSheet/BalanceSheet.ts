import { observable, computed, action } from "mobx";
import { computedFn } from "mobx-utils";

import BalanceSheetStore from "../../Stores/BalanceSheetStore";
import Asset from "../Asset/Asset";
import { AssetGroup } from "../Asset/AssetGroup";
import Liability from "../Liability/Liability";
import { LiabilityGroup } from "../Liability/LiabilityGroup";
import { SortBy } from "../../Utils/Utils";
import { Currency, CurrencyToSymbol } from "../Currency/Currency";
import BalanceSheetDto from "../../Services/BalanceSheet/Dto/BalanceSheetDto";
import { serializable, update } from "serializr";

export default class BalanceSheet {
	@observable id!: number;

	@observable assets!: Asset[];

	@serializable @observable currency!: Currency;

	@observable liabilities!: Liability[];

	@observable netWorth!: number;

	@observable totalAssets!: number;

	@observable totalLiabilities!: number;

	store: BalanceSheetStore;

	constructor(id: number, store: BalanceSheetStore) {
		this.id = id;
		this.store = store;
	}

	getAssetsByGroup = computedFn((group: AssetGroup): Asset[] => {
		return this.assets.filter((asset: Asset) => asset.group === group).sort(SortBy("order"));
	});

	getLiabilitiesByGroup = computedFn((group: LiabilityGroup): Liability[] => {
		return this.liabilities.filter((liability: Liability) => liability.group === group).sort(SortBy("order"));
	});

	@computed get getCurrencySymbol(): string {
		return CurrencyToSymbol(this.currency);
	}

	@action updateFromJson(json: BalanceSheetDto) {
		update(BalanceSheet, this, json);
	}
}