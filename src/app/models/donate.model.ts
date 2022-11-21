export interface Donate {
    id: number;
    projectId: string;
    fullName: string;
    publicName: string;
    createdBy: string;
    createdDate: string;
    money: number;
    methodDonate: number;
    mode: string;
    email: string;
    phone: string;
    title: string;
    comment: string;
    type: 0 | 1,
    image: string;
}

export interface DonateTop {
    publicName: string;
    total: number;
    count: number;
}