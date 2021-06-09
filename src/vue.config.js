export default {
    devServer: {
        proxy: {
            '/api' : {
                // target: 'http://192.168.1.117:8081/',
                target: 'http://localhost:8081/',
                changeOrgin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                  }
            }
        }
    }
}