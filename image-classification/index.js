const { ImageClassifier } = dljsUI
const { Animals } = dljsData

const imageClassifier = new ImageClassifier(document.body)

const animals = new Animals()

animals.ready(() => {
})
