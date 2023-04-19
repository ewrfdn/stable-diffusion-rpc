<template>
  <div class="ratio-card-wrapper" :style="selected?'border-color:#10a4fa':''">
   <div class="display-area">
      <div :style="displatyStyle"></div>
   </div>
   <div style="height: 20px;">
    <span>{{ ratio[0] }} : {{ ratio[1] }}</span>
   </div>
   <div v-if="selected"> <swap-outlined @click="switchRatio" class="switch-item"  /></div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted,computed } from 'vue';
import { SwapOutlined } from '@ant-design/icons-vue';
import { useSlots } from 'vue'
const props = defineProps({
  ratio: {
    type: Array,
    default:()=> {
      return [1,1]
    }
  },
  selected:{
    type: Boolean,
    default:false
  }
})
const emits = defineEmits(["update:ratio","update:selected"])
const displatyStyle = computed(() => {
  let style = {}
  const maxSize = 30
  let width = 0
  let height = 0 

  if (props.ratio[0] > props.ratio[1]) {
    width = maxSize
    height=maxSize*props.ratio[1]/props.ratio[0]
  } else {
    height = maxSize
    width = maxSize * props.ratio[0] / props.ratio[1]
  }
  style.width = width + "px"
  style.height = height + "px"
  if (props.selected) {
    style.border = "solid 2px #10a4fa"
  } else {
    style.border = "solid 2px #ccc"
  }
  style.borderRadius = "4px"
  return style
})

const switchRatio = () => {
  emits("update:ratio",[props.ratio[1], props.ratio[0]])
}

</script>


<style scoped >
.ratio-card-wrapper{
  width: 70px;
  height: 86px;
  padding: 4px;
  flex-direction: column;
  justify-content: center;
  border: solid 2px #cccccc;

  border-radius: 4px;
  text-align: center;
}
.display-area{
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.switch-item{
  color: #10a4fa;
  font-size: 12px;
  cursor: pointer;
}.switch-item:hover{
  font-size: 14px;
}

</style>
