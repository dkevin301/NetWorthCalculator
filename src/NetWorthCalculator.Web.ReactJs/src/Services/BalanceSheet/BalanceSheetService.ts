import http from "../HttpService";
import UpdateAssetAmountRequest from "./Dto/UpdateAssetAmountRequest";
import UpdateCurrencyRequest from "./Dto/UpdateCurrencyRequest";
import BalanceSheetDto from "./Dto/BalanceSheetDto";
import UpdateLiabilityAmountRequest from "./Dto/UpdateLiabilityAmountRequest";
import UpdateAssetAmountResponse from "./Dto/UpdateAssetAmountResponse";
import UpdateLiabilityAmountResponse from "./Dto/UpdateLiabilityAmountResponse";

export default class BalanceSheetService {
	baseUrl: string = "api/balancesheet/";

	async updateCurrency(request: UpdateCurrencyRequest): Promise<BalanceSheetDto> {
		const result = await http.put(`${this.baseUrl}updatecurrency`, request);
		return result.data;
	}

	async updateAsset(request: UpdateAssetAmountRequest): Promise<UpdateAssetAmountResponse> {
		const result = await http.put(`${this.baseUrl}updateassetamount`, request);
		return result.data;
	}

	async updateLiability(request: UpdateLiabilityAmountRequest): Promise<UpdateLiabilityAmountResponse> {
		const result = await http.put(`${this.baseUrl}updateliabilityamount`, request);
		return result.data;
	}
}