export type ticDataType={
    name:number,
    cost:number,
    impression:number,
}

export type ticType={
    time:number,
    intensity:number,
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