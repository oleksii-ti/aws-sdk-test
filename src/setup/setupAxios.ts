const axios = require('axios')
axios.defaults.validateStatus = (status) => status >= 0 && status <= 600
