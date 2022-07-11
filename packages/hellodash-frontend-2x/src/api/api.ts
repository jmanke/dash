import axios, { AxiosError } from 'axios'
import qs from 'qs'
import appState from '../stores/app-state'
import CancelationToken from './cancellation-token'

//#region interfaces

export interface PaginationQuery {
  pageNumber: number
  pageSize: number
}

export interface PagedResponse<T> {
  data: T
  pageNumber: number
  pageSize: number
  totalPages: number
  totalRecords: number
}

//#endregion

//#region constants

export const baseApiUrl = (): string => 'http://localhost:5000/api' //process.env.LIVE_SERVER ? 'https://hellodash-server-2x.herokuapp.com/api' : 'http://localhost:5000/api';

//#endregion

//#region REST functions

export async function get<T>({
  url,
  config,
  cancelationToken,
}: {
  url: string
  config?: any
  cancelationToken?: CancelationToken
}): Promise<T | null> {
  return axios
    .get<T>(createUrl(url), await configWithAuthAndParams(config))
    .then((response) => {
      if (cancelationToken?.cancelled) {
        return null
      }

      if (response.status === 200) {
        return response.data
      } else {
        return null
      }
    })
    .catch((error: AxiosError) => {
      handleError(error)

      throw error
    })
}

export async function post<T, U>(
  url: string,
  data: T,
  config?: any,
): Promise<U> {
  return axios
    .post<U>(createUrl(url), data, await configWithAuth(config))
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      handleError(error)

      throw error
    })
}

export async function put<T, U>(
  url: string,
  data: T,
  config?: any,
): Promise<U> {
  return axios
    .put<U>(createUrl(url), data, await configWithAuth(config))
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      handleError(error)

      throw error
    })
}

export async function patch<T, U>(
  url: string,
  data?: T,
  config?: any,
): Promise<U> {
  return axios
    .patch<U>(createUrl(url), data, await configWithAuth(config))
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      handleError(error)

      throw error
    })
}

export async function remove<T>(url: string, config?: any): Promise<T> {
  return axios
    .delete<T>(createUrl(url), await configWithAuth(config))
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      handleError(error)

      throw error
    })
}

//#endregion

//#region api helper functions

function createUrl(url: string): string {
  return `${baseApiUrl()}/${url}`
}

async function configWithAuthAndParams(config: Record<string, any>) {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${await appState.authClient.getTokenSilently()}`,
    },
    paramsSerializer: (params: string) => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
  }
}

async function configWithAuth(config: Record<string, any>) {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${await appState.authClient.getTokenSilently()}`,
    },
  }
}

// function triggerErrorNotification(err: Error): void {
//   notificationStore.addNotification({
//     title: err.name,
//     message: err.message,
//     type: 'danger',
//     insert: 'top',
//     container: 'top-right',
//     animationIn: ['animate__animated', 'animate__fadeIn'],
//     animationOut: ['animate__animated', 'animate__fadeOut'],
//     dismiss: {
//       duration: 5000,
//       onScreen: true,
//     },
//   });
// }

function handleError(error: AxiosError) {
  if (error.response?.status === 401) {
    window.location.reload()
  } else if (!axios.isCancel(error)) {
    // triggerErrorNotification(error);
  }
}

//#endregion
