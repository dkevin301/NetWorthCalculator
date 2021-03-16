import { observable } from "mobx";
import { LiabilityGroup } from "./LiabilityGroup";
import { PaymentInterval } from "./PaymentInterval";

interface ILiability {
	id: number;
	amount: number;
	description: string;
	group: LiabilityGroup;
	intervalAmount: number;
	order: number;
	paymentInterval: PaymentInterval;
}

export default class Liability {
	@observable id!: number;

	@observable amount!: number;

	@observable description!: string;

	@observable group!: LiabilityGroup;

	@observable intervalAmount!: number;

	@observable order!: number;

	@observable paymentInterval!: PaymentInterval;

	constructor(values: ILiability) {
		Object.assign(this, {...values});
	}
}