import api from './api'
const cdfServices = {
    readCdf(){
        return api().get('/cdf')
    },
}

export default cdfServices