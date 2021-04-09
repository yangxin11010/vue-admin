import http from '@/util/http';
import { urlPlus } from '@/util/util';
import qs from 'qs';

export default {
	// get
	get: (url: string, params: object = {}) => http.get(url, { params }),
	// post
	post: (url: string, params: object = {}) => http.post(url, params),
	// post 参数拼接
	postUrl: (url: string, params: object = {}) => http.post(urlPlus(url, params)),
	// formData
	postForm: (url: string, params: object = {}) => http.post(url, qs.stringify(params))
};
