module.exports = {
	proxyList: {
		'/port':{
	        target: 'https://www.emlice.top/api',
	        changeOrigin:true,
	        pathRewrite: {
	        	//'^/port': ''
	        }
	    }
	}
}