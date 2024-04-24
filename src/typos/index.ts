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


export enum FilmRating {
    G = 'G',
    PG = 'PG',
    'PG-13' = 'PG-13',
    R = 'R',
    'NC-17' = 'NC-17'
}