import "./Section.css";

import React from "react";
import { Row, Col } from "antd";
import { observer } from "mobx-react";

import LiabilityLineItemGroup from "../LineItemGroup/LiabilityLineItemGroup";
import { LiabilityGroup } from "../../Models/Liability/LiabilityGroup";
import { PaymentInterval } from "../../Models/Liability/PaymentInterval";
import BalanceSheet from "../../Models/BalanceSheet/BalanceSheet";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

interface ILiabilitySectionProps {
	balanceSheet: BalanceSheet;
}

const LiabilitySection: React.FC<ILiabilitySectionProps> = (props: ILiabilitySectionProps) => {
	const { balanceSheet } = props;

	return (
		<div className="section" data-testid="liability-section">
			<Row align="bottom">
				<Col span={24}>
					<b>Liabilities</b>
				</Col>
			</Row>
			<LiabilityLineItemGroup 
				group={LiabilityGroup.ShortTerm} 
				liabilities={balanceSheet.getLiabilitiesByGroup(LiabilityGroup.ShortTerm)}
				paymentInterval={PaymentInterval.Monthly}
			/>
			<LiabilityLineItemGroup 
				group={LiabilityGroup.LongTerm} 
				liabilities={balanceSheet.getLiabilitiesByGroup(LiabilityGroup.LongTerm)}
				paymentInterval={PaymentInterval.Monthly}
			/>
			<Row className="section-footer" align="bottom">
				<Col span={18}>
					<b>Total Liabilities</b>
				</Col>
				<Col span={6}>
					<CurrencyInput 
						currencySymbol={balanceSheet.getCurrencySymbol} 
						amount={balanceSheet.totalLiabilities}
						readonly
					/>
				</Col>
			</Row>
		</div>
	);
}

export default observer(LiabilitySection);