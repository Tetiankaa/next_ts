const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
        ".src/app/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
});