export default ({ app }) => {
  app.$myInjectedFunction = (string) => {
    console.log('this is an example', string)
  }
}
