
    module.exports = {
        
    resolve: {
        fallback: {
        "path": require.resolve("path-browserify")
    }
},
resolve: {
    fallback: {
        "assert": require.resolve("assert/")
}
},
resolve: {
    fallback: {
        "stream": require.resolve("stream-browserify")
}
},
resolve: {
    fallback: {
        "zlib": require.resolve("browserify-zlib")
}
},
resolve: {
    fallback: {
        "http": require.resolve("stream-http")
}
},
resolve: {
    fallback: {
        "querystring": require.resolve("querystring-es3")
}
},

    //     "assert": require.resolve("assert/"),
    //     "stream": require.resolve("stream-browserify"),
    //     "crypto": require.resolve("crypto-browserify"),
    //     "zlib": require.resolve("browserify-zlib"),
    //     "http": require.resolve("stream-http"),
    //     "querystring": require.resolve("querystring-es3")
    //     }
    // }
    };

