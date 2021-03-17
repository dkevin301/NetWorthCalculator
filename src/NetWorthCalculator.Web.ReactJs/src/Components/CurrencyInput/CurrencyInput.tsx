import "./CurrencyInput.css";

import React from "react";
import { InputNumber, Col, Row, Tooltip } from "antd";
import { observer } from "mobx-react";
import _ from "lodash";

import { MAX_CURRENCY_AMOUNT } from "../../Utils/Consts";
import { IsValidAmount } from "../../Utils/Utils";

interface ICurrencyInputProps {
	currencySymbol: string;
	defaultValue: number;
	readonly?: boolean;
	isLoading?: boolean;
	onChange?: (newAmount: number) => void;
}

const CurrencyInput: React.FC<ICurrencyInputProps> = (props: ICurrencyInputProps) => {
	const { currencySymbol, defaultValue, readonly, isLoading, onChange } = props;

	const [showValidation, setShowValidation] = React.useState<boolean>(false);

	// This will be the actual value behind the scenes.
	const currencyFormatter = (value?: number): string => {
		
		if (value != null && value > MAX_CURRENCY_AMOUNT) {
			setShowValidation(true);
			return value.toString();
		}

		setShowValidation(false);

		if (value == null) {
			return "0";
		}

		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD", // Currency symbol will be parsed out
		}).format(value).substring(1);
	};

	// https://ant.design/components/input-number/#components-input-number-demo-formatter
	// https://codesandbox.io/s/currency-wrapper-antd-input-3ynzo?file=/src/index.js
	// This will be the display value that users will see.
	const currencyParser = (value?: string): number => {

		// if (value != null) {
		// 	value = value.replace(/[^\d|.|,]/g, "");
		// }

		if (value != null && !IsValidAmount(value)) {
			setShowValidation(true);
			return defaultValue;
		}

		setShowValidation(false);

		// For when the input gets cleared
		if (value == null || !value.length) {
			value = "0.0";
		}

		// Detecting and parsing between comma and dot
		let group = new Intl.NumberFormat("en-US").format(1111).replace(/1/g, "");
		let decimal = new Intl.NumberFormat("en-US").format(1.1).replace(/1/g, "");
		let reversedVal = value.replace(new RegExp("\\" + group, "g"), "");
		reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
		// => 1232.21 €

		// Removing everything except the digits and dot
		reversedVal = reversedVal.replace(/[^0-9.]/g, "");
		// => 1232.21

		// appending digits properly
		const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
		const needsDigitsAppended = digitsAfterDecimalCount > 2;

		let numberRep = parseFloat(reversedVal);
		if (needsDigitsAppended) {
			numberRep = numberRep * Math.pow(10, digitsAfterDecimalCount - 2);
		}

		return Number.isNaN(numberRep) ? 0 : numberRep;
	};

	const handleOnChange = (newAmount: number) => {
		if (IsValidAmount(newAmount)) {
			setShowValidation(false);

			if (onChange != null) {
				onChange(newAmount);
			}
		} else {
			setShowValidation(true);
		}
	}

	return (
		<Row className="currency-input" align="middle">
			<Col span={4}>{currencySymbol}</Col>
			<Col span={20}>
				<Tooltip visible={showValidation && !readonly} placement="left" color="red" title="Please enter a lower amount.">
					<InputNumber
						defaultValue={defaultValue}
						readOnly={readonly}
						bordered={!readonly}
						formatter={currencyFormatter}
						parser={currencyParser}
						onChange={_.debounce(handleOnChange, 1000)}
						disabled={isLoading}
					/>
				</Tooltip>
			</Col>
		</Row>
	)
}

export default observer(CurrencyInput);