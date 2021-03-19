import "./index.css";

import React from "react";
import { Col, Row, Select, Spin } from "antd";
import { observer } from "mobx-react";
import { useStores } from "../../Stores/StoreInitializer";
import BalanceSheet from "../../Models/BalanceSheet/BalanceSheet";
import AssetSection from "../../Components/Section/AssetSection";
import LiabilitySection from "../../Components/Section/LiabilitySection";
import { Currency } from "../../Models/Currency/Currency";
import CurrencyInput from "../../Components/CurrencyInput/CurrencyInput";

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
		balanceSheetStore.updateCurrency(e);
	}

	return (
		<div className="net-worth-calculator">
			<h1>Tracking Your Net Worth</h1>
			<Row justify="end" align="middle">
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
					<CurrencyInput 
						currencySymbol={currentBalanceSheet.getCurrencySymbol} 
						amount={currentBalanceSheet.netWorth}
						readonly
					/>
				</Col>
			</Row>
			<AssetSection balanceSheet={currentBalanceSheet} />
			<LiabilitySection balanceSheet={currentBalanceSheet} />
		</div>
	);
}

export default observer(NetWorthCalculator);