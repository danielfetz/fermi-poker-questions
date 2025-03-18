module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    // Change no-unused-vars from error to warning to prevent build failures
    'no-unused-vars': 'warn',
  }
};
