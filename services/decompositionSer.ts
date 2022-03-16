import api from './api'
import {algOptionType} from 'utils/type'
const deompositionSer = {
    decompostion(data:{data:string,algSel:algOptionType}){
         return api().post('/decomposite',data)
    }
}

export default deompositionSer