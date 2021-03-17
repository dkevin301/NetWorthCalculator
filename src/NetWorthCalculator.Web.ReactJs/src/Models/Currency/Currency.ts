// ISO-4217 currency codes
export enum Currency {
	CAD,
	USD,
	EUR,
	JPY,
	GBP,
	AUD,
	CNH,
	SEK, // Swedish Krona
	NZD,
	ZAR, // South African Rand
}

export enum CurrencySymbol {
	CAD = "$",
	USD = "$",
	EUR = "€",
	JPY = "¥",
	GBP = "£",
	AUD = "$",
	CNH = "¥",
	SEK = "kr",
	NZD = "$",
	ZAR = "R",
}

export function CurrencyToSymbol(currency: Currency): string {
	switch(currency) {
		case Currency.CAD:
			return CurrencySymbol.CAD;
		case Currency.USD:
			return CurrencySymbol.USD;
		case Currency.EUR:
			return CurrencySymbol.EUR;
		case Currency.JPY:
			return CurrencySymbol.JPY;
		case Currency.GBP:
			return CurrencySymbol.GBP;
		case Currency.AUD:
			return CurrencySymbol.AUD;
		case Currency.CNH:
			return CurrencySymbol.CNH;
		case Currency.SEK:
			return CurrencySymbol.SEK;
		case Currency.NZD:
			return CurrencySymbol.NZD;
		case Currency.ZAR:
			return CurrencySymbol.ZAR;
		default:
			return "N/A";
	}
}