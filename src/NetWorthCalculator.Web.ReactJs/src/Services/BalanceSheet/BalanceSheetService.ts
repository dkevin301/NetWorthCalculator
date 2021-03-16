import http from "../HttpService";
import UpdateAssetRequest from "./Dto/UpdateAssetRequest";
import UpdateCurrencyRequest from "./Dto/UpdateCurrencyRequest";
import UpdateLiabilityRequest from "./Dto/UpdateLiabilityRequest";

export default class BalanceSheetService {
	async updateCurrency(request: UpdateCurrencyRequest): Promise<any> {
		return await http.put("api/profile/UpdateCurrency", request);
	}

	async updateAsset(request: UpdateAssetRequest): Promise<number> {
		return await http.put("api/profile/UpdateAsset", request);
	}

	async updateLiability(request: UpdateLiabilityRequest): Promise<number> {
		return await http.put("api/profile/UpdateLiability", request);
	}
}