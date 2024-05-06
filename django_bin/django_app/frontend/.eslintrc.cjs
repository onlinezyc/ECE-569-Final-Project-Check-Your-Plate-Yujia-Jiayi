module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'no-console': 'off',
    indent: ['off', 2],
    'no-unused-vars': 'error', // 未使用变量
    'no-undef': 'error', // 未定义变量
    '@typescript-eslint/no-explicit-any': 'off',
    'no-extra-semi': 'error', // 多余的分号
    'linebreak-style': 'error', // 换行风格
    semi: 'off', // 分号
    quotes: ['error', 'single'], // 引号
    'no-class-assign': 'error', // 禁止修改类声明的变量
    'no-const-assign': 'error', // 禁止修改const声明的变量
    'no-duplicate-case': 'error', // 禁止重复case标签
    'no-eq-null': 'error', // 禁止对null使用==或!=运算符
    'no-extra-semi': 'error', // 禁止不必要的分号
    'no-dupe-args': 'error', // 禁止function定义中出现重名参数
    'no-unreachable': 'error', // 禁止在return、throw、continue和break语句之后出现不可达代码
    camelcase: 'error', // 强制使用骆驼拼写法命名约定
  },
}
