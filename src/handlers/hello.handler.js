module.exports.helloHandler = (event, context, callback) => {

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  }

  const promise = new Promise((resolve) => {
    resolve('success')
  })
  promise
    .then(() => callback(null, response))
    .catch(err => callback(err))

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}
