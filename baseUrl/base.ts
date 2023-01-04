let baseUrl: string | undefined;
const env = process.env.NODE_ENV

if (env === "development"){
    baseUrl = process.env.DEV_BASE_URL
} else {
    baseUrl = process.env.PROD_BASE_URL
}

export default baseUrl;