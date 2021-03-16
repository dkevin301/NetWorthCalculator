export enum AssetGroup {
	CashAndInvestments,
	LongTerm,
}

export enum AssetGroupDescription {
	CashAndInvestments = "Cash and Investments",
	LongTerm = "Long Term Assets",
}

export function AssetGroupToString(assetGroup: AssetGroup): string | null {
	switch (assetGroup) {
		case AssetGroup.CashAndInvestments:
			return AssetGroupDescription.CashAndInvestments;
		case AssetGroup.LongTerm:
			return AssetGroupDescription.LongTerm;
		default:
			return null;
	}
}