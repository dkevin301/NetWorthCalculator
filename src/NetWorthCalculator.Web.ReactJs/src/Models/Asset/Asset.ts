import { observable } from "mobx";
import { serializable } from "serializr";
import { AssetGroup } from "./AssetGroup";

interface IAsset {
	id: number;
	amount: number;
	group: AssetGroup;
	description: string;
	order: number;
}

export default class Asset {

	@serializable @observable id!: number;

	@serializable @observable amount!: number;

	@serializable @observable group!: AssetGroup;

	@serializable @observable description!: string;

	@serializable @observable order!: number;

	constructor(values: IAsset) {
		Object.assign(this, {...values});
	}
}