import Taro from '@tarojs/taro'
import {
  DmResponse, LoginInfoParams, LoginInfoResponse,
  OpenIdResponse, PublicKeyResponse, UpdateSecretKeyParams,
  UserloginParams
} from './types';
import { httpRequest } from './http';

const HOST_URL = 'https://itc.desaysv.com/devminus';

export async function getOpenId() {
  const _url = `${HOST_URL}/auth/openId`;
  const jsCode = (await Taro.login()).code;
  const _res = await httpRequest.post<DmResponse<OpenIdResponse>>(_url, {js_code: jsCode});
  return _res.data && _res.data.data;
}

export async function getLoginInfo(params: LoginInfoParams) {
  const _url = `${HOST_URL}/loginInfos`;
  const _res = await httpRequest.get<DmResponse<LoginInfoResponse[]>>(_url, params);
  return _res && _res.data;
}

export async function getPublicKey() {
  const _url = `${HOST_URL}/auth/publicKey`;
  const _res = await httpRequest.get<DmResponse<PublicKeyResponse>>(_url);
  return _res && _res.data;
}

export async function updateSecretKey(params?: UpdateSecretKeyParams) {
  const _url = `${HOST_URL}/auth/secret_key`;
  const _res = await httpRequest.put<DmResponse<any>>(_url, params);
  return _res && _res.data;
}

export async function login(params?: UserloginParams) {
  const _url = `${HOST_URL}/auth/user/login`;
  const _res = await httpRequest.post<DmResponse<LoginInfoResponse>>(_url, params);
  return _res && _res.data;
}
