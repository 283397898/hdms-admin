import axios from './index';

// 封装axios的get
export async function GET<T>(url: string, params: any = {}) {
  return axios.get<T>(url, { params });
}

/**
 * @description: 封装axios的post
 * @param {string} url: 路由（/api/后）
 * @param {any} bodyData request body
 * @param {any} params url中的query对象
 * @return {*}
 */
export async function POST<T>(url: string, bodyData: any, params: any = {}) {
  return axios.post<T>(url, bodyData, { params });
}

/**
 * @description: 封装axios的delete
 * @param {string} url: 路由（/api/后）
 * @param {any} bodyData request body
 * @param {any} params url中的query对象
 * @return {*}
 */
export async function DELETE<T>(url: string, bodyData: any, params: any = {}) {
  return axios.delete<T>(url, { params, data: bodyData });
}

/**
 * @description: 封装axios的put
 * @param {string} url: 路由（/api/后）
 * @param {any} bodyData request body
 * @param {any} params url中的query对象
 * @return {*}
 */
export async function PUT<T>(url: string, bodyData: any, params: any = {}) {
  return axios.put<T>(url, bodyData, { params });
}
