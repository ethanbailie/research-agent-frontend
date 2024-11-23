import { AxiosResponse } from "axios";
import $api from "../http";

export default class RequestsService {
  static async getMethod<T>(
    url: string,
    query?: any
  ): Promise<AxiosResponse<T>> {
    return $api.get(url, {
      params: query,
    });
  }

  static async  postMethod<T>(
    url: string,
    payload?: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return $api.post<T>(url, payload, config);
  }

  static async putMethod<T>(
    url: string,
    payload?: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return $api.put<T>(url, payload, config);
  }

  static async patchMethod<T>(
    url: string,
    payload?: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return $api.patch<T>(url, payload, config);
  }

  static async deleteMethod<T>(
    url: string,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return $api.delete<T>(url, config);
  }
}