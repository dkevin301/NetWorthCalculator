import "./CurrencyInput.css";

import React from "react";
import _ from "lodash";
import { Row, Col } from "antd";
import MaskedInput from "react-text-mask";
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { observer } from "mobx-react";

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 12, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

interface ICurrencyInputProps {
	currencySymbol: string;
	amount: number;
	readonly?: boolean;
	isLoading?: boolean;
	onChange?: (newAmount: number) => void;
}

const CurrencyInput: React.FC<ICurrencyInputProps> = (props: ICurrencyInputProps) => {
	const { currencySymbol, amount, readonly, isLoading, onChange } = props;

	const currencyMask = createNumberMask(defaultMaskOptions);

	// https://ant.design/components/input-number/#components-input-number-demo-formatter
	// https://codesandbox.io/s/currency-wrapper-antd-input-3ynzo?file=/src/index.js
	const currencyParser = (value?: string): number => {

		// For when the input gets cleared
		if (value == null || !value.length || value === "") {
			value = "0.00";
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

	const currencyFormatter = (value?: number): string => {
		if (value == null || value < 0) {
			value = 0;
		}

		// Assume that only en-US locale is supported
		// Call to .substring is to parse out the currency symbol
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(value).substring(1);
	};

	const handleOnChange = (e: any) => {
		if (onChange != null) {
			onChange(currencyParser(e.target.value));
		}
	}

	return (
		  <Row className="currency-input" align="middle">
			<Col data-testid="currency-input-symbol" span={4}>{currencySymbol}</Col>
			<Col span={20}>
				<MaskedInput
					data-testid="currency-input-amount"
					value={currencyFormatter(amount)}
					className="ant-input-number" 
					mask={currencyMask}
					onChange={_.debounce(handleOnChange, 1000)}
					disabled={isLoading}
					readOnly={readonly}
				/>
			</Col>
	  </Row>
	);
}

export default observer(CurrencyInput);