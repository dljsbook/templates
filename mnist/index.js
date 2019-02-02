const { MNIST } = dljsData
const mnist = new MNIST()
mnist.ready(() => {
  const image = mnist.getImageForLabel(5)
  image.print()
})
