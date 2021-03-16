import axios from "axios";
import qs from "qs";

const http = axios.create({
	baseURL: "http://localhost:3000", // Store this in a const
	timeout: 30000,
	paramsSerializer(params) {
		return qs.stringify(params, {
			encode: false,
		});
	},
});

export default http;