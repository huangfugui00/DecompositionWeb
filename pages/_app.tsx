import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect,createContext, useState } from 'react';
import {cdfType,estType,rangeType,componentNistResultType} from 'utils/type'

type cdfContextType={
  cdf:cdfType | undefined,
  setCdf:(cdf:cdfType)=>void
}
type estListContextType={
  estList:estType[],
  setEstList:(estList:estType[])=>void
}
type rangeContextType={
  range:rangeType | undefined,
  setRange:(range:rangeType)=>void
}
type nistContextType={
  bNist:boolean,
  setNist:(bNist:boolean)=>void
}

type nistResultsContextType={
  nistResults:componentNistResultType[],
  setNistResults:(nistResults:componentNistResultType[])=>void
}

export const cdfContext = createContext({} as cdfContextType)
export const estListContext = createContext({} as estListContextType)
export const rangeContext = createContext({} as rangeContextType)
export const bNistContext = createContext({} as nistContextType)
export const nistResultsContext = createContext({} as nistResultsContextType)


function MyApp({ Component, pageProps }: AppProps) {
  const [cdf,setCdf]=useState<cdfType>()
  const [estList,setEstList] = useState<estType[]>([])
  const [range,setRange] = useState<rangeType>()
  const [bNist,setNist] = useState(false)
  const [nistResults,setNistResults] = useState<componentNistResultType[]>([])
  
  return (
    <cdfContext.Provider value={ {cdf,setCdf} }>
      <estListContext.Provider value={ {estList,setEstList} }>
        <rangeContext.Provider value={{range,setRange}}>
          <bNistContext.Provider value={{bNist,setNist}}>
            <nistResultsContext.Provider value={{nistResults,setNistResults}}>
              <Component {...pageProps} />
            </nistResultsContext.Provider>
          </bNistContext.Provider>
        </rangeContext.Provider >
      </estListContext.Provider>
    </cdfContext.Provider>
  )
}

export default MyApp
