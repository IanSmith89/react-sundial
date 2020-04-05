'use strict'

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod.min.js')
} else {
	module.exports = require('./dev.js')
}
