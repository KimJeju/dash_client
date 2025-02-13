export interface ITotalDataModel {
  nowPeople: number;
  today: number;
  yesterday: number;
  month: number;
  year: number;
  time: number;
  last_update: string;
}

export interface IPopularDataModel {
  nowPeople: number;
  yesterday: number;
  month: number;
  residence: number;
  last_update: string;
}

export interface IZoneChartModel {
  today: {};
  yesterday: {};
  month: {};
  residence: {};
  last_update: string;
}
