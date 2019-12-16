const call = require('../../utils/call')
const { validate, errors: { NotFoundError } } = require('theatera-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function(token) {
    validate.string(token)
    validate.string.notVoid('token', token)

    return (async() => {
        
        const res = await call(`${API_URL}/users/are-there-news`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (res.status === 200) return JSON.parse(res.body)

        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()

}