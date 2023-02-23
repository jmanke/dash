import axios, { AxiosError } from 'axios';
import qs from 'qs';
import { CONSTANTS } from '../constants';
import { hellodashService } from '../services/hellodash-service';
import CancelationToken from './cancellation-token';

//#region interfaces

/**
 * Pagination query parameters
 */
export interface PaginationQuery {
  pageNumber: number;
  pageSize: number;
}

/**
 * Pagination response
 */
export interface PagedResponse<T> {
  data: T;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

//#endregion

export const baseApiUrl = (): string => (CONSTANTS.LIVE_SERVER ? 'https://hellodash-server-2x.herokuapp.com/api' : 'http://localhost:5000/api');

//#region REST functions

export async function get<T>({ url, config, cancelationToken }: { url: string; config?: any; cancelationToken?: CancelationToken }): Promise<T | null> {
  return axios
    .get<T>(createUrl(url), await configWithAuthAndParams(config))
    .then(response => {
      if (cancelationToken?.cancelled) {
        return null;
      }

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error: AxiosError) => {
      handleError(error);

      throw error;
    });
}

export async function post<T, U>(url: string, data: T, config?: any): Promise<U> {
  return axios
    .post<U>(createUrl(url), data, await configWithAuth(config))
    .then(response => response.data)
    .catch((error: AxiosError) => {
      handleError(error);

      throw error;
    });
}

export async function put<T, U>(url: string, data: T, config?: any): Promise<U> {
  return axios
    .put<U>(createUrl(url), data, await configWithAuth(config))
    .then(response => response.data)
    .catch((error: AxiosError) => {
      handleError(error);

      throw error;
    });
}

export async function patch<T, U>(url: string, data?: T, config?: any): Promise<U> {
  return axios
    .patch<U>(createUrl(url), data, await configWithAuth(config))
    .then(response => response.data)
    .catch((error: AxiosError) => {
      handleError(error);

      throw error;
    });
}

export async function remove<T>(url: string, config?: any): Promise<T> {
  return axios
    .delete<T>(createUrl(url), await configWithAuth(config))
    .then(response => response.data)
    .catch((error: AxiosError) => {
      handleError(error);

      throw error;
    });
}

//#endregion

//#region api helper functions

/**
 * Create url with base url
 * @param url The url to add to the base url
 * @returns The url with base url
 */
function createUrl(url: string): string {
  return `${baseApiUrl()}/${url}`;
}

/**
 * Add auth and params to config
 * @param config The config
 * @returns The config with auth and params
 */
async function configWithAuthAndParams(config: Record<string, any>) {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${await hellodashService.authClient.getTokenSilently()}`,
    },
    paramsSerializer: (params: string) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  };
}

/**
 * Add auth to config
 * @param config The config
 * @returns The config with auth
 */
async function configWithAuth(config: Record<string, any>) {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${await hellodashService.authClient.getTokenSilently()}`,
    },
  };
}

/**
 * Handle errors
 * @param error The error
 */
function handleError(error: AxiosError) {
  if (error.response?.status === 401) {
    window.location.reload();
  } else if (!axios.isCancel(error)) {
    console.error(error);
  }
}

//#endregion
