export interface Statistic {
    year: string;
    label: string;
    value: number;
}

export interface DonateStatistic {
    regionId: number;
    regionName: string;
    data: Statistic[];
}