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
		<Row align="bottom">
			<Col span={12}>
				{model.description}
			</Col>
			<Col span={6}>
				<CurrencyInput 
					currencySymbol={balanceSheetStore.balanceSheet.getCurrencySymbol} 
					defaultValue={model.intervalAmount} 
					onChange={handleOnChange}
					disabled
				/>
			</Col>
			<Col className="amount-col" span={6}>
				<CurrencyInput 
					currencySymbol={balanceSheetStore.balanceSheet.getCurrencySymbol} 
					defaultValue={model.amount} 
					onChange={handleOnChange} 
				/>
			</Col>
		</Row>
	);
}

export default observer(LiabilityLineItem);