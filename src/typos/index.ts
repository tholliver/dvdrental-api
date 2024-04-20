export enum eGroupBy {
    Day = 'day',
    Month = 'month',
    Year = 'year',
}

export type GroupByType = {
    day: { spec: string; format: string };
    month: { spec: string; format: string };
    year: { spec: string; format: string };
};