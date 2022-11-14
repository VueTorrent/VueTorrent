module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': '@vue/vue2-jest',
    '^.+\\.tsx?$': 'ts-jest'
  }
}
