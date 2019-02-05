const { ImageClassifier } = dljsUI
const { MobileNet } = dljsModels

const imageClassifier = new ImageClassifier(document.getElementById('root'))

imageClassifier.onImages(images => {
  console.log('images', images)
})
