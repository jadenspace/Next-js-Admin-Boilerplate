/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		instrumentationHook: true,
	},
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
};

export default nextConfig;