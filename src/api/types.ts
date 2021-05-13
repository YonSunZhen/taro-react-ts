export interface DmResponse<T> {
  code: number;
  data: T;
  message: string;
}


export interface OpenIdResponse {
  session_key: string;
  openid: string;
}

export interface LoginInfoParams {
  id?: number; // 自增id
  accessToken?: string; // 登录凭证
  openId?: string; // 微信端用户唯一标志
  instance?: string; // 实例
  clientId?: string; // 用于标识不同的端或设备
}

export interface LoginInfoResponse {
  id?: number;
  accessToken?: string;
  openId?: string;
  secret?: string;
  instance?: string;
  clientId?: string;
  loginTime?: Date;
  avatar?: string;
  cn?: string;
  en?: string;
}

export interface PublicKeyResponse {
  pubN?: number;
  modN?: number;
  sPubResultN?: number;
  publicKeyId?: number;
}

export interface UpdateSecretKeyParams {
  uid?: string;
  pubResultN: number;
  secretKeyHash?: string;
  clientId?: string;
  publicKeyId?: number;
}

export interface UserloginParams {
  clientId?: string;
  uid?: string;
  password?: string;
  openId?: string;
}


