const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require("daisyui")],

	daisyui: {
    darkTheme: "cupcake",
  },
};

module.exports = config;
