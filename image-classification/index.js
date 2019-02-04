const { ImageClassifier } = dljsUI
const { Animals } = dljsData

const imageClassifier = new ImageClassifier(document.getElementById('root'))

const animals = new Animals()

animals.ready(() => {
})
