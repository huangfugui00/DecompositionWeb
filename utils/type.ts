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


export type massSpectrumType={
    x:number[],
    y:number[]
}

export type estType={
    massSpectrum:massSpectrumType,
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

type nistResultType={
    name:string,
    MF:number,
    RMF:number,
    pro:number,
    formula:string,
    CAS:string,
}

export type componentNistResultType={
    RT:number,
    nistResult:nistResultType[],
}

export type nistDataType={
    peaklist:{mz:number,intensity:number}[],
    scanTime:number,
}

export type algOptionType='timeSerial' | 'similarity'