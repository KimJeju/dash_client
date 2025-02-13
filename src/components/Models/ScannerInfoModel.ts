export interface ICultureZoneModel {
  id: number;
  zone: string;
  zoneid: string;
  zonename: string;
  lat: string;
  lon: string;
  radius: string;
  boundstartlat: string;
  boundstartlon: string;
  boundendlat: string;
  boundendlon: string;
  boundcolor: string;
  textlat: string;
  textlon: string;
  createdAt: string;
  updatedAt: string;
  extent: number;
}

export interface ICultureScannersModel {
  id: number;
  zone: string;
  region: string;
  zoneid: string;
  num: string;
  mac: string;
  intmac: string;
  status: string;
  type: string;
  lat: string;
  lon: string;
  createdAt: string;
  updatedAt: string;
  emplace_loc: string;
  scanner_color: string;
}

export interface ICulturePolygonModel {
  id: number;
  zone: string;
  polygon: any;
  bound_color: string;
  extent : number;
}

export interface IScannerStatusModel {
  MAC : string;
  ALIVE : number;
}
