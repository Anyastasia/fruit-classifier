<script setup>
  import { ref} from 'vue'
defineEmits(["handleDrop", "fileUpload"])
const isDragEnter = ref(false)

const handleDragLeave = () => {
  isDragEnter.value = false
}

const handleDropOver = () => {
  isDragEnter.value = true
  console.log('drop over')
}
</script>

<template>
  <div class="border-dashed drag-section p-2 mbs-5" :class="{ 'drag-enter': isDragEnter}" @drop.prevent="$emit('handleDrop', $event)" @dragover.prevent="handleDropOver" @dragenter.prevent @dragleave="handleDragLeave">
      <p class="file-upload-icon"><i class="fa-solid fa-arrow-up-from-bracket"></i></p>
      <p>Drag image here</p>
      <p>Or</p>
      <label for="file-input" class="text-primary">Upload</label>
      <input @change="$emit('fileUpload', $event)" id="file-input" type="file" hidden accept="image/png, image/jpeg">
    </div>
</template>
