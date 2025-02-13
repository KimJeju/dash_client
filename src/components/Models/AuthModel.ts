export interface ILoginResponseModel {
  access_token: string;
  token_type: string;
  user: string;
  authority: number;
}

export interface ILoginFailModel {
  detail: string;
  status_code: number;
}
