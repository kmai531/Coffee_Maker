/** @type {import('next').NextConfig} */
const nextConfig = {
    generateBuildId: async () => {
        // You can, for example, get the latest git commit hash here
        return "my-build-id";
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
};

module.exports = nextConfig;
