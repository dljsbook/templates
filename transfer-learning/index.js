const { MobileNet } = dljsModels

tf.loadModel(MobileNet.url).then(mobilenet => {
  mobilenet.summary()
})
