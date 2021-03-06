const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    container: {
      center: true
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: null
          }
        }
      }
    }
  },

  plugins: [require("@tailwindcss/typography")]
}

module.exports = config
