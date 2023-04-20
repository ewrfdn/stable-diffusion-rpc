<template>
  <div class="image-view-wrapper">
    <viewer :images="imgSrc" class="imager-container">
      <img style="max-width: 80%; max-height: 80%;" v-for="item in imgSrc" :key="item" :src="item">
    </viewer>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { useSlots } from 'vue'
const props = defineProps({
  images: {
    type: Array,
    default() {
      return [

      ]
    }
  }
})
const imgSrc = computed(() => {
  return props.images.map(i => i.url)
})

</script>


<style scoped >
.image-view-wrapper {
  width: 100%;
  padding: 4px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-title {
  font-size: 12px;
  color: #4e5969;
  padding-top: 4px;
  padding-bottom: 4px;
  width: 100%;
}

.imager-container {
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
