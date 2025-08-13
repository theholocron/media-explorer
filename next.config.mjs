/**
 * @see https://nextjs.org/docs/app/building-your-application/configuring
 * @type {import("next").NextConfig}
 */
import bundleAnalyzer from "@next/bundle-analyzer";

const config = {
	output: "export",
	pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(config);
