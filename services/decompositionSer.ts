import api,{apiJson} from './api'
import {decompostionType} from 'utils/type'
const deompositionSer = {
    decompostion(data:{data:string}){
         return api().post('/decomposite',data)
    }
}

export default deompositionSer