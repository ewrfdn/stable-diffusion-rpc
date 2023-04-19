<template>
  <div class="ratio-view-wrapper">
    <RatioCard class="ratio-card" v-for="item of ratioList" :key="item.id" v-model:ratio="item.ratio"
      :selected="item.id == selectedItem.id" @click="handleClick(item)"></RatioCard>
  </div>
  <span style="font-size: 12px;">大小</span>
  <a-slider id="test" v-model:value="rateSize" :min="30" :max="100" :step="1" @change="handleRateChange" />
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import RatioCard from './RatioCard.vue';
const props = defineProps({
  images: {
    type: Array,
    default() {
      return [
        {
        }
      ]
    }
  },
  value: {
    type: Object,
    default() {
      return {
        width: 512,
        height: 512,
      }
    }
  }
})
const emits = defineEmits(["update:value"])
const ratioList = ref([
  {
    ratio: [1, 1],
    id: 1,
    baseSize: 1280,
  },
  {
    ratio: [9, 16],
    id: 2,
    baseSize: 1152,
  },
  {
    ratio: [3, 4],
    id: 3,
    baseSize: 1200,
  }
])
const selectedItem = ref(ratioList.value[0])
const handleRateChange = () => {
  let width = selectedItem.value.baseSize / Math.min(...selectedItem.value.ratio) * rateSize.value / 100 * selectedItem.value.ratio[0]
  let height = selectedItem.value.baseSize / Math.min(...selectedItem.value.ratio) * rateSize.value / 100 * selectedItem.value.ratio[1]

  emits("update:value", { width, height })
}
const rateSize = ref(50)
const handleClick = (item) => {
  // console.log(item, selectedItem.value.baseSize, Math.min(...selectedItem.value.ratio), rateSize.value, selectedItem.value.ratio[0])
  selectedItem.value = item
  let width = parseInt(selectedItem.value.baseSize / Math.min(...selectedItem.value.ratio) * rateSize.value / 100 * selectedItem.value.ratio[0])
  let height = parseInt(selectedItem.value.baseSize / Math.min(...selectedItem.value.ratio) * rateSize.value / 100 * selectedItem.value.ratio[1])
  // console.log(width, height)
  emits("update:value", { width, height })
}


</script>


<style scoped >
.ratio-view-wrapper {
  width: 100%;
  padding: 4px;
  height: 108px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}

.ratio-card {
  margin-right: 16px;
}
</style>
