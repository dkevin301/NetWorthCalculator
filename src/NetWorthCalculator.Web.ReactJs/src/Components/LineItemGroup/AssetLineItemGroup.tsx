import "./LineItemGroup.css"

import React from "react";
import { Row, Col } from "antd";
import { observer } from "mobx-react";

import Asset from "../../Models/Asset/Asset";
import { AssetGroup, AssetGroupToString } from "../../Models/Asset/AssetGroup";
import { useStores } from "../../Stores/StoreInitializer";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

interface IAssetLineItemGroupProps {
	assets: Asset[];
	group: AssetGroup;
}

const AssetLineItemGroup: React.FC<IAssetLineItemGroupProps> = (props: IAssetLineItemGroupProps) => {
	const { assets, group } = props;

	const { balanceSheetStore } = useStores();

	return (
		<div className="line-item-group">
			<Row className="group-header" align="bottom">
				<Col span={18}>
					<b>{AssetGroupToString(group)}</b>
				</Col>
				<Col span={6} />
			</Row>
			{
				assets.map((lineItem: Asset) => {
					return (
						<Row key={lineItem.id} align="bottom">
							<Col span={18}>
								{lineItem.description}
							</Col>
							<Col span={6}>
								<CurrencyInput 
									currencySymbol={balanceSheetStore.balanceSheet.getCurrencySymbol} 
									amount={lineItem.amount} 
									onChange={(newAmount) => balanceSheetStore.updateAssetAmount(newAmount, lineItem.id)}
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

export default observer(AssetLineItemGroup);