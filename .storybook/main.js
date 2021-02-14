module.exports = {
    "stories": [
        "../src/welcome.stories.tsx",
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app"
    ],
    "webpackFinal": async (config, {configType}) => {
        config.resolve.extensions.push('.ts', '.tsx')

        config.module.rules.push({
            test: /\.tsx?$/,
            use: [{
                loader: require.resolve('react-docgen-typescript-loader'),
                options: {
                    shouldExtractLiteralValuesFromEnum: true,
                    propFilter: (prop) => {
                        if (prop.parent) {
                            return !prop.parent.fileName.includes('node_modules')
                        }
                        return true
                    }
                }
            }]

        })
        return config
    }
}