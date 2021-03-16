import { observable } from "mobx";
import { AssetGroup } from "./AssetGroup";

interface IAsset {
	id: number;
	amount: number;
	group: AssetGroup;
	description: string;
	order: number;
}

export default class Asset {

	@observable id!: number;

	@observable amount!: number;

	@observable group!: AssetGroup;

	@observable description!: string;

	@observable order!: number;

	constructor(values: IAsset) {
		Object.assign(this, {...values});
	}
}