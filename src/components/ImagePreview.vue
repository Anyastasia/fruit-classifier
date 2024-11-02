<script setup>
  import TextButton from './buttons/TextButton.vue'
  const props = defineProps(["fileName", "imgSource", "imgLoaded"])  
  defineEmits(["clearFile"])
</script>

<template>
<div class="image-preview-container flex">
  <i class="fa-regular fa-image p-1"></i>
  <p>{{props.fileName}}</p>
  <span class="image-preview-close">
    <TextButton @click="$emit('clearFile')"><i class="fa-solid fa-x"></i></TextButton>
  </span>
</div>
</template>
