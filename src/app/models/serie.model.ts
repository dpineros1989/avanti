

export interface Serie {
    name        : string;
    custom?     : object;
    data        : number[];
    type?       : string;
    color?      : string;
    yAxis?      : number;
    innerRadius?: string;
    radius?     : string;
    dataLabels? : string;
    tooltip?    : ToolTip
}

export interface ToolTip {
    valueSuffix: string;
}