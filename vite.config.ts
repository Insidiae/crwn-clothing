import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				short_name: "CRWN Clothing",
				name: "ZTM React Milestone Project: CRWN Clothing",
				icons: [
					{
						src: "favicon.ico",
						sizes: "64x64 32x32 24x24 16x16",
						type: "image/x-icon",
					},
					{
						src: "crwn-192x192.png",
						type: "image/png",
						sizes: "192x192",
						purpose: "any maskable",
					},
					{
						src: "crwn-512x512.png",
						type: "image/png",
						sizes: "512x512",
						purpose: "any maskable",
					},
				],
				start_url: ".",
				display: "standalone",
				theme_color: "#000000",
				background_color: "#ffffff",
			},
		}),
	],
});
