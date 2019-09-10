export default (...args: Array<string>): string =>
args
  .join('/')
  .replace(/[\/]+/g, '/')
  .replace(/^(.+):\//, '$1://')
  .replace(/^file:/, 'file:/')
  .replace(/\/(\?|&|#[^!])/g, '$1')
  .replace(/\?/g, '&')
  .replace('&', '?');