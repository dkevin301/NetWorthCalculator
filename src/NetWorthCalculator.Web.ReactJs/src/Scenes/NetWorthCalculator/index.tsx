import "./index.css";

import React from "react";
import { Col, Input, Row, Select, Spin } from "antd";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/StoreInitializer";
import BalanceSheet from "../../Models/BalanceSheet/BalanceSheet";
import AssetSection from "../../Components/Section/AssetSection";
import LiabilitySection from "../../Components/Section/LiabilitySection";
import { Currency } from "../../Models/Currency/Currency";

const NetWorthCalculator: React.FC = () => {

	const [currentBalanceSheet, setCurrentBalanceSheet] = React.useState<BalanceSheet>();

	// Pick out the store we need via destructuring.
	const { balanceSheetStore } = useStores();

	React.useEffect(() => {
		setCurrentBalanceSheet(balanceSheetStore.balanceSheet);
	}, [balanceSheetStore.balanceSheet]);

	if (currentBalanceSheet == null) {
		return (
			<Row justify="center" align="middle">
				<Col>
					<Spin />
				</Col>
			</Row>
		);
	}

	const handleCurrencyChange = (e: number) => {
		balanceSheetStore.updateCurrency(currentBalanceSheet.id, e);
	}

	return (
		<div className="net-worth-calculator">
			<h1>Tracking Your Net Worth</h1>
			<Row justify="end" gutter={5}>
				<Col>
					<b>Select Currency:</b>
				</Col>
				<Col>
					<Select onChange={handleCurrencyChange} defaultValue={currentBalanceSheet.currency}>
						{Object.keys(Currency)
							.filter((key: string) => !isNaN(parseInt(key)))
							.map((x: string) => { 
								return (
									<Select.Option key={x} value={parseInt(x)}>{Currency[parseInt(x)]}</Select.Option>
								); 
							})
						}
					</Select>
				</Col>
			</Row>
			<Row>
				<Col span={18}>
					<b>Net Worth</b>
				</Col>
				<Col span={6}>
					<Input 
						type="number" 
						prefix={currentBalanceSheet.getCurrencySymbol}
						defaultValue={currentBalanceSheet.netWorth}
						bordered={false}
						readOnly
					/>
				</Col>
			</Row>
			<AssetSection balanceSheet={currentBalanceSheet} />
			<LiabilitySection balanceSheet={currentBalanceSheet} />
		</div>
	);
}

export default observer(NetWorthCalculator);