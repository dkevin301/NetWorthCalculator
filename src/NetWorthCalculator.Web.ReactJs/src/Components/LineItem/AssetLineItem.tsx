import React from "react";
import { Row, Col, Input } from "antd";
import { observer } from "mobx-react";

import Asset from "../../Models/Asset/Asset";
import { useStores } from "../../Stores/StoreInitializer";

interface IAssetLineItemProps {
	model: Asset;
}

const AssetLineItem: React.FC<IAssetLineItemProps> = (props: IAssetLineItemProps) => {
	const { model } = props;

	const { balanceSheetStore } = useStores();

	const handleOnChange = (e: any) => {
		balanceSheetStore.updateAssetAmount(e.target.value, model.id);
	}

	return (
		<Row align="bottom">
			<Col span={18}>
				{model.description}
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

export default observer(AssetLineItem);