<template>
  <div class="model-card-wrapper" :style="selected ? 'border-color:#10a4fa' : ''">
    <div class="model-title">
      <span>{{ modelOpention.modelName }}</span>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { SwapOutlined } from '@ant-design/icons-vue';
import { useSlots } from 'vue'
const props = defineProps({
  modelOpention: {
    type: Object,
    default: () => {
      return {}
    }
  },
  selected: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(["update:selected"])

</script>


<style scoped >
.model-card-wrapper {
  width: 64px;
  height: 64px;
  padding: 4px;
  display: flex;
  justify-content: center;
  border: solid 2px #cccccc;
  border-radius: 4px;
  text-align: center;
  align-items: center;
}

.model-title {
  word-break: break-all;
  white-space: pre-wrap;
  overflow: hidden;
  font-size: 12px;
}
</style>
