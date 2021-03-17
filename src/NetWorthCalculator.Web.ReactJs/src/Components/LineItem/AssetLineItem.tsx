import React from "react";
import { Row, Col } from "antd";
import { observer } from "mobx-react";

import Asset from "../../Models/Asset/Asset";
import { useStores } from "../../Stores/StoreInitializer";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

interface IAssetLineItemProps {
	model: Asset;
}

const AssetLineItem: React.FC<IAssetLineItemProps> = (props: IAssetLineItemProps) => {
	const { model } = props;

	const { balanceSheetStore } = useStores();

	const handleOnChange = (newAmount: number) => {
		balanceSheetStore.updateAssetAmount(newAmount, model.id);
	}

	return (
		<Row align="bottom">
			<Col span={18}>
				{model.description}
			</Col>
			<Col  span={6}>
				<CurrencyInput 
					currencySymbol={balanceSheetStore.balanceSheet.getCurrencySymbol} 
					defaultValue={model.amount} 
					onChange={handleOnChange}
					isLoading={balanceSheetStore.isLoading}
				/>
			</Col>
		</Row>
	);
}

export default observer(AssetLineItem);