export interface IRegionTransitionModel {
  data: object;
}

export interface IAreaTotalAvgModel {
  nowPeople: number;
  today: number;
  month: number;
}

export interface IZoneValueModel {
  [key: string]: {
    nowPeople: number;
    today: number;
    revisitor: number;
    month: number;
    year: number;
    residence: number;
  };
}

export type TZoneValue = {
  [key: string]: IZoneValueModel;
};
