import "./App.css";
import "antd/dist/antd.css";

import React from "react";
import { Col, Row } from "antd";
import NetWorthCalculator from "./Scenes/NetWorthCalculator";

const App: React.FC = () => {
	return (
		<div className="app">
			<Row justify="center">
				<Col xs={0} md={3} xl={6} />
				<Col xs={24} md={18} xl={12}>
					<NetWorthCalculator />
				</Col>
				<Col xs={0} md={3} xl={6} />
			</Row>
		</div>
	);
}

export default App;
