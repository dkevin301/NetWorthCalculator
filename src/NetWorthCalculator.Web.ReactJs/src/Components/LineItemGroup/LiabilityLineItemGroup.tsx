import "./LineItemGroup.css"

import React from "react";
import { Row, Col } from "antd";
import { observer } from "mobx-react";

import Liability from "../../Models/Liability/Liability";
import { LiabilityGroup, LiabilityGroupToString } from "../../Models/Liability/LiabilityGroup";
import { useStores } from "../../Stores/StoreInitializer";
import { PaymentInterval, PaymentIntervalToString } from "../../Models/Liability/PaymentInterval";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

interface ILiabilityLineItemGroupProps {
	group: LiabilityGroup;
	liabilities: Liability[];
	paymentInterval: PaymentInterval;
}

const LiabilityLineItemGroup: React.FC<ILiabilityLineItemGroupProps> = (props: ILiabilityLineItemGroupProps) => {
	const { liabilities, group, paymentInterval } = props;

	const { balanceSheetStore } = useStores();

	return (
		<div className="line-item-group">
			<Row className="group-header" align="bottom">
				<Col span={12}>
					<b>{LiabilityGroupToString(group)}</b>
				</Col>
				<Col span={12}>
					<b>{PaymentIntervalToString(paymentInterval)}</b>
				</Col>
			</Row>
			{
				liabilities.map((lineItem: Liability) => {
					return (
						<Row key={lineItem.id} align="bottom" justify="space-between">
							<Col span={10}>
								{lineItem.description}
							</Col>
							<Col span={6}>
								<CurrencyInput 
									currencySymbol={balanceSheetStore.balanceSheet.getCurrencySymbol} 
									amount={lineItem.intervalAmount} 
									readonly
								/>
							</Col>
							<Col className="amount-col" span={6}>
								<CurrencyInput 
									currencySymbol={balanceSheetStore.balanceSheet.getCurrencySymbol} 
									amount={lineItem.amount} 
									onChange={(newAmount) => balanceSheetStore.updateLiabilityAmount(newAmount, lineItem.id)} 
									isLoading={balanceSheetStore.isLoading}
								/>
							</Col>
						</Row>
					);
				})
			}
		</div>
	);
}

export default observer(LiabilityLineItemGroup);