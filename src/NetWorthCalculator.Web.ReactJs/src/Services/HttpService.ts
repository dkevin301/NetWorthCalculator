import axios from "axios";
import qs from "qs";
import { SERVICE_BASE_URL } from "../Utils/Consts";

const http = axios.create({
	baseURL: SERVICE_BASE_URL,
	timeout: 30000,
	paramsSerializer(params) {
		return qs.stringify(params, {
			encode: false,
		});
	},
});

export default http;