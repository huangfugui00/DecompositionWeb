import api from './api'
import {nistDataType} from 'utils/type'
const nistSer = {
    compare(nistData:nistDataType[]){
         const data ={nistData:nistData}
         return api().post('/nist',data)
    }
}

export default nistSer