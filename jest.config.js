module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': '@vue/vue2-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  }
}
