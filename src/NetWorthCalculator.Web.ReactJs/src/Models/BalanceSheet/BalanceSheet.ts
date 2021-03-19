import { observable, computed, action } from "mobx";
import { computedFn } from "mobx-utils";

import BalanceSheetStore from "../../Stores/BalanceSheetStore";
import Asset from "../Asset/Asset";
import { AssetGroup } from "../Asset/AssetGroup";
import Liability from "../Liability/Liability";
import { LiabilityGroup } from "../Liability/LiabilityGroup";
import { SortBy } from "../../Utils/Utils";
import { Currency, CurrencyToSymbol } from "../Currency/Currency";
import { list, object, serializable, update } from "serializr";
import BalanceSheetDto from "../../Services/BalanceSheet/Dto/BalanceSheetDto";
import AssetDto from "../../Services/BalanceSheet/Dto/AssetDto";
import LiabilityDto from "../../Services/BalanceSheet/Dto/LiabilityDto";

export default class BalanceSheet {
	@serializable @observable id!: number;

	@serializable(list(object(Asset))) @observable assets!: Asset[];

	@serializable @observable currency!: Currency;

	@serializable(list(object(Liability))) @observable liabilities!: Liability[];

	@serializable @observable netWorth!: number;

	@serializable @observable totalAssets!: number;

	@serializable @observable totalLiabilities!: number;

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

		// mobx cannot observe mutations in arrays - need to initialize a new one for it to pickup changes
		if (json.assets != null) {
			this.assets = json.assets.map((x: AssetDto) => {
				return new Asset({ ...x });
			})
		}

		if (json.liabilities != null) {
			this.liabilities = json.liabilities.map((x: LiabilityDto) => {
				return new Liability({ ...x });
			})
		}
	}
}