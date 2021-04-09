import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
	timeout: 10000
})

service.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		console.error('service.interceptors.request  --> ', error);
		return Promise.reject(error);
	}
)

service.interceptors.response.use(
	response => {
		const data = response.data;
		switch (data.code) {
			case 0:
				return data;
				break;
			case 1:
				ElMessage({
					message: data.info,
					type: 'error',
					center: true
				});
				return Promise.reject(data)
				break;
			default:
				return data;
				break;
		}
	},
	error => {
		return Promise.reject(error);
	}
)

export default service;
