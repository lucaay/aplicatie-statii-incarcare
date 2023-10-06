/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
            config.resolve.fallback.net = false;
        } else {
            config.target = "node";
        }

        return config;
    },
};

module.exports = nextConfig;
