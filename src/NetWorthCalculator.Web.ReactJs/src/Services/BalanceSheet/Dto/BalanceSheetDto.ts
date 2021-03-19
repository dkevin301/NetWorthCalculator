import { list, object, serializable } from "serializr";
import { Currency } from "../../../Models/Currency/Currency";
import AssetDto from "./AssetDto";
import LiabilityDto from "./LiabilityDto";

export default class BalanceSheetDto {
	@serializable id!: number;

	@serializable currency!: Currency;

	@serializable netWorth!: number;

	@serializable totalAssets!: number;

	@serializable totalLiabilities!: number;

	@serializable(list(object(AssetDto))) assets!: AssetDto[];

	@serializable(list(object(AssetDto))) liabilities!: LiabilityDto[];
}