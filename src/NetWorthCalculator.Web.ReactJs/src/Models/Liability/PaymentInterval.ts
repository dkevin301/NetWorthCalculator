export enum PaymentInterval {
	Monthly,
}

export enum PaymentIntervalDescription {
	Monthly = "Monthly Payment",
}

export function PaymentIntervalToString(paymentInterval: PaymentInterval) {
	switch(paymentInterval) {
		case PaymentInterval.Monthly:
			return PaymentIntervalDescription.Monthly;
		default:
			return null;
	}
}