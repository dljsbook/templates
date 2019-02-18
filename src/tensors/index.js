const { ImageNet } = dljsData

const imageNet = new ImageNet()

imageNet.getImage().then(data => data.print())
