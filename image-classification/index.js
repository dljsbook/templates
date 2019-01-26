import * as tf from "@tensorflow/tfjs"
import { ImageNet } from "@dljsbook/data"
import { MobileNet } from "@dljsbook/models"

tf.loadModel(MobileNet.url).then(mobilenet => {
  mobilenet.summary()
})
