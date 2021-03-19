import { serializable } from "serializr";
import { LiabilityGroup } from "../../../Models/Liability/LiabilityGroup";
import { PaymentInterval } from "../../../Models/Liability/PaymentInterval";

export default class LiabilityDto {
	@serializable id!: number;

	@serializable amount!: number;

	@serializable description!: string;

	@serializable group!: LiabilityGroup;

	@serializable intervalAmount!: number;

	@serializable order!: number;

	@serializable paymentInterval!: PaymentInterval;
}