import React from "react";
import { Row, Col } from "antd";
import { observer } from "mobx-react";

import { useStores } from "../../Stores/StoreInitializer";
import Liability from "../../Models/Liability/Liability";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

interface ILiabilityLineItemProps {
	model: Liability;
}

const LiabilityLineItem: React.FC<ILiabilityLineItemProps> = (props: ILiabilityLineItemProps) => {
	const { model } = props;

	const { balanceSheetStore } = useStores();

	const handleOnChange = (newAmount: number) => {
		balanceSheetStore.updateLiabilityAmount(newAmount, model.id);
	}

	return (
		<Row align="bottom" justify="space-between">
			<Col span={10}>
				{model.description}
			</Col>
			<Col span={6}>
				<CurrencyInput 
					currencySymbol={balanceSheetStore.balanceSheet.getCurrencySymbol} 
					amount={model.intervalAmount} 
					readonly
				/>
			</Col>
			<Col className="amount-col" span={6}>
				<CurrencyInput 
					currencySymbol={balanceSheetStore.balanceSheet.getCurrencySymbol} 
					amount={model.amount} 
					onChange={handleOnChange} 
					isLoading={balanceSheetStore.isLoading}
				/>
			</Col>
		</Row>
	);
}

export default observer(LiabilityLineItem);