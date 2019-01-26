import * as tfjs from "@tensorflow/tfjs";
import { ImageNet } from "@dljsbook/data";

const imageNet = new ImageNet();

imageNet.getImage().then(data => data.print());

