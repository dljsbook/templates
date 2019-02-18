const { ImageClassifier } = dljsUI

const imageClassifier = new ImageClassifier(document.getElementById('root'))

imageClassifier.onImages(images => {
  console.log('images', images)
})
