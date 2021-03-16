import "./LineItemGroup.css"

import React from "react";
import { Row, Col } from "antd";
import { observer } from "mobx-react";

import Asset from "../../Models/Asset/Asset";
import { AssetGroup, AssetGroupToString } from "../../Models/Asset/AssetGroup";
import AssetLineItem from "../LineItem/AssetLineItem";

interface IAssetLineItemGroupProps {
	assets: Asset[];
	group: AssetGroup;
}

const AssetLineItemGroup: React.FC<IAssetLineItemGroupProps> = (props: IAssetLineItemGroupProps) => {
	const { assets, group } = props;

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
						<AssetLineItem key={lineItem.id + 1} model={lineItem} />
					);
				})
			}
		</div>
	);
}

export default observer(AssetLineItemGroup);