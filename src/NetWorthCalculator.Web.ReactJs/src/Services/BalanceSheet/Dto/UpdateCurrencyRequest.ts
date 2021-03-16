import { Currency } from "../../../Models/Currency/Currency";

export default class UpdateCurrencyRequest {
	id!: number;

	newCurrency!: Currency;
}