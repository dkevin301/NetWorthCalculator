import "./LineItemGroup.css"

import React from "react";
import { Row, Col } from "antd";
import { observer } from "mobx-react";

import Liability from "../../Models/Liability/Liability";
import { LiabilityGroup, LiabilityGroupToString } from "../../Models/Liability/LiabilityGroup";
import LiabilityLineItem from "../LineItem/LiabilityLineItem";
import { PaymentInterval, PaymentIntervalToString } from "../../Models/Liability/PaymentInterval";

interface ILiabilityLineItemGroupProps {
	group: LiabilityGroup;
	liabilities: Liability[];
	paymentInterval: PaymentInterval;
}

const LiabilityLineItemGroup: React.FC<ILiabilityLineItemGroupProps> = (props: ILiabilityLineItemGroupProps) => {
	const { liabilities, group, paymentInterval } = props;

	return (
		<div className="line-item-group">
			<Row className="group-header" align="bottom">
				<Col span={12}>
					<b>{LiabilityGroupToString(group)}</b>
				</Col>
				<Col span={6}>
					<b>{PaymentIntervalToString(paymentInterval)}</b>
				</Col>
				<Col span={6} />
			</Row>
			{
				liabilities.map((lineItem: Liability) => {
					return (
						<LiabilityLineItem key={lineItem.id} model={lineItem} />
					);
				})
			}
		</div>
	);
}

export default observer(LiabilityLineItemGroup);