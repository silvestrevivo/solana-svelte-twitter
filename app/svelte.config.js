import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import svg from '@poppanator/sveltekit-svg'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		vite: {
			define: {
				'process.env.BROWSER': true
			},
			optimizeDeps: {
				include: ['@project-serum/anchor']
			},
			plugins: [svg({type: 'src' })],
			prerender: {
				default: true
			}
		}
	}
};

export default config;
