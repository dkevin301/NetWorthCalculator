import { serializable } from "serializr";
import { AssetGroup } from "../../../Models/Asset/AssetGroup";

export default class AssetDto {
	@serializable id!: number;

	@serializable amount!: number;

	@serializable group!: AssetGroup;

	@serializable description!: string;

	@serializable order!: number;
}