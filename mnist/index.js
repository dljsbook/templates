const { MNIST } = dljsData
const { MNISTPainter } = dljsUI
const mnist = new MNIST()
mnist.ready(() => {
  const image = mnist.getImageForLabel(6)
  image.print()
})
