import * as tfjs from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis"
import { ImageNet } from "@dljsbook/data";

const imageNet = new ImageNet();

imageNet.getImage().then(data => data.print());
