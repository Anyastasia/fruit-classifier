<script setup>
import FileInput from '../components/FileInput.vue'
import ImagePreview from '../components/ImagePreview.vue'
import PrimaryButton from '../components/buttons/PrimaryButton.vue'
import TextButton from '../components/buttons/TextButton.vue'
import ClassifyDialog from '../components/dialogs/ClassifyDialog.vue'
import ErrorText from '../components/errors/ErrorText.vue'
import { useThemeStore} from '@/stores/theme'
import {ref, useTemplateRef, onMounted, toRaw } from 'vue'
import Model from '../classes/model'

const NO_FILE_ERR_MSG = "No files uploaded!"
const model = ref([])
const results = ref({
  confidence: 0,
  class: "N/A"
})
const files = ref([])
const fileName = ref("")
const imgSource = ref('')
const dialog = useTemplateRef("dialog")
const imageRef = useTemplateRef("imageRef")
const fileUploadError = ref(false)
const themeButton = useTemplateRef("theme-switcher")
const themeStore = useThemeStore()
defineExpose({
  dialog,
  imageRef,
  themeButton
})

onMounted(() => {
  model.value = new Model('/models/tfjs/model.json')
})


const loadImageToURL = (file) => {
  const url = URL.createObjectURL(file)
  imgSource.value = url
}

const handleDrop = (event) => {

  if (event.dataTransfer.files[0].type == "image/png" || event.dataTransfer.files[0].type == "image/jpeg") {
    files.value = event.dataTransfer.files[0]
    fileName.value = files.value.name
    loadImageToURL(files.value)
    fileUploadError.value = false
  }
}

const fileUpload = (event) => {
  files.value = event.target.files[0]
  fileName.value = files.value.name
  loadImageToURL(files.value)
  fileUploadError.value = false
  /*
  const fr = new FileReader
  fr.addEventListener("load",()=> {
    imgSource.value = fr.result
    imgLoaded.value = true
  })
  fr.readAsDataURL(files.value)
  */
}

const getPercentage = (percentage) => {
  return Number(percentage.toFixed(2)) * 100
}
const clearFile = () => {
  fileName.value = ""
  files.value = []
  imgSource.value = ''
}

const closeDialog = () => {
  dialog.value.$el.close()
}

const classify = () => {
  const image = new Image()
  const rawModel = toRaw(model.value)
  if (imgSource.value) {
    image.src = imgSource.value 
    image.onload = async () => {
      results.value = await rawModel.getResults(image, [64, 52])
      dialog.value.$el.showModal()
    }
  } else {
    fileUploadError.value = true
  }
}

</script>

<template>
  <main v-bind:data-theme="themeStore.mode">
    <!----- compone/nts innside
     file input ///drag/drop + upload
      ------>
      
      <ClassifyDialog ref="dialog" @close-dialog="closeDialog" :imgSource="imgSource" :class="results.class" :confidence="getPercentage(results.confidence)">
      </ClassifyDialog>

      <section class="main-container flex flex-center flex-column">
        <FileInput 
        @handle-drop="handleDrop"
        @file-upload="fileUpload"/>
        <ImagePreview class="mbe-1" ref="imageRef" v-show="fileName" :file-name="fileName" :img-source="imgSource" @clear-file="clearFile"/>

        <ErrorText :message="NO_FILE_ERR_MSG" v-model="fileUploadError"/>
        <div class="classify-button-container">
          <PrimaryButton class="mr-auto" @click="classify" ref="btn">
          <span>Classify!</span>
          </PrimaryButton>
        </div>

      <!---
        <PredictButton>
      ---->
      </section>
      <TextButton @click="themeStore.changeTheme" ref="theme-switcher" class="theme-switcher">
        <i v-if="themeStore.mode == 'dark'" class="fa-solid fa-sun"></i>
        <i v-else class="fa-solid fa-moon"></i>
      </TextButton>
  </main>
</template>
