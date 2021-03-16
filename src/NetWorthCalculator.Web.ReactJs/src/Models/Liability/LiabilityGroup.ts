export enum LiabilityGroup {
	ShortTerm,
	LongTerm,
}

export enum LiabilityGroupDescription {
	ShortTerm = "Short Term Liabilities",
	LongTerm = "Long Term Debt",
}

export function LiabilityGroupToString(liabilityGroup: LiabilityGroup) {
	switch(liabilityGroup) {
		case LiabilityGroup.LongTerm:
			return LiabilityGroupDescription.LongTerm;
		case LiabilityGroup.ShortTerm:
			return LiabilityGroupDescription.ShortTerm;
		default:
			return null;
	}
}