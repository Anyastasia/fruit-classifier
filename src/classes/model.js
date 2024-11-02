import * as tf from '@tensorflow/tfjs' 
import Labels from '../labels'
class Model {
  
  constructor(MODEL_PATH) {
    this.loadModel(MODEL_PATH)
  }
   
  async loadModel(MODEL_PATH) {
    try {
      this.model = await tf.loadLayersModel(MODEL_PATH)
    } catch (error) {
      console.error(error)
    }
  }

  async getResults(image, RESIZED_DIMENSIONS) {
    const tensor = tf.browser.fromPixels(image)

    const resizedTensor = tf.image.resizeBilinear(tensor, RESIZED_DIMENSIONS).div(255).toFloat().expandDims(0)
   
    const xresults = this.model.predict(resizedTensor)
    const predict = await xresults.dataSync()
    const temp = tf.tensor1d(predict)
    const index = temp.argMax().dataSync()[0]
    const predictions = temp.max().dataSync()[0]
    const label = Labels[index]
    return { 
      confidence: predictions, 
      class: label 
    }
  }
}

export default Model
