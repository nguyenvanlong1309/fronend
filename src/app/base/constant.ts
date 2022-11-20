import { ColDef, ValueGetterParams } from 'ag-grid-community';
export const DEFAULT_SIZE_TOP_DONATE = 10;

export const PROJECT_STATUS = [
    {
        id: 0,
        name: 'Chờ duyệt'
    },
    {
        id: 1,
        name: 'Đã hoàn thành'
    },
    {
        id: 2,
        name: 'Đang vận động'
    },
    {
        id: 3,
        name: 'Sắp hết hạn'
    },
    {
        id: 4,
        name: 'Hủy bỏ'
    }
]

export const METHOD_DONATE = [
    {
        id: 0,
        name: 'Chuyển tiền online'
    },
]

export const TYPE_PROJECT = [
    {
        id: 0,
        name: 'Có thời hạn'
    },
    {
        id: 1,
        name: 'Không thời hạn'
    }
]

export const COLUMN_STT: ColDef = {
    headerName: 'STT',
    headerTooltip: 'STT',
    minWidth: 60,
    maxWidth: 60,
    cellStyle: {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    },
    valueGetter: (params: ValueGetterParams) => {
        return params.node.rowIndex + 1;
    }
}