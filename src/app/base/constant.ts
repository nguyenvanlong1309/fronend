import { ColDef, ValueGetterParams } from 'ag-grid-community';

export const DEFAULT_SIZE_TOP_DONATE = 10;
export const REGEX_PHONE_VIETNAME = "^(0|\\+84)[0-9]{9}";
export const REGEX_ONLY_TEXT = "([a-zA-Z]|\\s)+";
export const PROJECT_STATUS = [
    {
        id: 0,
        name: 'Chờ duyệt',
    },
    {
        id: 1,
        name: 'Đã hoàn thành',
        classColor: 'bg-success',
    },
    {
        id: 2,
        name: 'Đang vận động',
        classColor: 'bg-primary',
    },
    {
        id: 3,
        name: 'Sắp hết hạn',
        classColor: 'bg-warning',
    },
    {
        id: 4,
        name: 'Hủy bỏ',
        classColor: 'bg-danger'
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