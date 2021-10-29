import axios from 'axios';

// axios.defaults.timeout = 100000;
// axios.defaults.baseURL = "http://172.23.17.201:8001";

axios.interceptors.request.use(
	(config) => {
		config.data = JSON.stringify(config.data);
		config.headers = {
			'Content-Type': 'application/json; charset=utf-8',
		};
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log('请求错误', error);
	},
);

export function get<T>(url: string, params = {}) {
	return new Promise<T>((resolve, reject) => {
		axios
			.get(url, {
				params: params,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

// export function get(url: string, params = {}) {
// 	return new Promise((resolve, reject) => {
// 		axios
// 			.get(url, {
// 				params: params,
// 			})
// 			.then((response) => {
// 				resolve(response.data);
// 			})
// 			.catch((error) => {
// 				reject(error);
// 			});
// 	});
// }

export function post<T>(url: string, data: any) {
	return new Promise<T>((resolve, reject) => {
		axios.post(url, data).then(
			(response) => {
				resolve(response.data);
			},
			(err) => {
				reject(err);
			},
		);
	});
}
