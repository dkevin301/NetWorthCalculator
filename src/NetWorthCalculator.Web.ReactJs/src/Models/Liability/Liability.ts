import { observable } from "mobx";
import { serializable } from "serializr";
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
	@serializable @observable id!: number;

	@serializable @observable amount!: number;

	@serializable @observable description!: string;

	@serializable @observable group!: LiabilityGroup;

	@serializable @observable intervalAmount!: number;

	@serializable @observable order!: number;

	@serializable @observable paymentInterval!: PaymentInterval;

	constructor(values: ILiability) {
		Object.assign(this, { ...values });
	}
}