import api from './api'

const cdfServices = {
    readCdf(){
        return api().get('/api/cdf')
    }
}

export default cdfServices