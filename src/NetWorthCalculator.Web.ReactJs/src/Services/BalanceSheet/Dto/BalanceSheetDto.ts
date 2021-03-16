import { serializable } from "serializr";
import { Currency } from "../../../Models/Currency/Currency";

export default class BalanceSheetDto {
	@serializable currency!: Currency;
}