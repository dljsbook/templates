import * as tf from "@tensorflow/tfjs";
import { MobileNet } from "@dljsbook/models"

tf.loadModel(MobileNet.url).then(mobilenet => {
  mobilenet.summary()
})
