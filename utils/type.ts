export type ticDataType={
    name:number,
    cost:number,
    impression:number,
}

export type ticType={
    time:number,
    intensity:number,
}

export type rangeType={
    left:number,
    right:number,
    leftIdx:number,
    rightIdx:number,
}

export type cdfType={
    mzLen:number,
    minMz:number,
    maxMz:number,
    mzArr:number[],
    scanTimes:number[],
    tics:number[],
    nMass:number,
    massArr:number[][],
    intensityArr:number[][],
    alignPeaks:number[][]
}


export type estType={
    curve:{x:number[],y:number[]},
    peakTimePostion:number,
    peakTimeIndex:number,
    componentMz:number[],
}

export type decompostionType={
    alignPeaks:number[][],//第一维是采样时间，alignPekas[0]表示第一张质谱图
    mzArr:number[],
    scanTimes:number[],
}