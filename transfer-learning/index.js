import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis"
import { MobileNet } from "@dljsbook/models"

tf.loadModel(MobileNet.url).then(mobilenet => {
  mobilenet.summary()
})
