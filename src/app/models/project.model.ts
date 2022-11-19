export interface Project {
    id: string;
    title: string;
    avatar: string;
    content: string;
    createdBy: string;
    cityId: number;
    createdDate: string;
    startDate: string;
    endDate: string;
    status: number;
    description: string;
    total: number;
    statusName: string;
    type: 0 | 1;
}