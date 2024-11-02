<script setup>
  import { useTemplateRef } from 'vue'
  import DialogVue from '../dialogs/DialogVue.vue'
  import TextButton from '../buttons/TextButton.vue' 
  const dialogClose = useTemplateRef('dialogClose')
  defineExpose({
    dialogClose,
  })
  defineEmits(['closeDialog'])
  const props = defineProps({ 
  imgSource: {
    type: String
  },
  confidence: {
    default: 0,
    type: Number
  },
  class: {
    type: String,
    default: 'N/A'
  }
  })

  const capitalize = (s) => {
    return String(s.charAt(0).toUpperCase() + s.slice(1))
  }
 
  const between = (x, min, max) => {
    console.log(x => min && x <= max)
    return (x >= min && x <= max)
  }
  const styleConfidence = (confidence) => {
  let textStyle = "red"

  if (between(confidence, 75, 100)) { 
    textStyle = "green"
  }
  else if(between(confidence, 40, 74)) {
    textStyle = "yellow"
  }
  else {
    textStyle = "red"
  }

  console.log(textStyle)
  return textStyle
  }
</script>

<template>
  <DialogVue class="classify-dialog">
    <div class="classify-image-container">
      <img :src="imgSource" alt="Image Preview">
    </div>
    <p class="mbs-1">Fruit: {{ capitalize(props.class) }}</p>
    <p>Confidence: <span :class="`text-${styleConfidence(props.confidence)}`">{{props.confidence}}%</span></p>
    <TextButton @click="$emit('closeDialog')">Close</TextButton>
  </DialogVue>
</template>
