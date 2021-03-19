import "./Section.css";

import React from "react";
import { Row, Col } from "antd";

import AssetLineItemGroup from "../LineItemGroup/AssetLineItemGroup";
import { AssetGroup } from "../../Models/Asset/AssetGroup";
import BalanceSheet from "../../Models/BalanceSheet/BalanceSheet";
import { observer } from "mobx-react";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

interface IAssetSectionProps {
	balanceSheet: BalanceSheet;
}

const AssetSection: React.FC<IAssetSectionProps> = (props: IAssetSectionProps) => {
	const { balanceSheet } = props;

	return (
		<div className="section">
			<Row align="bottom">
				<Col span={24}>
					<b>Assets</b>
				</Col>
			</Row>
			<AssetLineItemGroup 
				group={AssetGroup.CashAndInvestments} 
				assets={balanceSheet.getAssetsByGroup(AssetGroup.CashAndInvestments)}
			/>
			<AssetLineItemGroup
				group={AssetGroup.LongTerm}
				assets={balanceSheet.getAssetsByGroup(AssetGroup.LongTerm)}
			/>
			<Row className="section-footer" align="bottom">
				<Col span={18}>
					<b>Total Assets</b>
				</Col>
				<Col span={6}>
					<CurrencyInput 
						currencySymbol={balanceSheet.getCurrencySymbol} 
						amount={balanceSheet.totalAssets}
						readonly
					/>
				</Col>
			</Row>
		</div>
	);
}

export default observer(AssetSection);