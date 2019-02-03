const { MNIST } = dljsData
const mnist = new MNIST()
mnist.ready(() => {
  const image = mnist.getImageForLabel(6)
  image.print()
})
