<script setup>
  import { watchEffect } from 'vue'
  const props = defineProps(['message'])
  const show = defineModel()
  
  watchEffect(()=>{
    if (show.value) {
      setTimeout(()=>{
        show.value = false
      }, 2000)
    }
  }) 
</script>

<template>
  <div class="text-error" v-show="show">
    <p>{{ props.message }}</p>
  </div>
</template>
