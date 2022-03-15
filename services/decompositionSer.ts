import api from './api'
const deompositionSer = {
    decompostion(data:{data:string}){
         return api().post('/decomposite',data)
    }
}

export default deompositionSer