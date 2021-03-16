import React from "react";
import { Row, Col, Input } from "antd";
import { observer } from "mobx-react";

import { useStores } from "../../Stores/StoreInitializer";
import Liability from "../../Models/Liability/Liability";

interface ILiabilityLineItemProps {
	model: Liability;
}

const LiabilityLineItem: React.FC<ILiabilityLineItemProps> = (props: ILiabilityLineItemProps) => {
	const { model } = props;

	const { balanceSheetStore } = useStores();

	const handleOnChange = (e: any) => {
		balanceSheetStore.updateLiabilityAmount(e.target.value, model.id);
	}

	return (
		<Row align="bottom">
			<Col span={12}>
				{model.description}
			</Col>
			<Col span={6}>
				<Input
					prefix={balanceSheetStore.balanceSheet.getCurrencySymbol} 
					value={model.intervalAmount} 
					bordered={false} 
					readOnly
				/>
			</Col>
			<Col className="amount-col" span={6}>
				<Input 
					type="number" 
					prefix={balanceSheetStore.balanceSheet.getCurrencySymbol} 
					defaultValue={model.amount} 
					bordered={false} 
					onChange={handleOnChange} 
				/>
			</Col>
		</Row>
	);
}

export default observer(LiabilityLineItem);