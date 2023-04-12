<template>
  <div class="card-wrapper">
    <div class="card-title">
      <slot name="header" ></slot>
    </div>
    <div class="card-content">
      <slot name="content" ></slot>

    </div>
    <div class="more-content" v-if="more">
      <slot name="more" ></slot>
    </div>
    <a-button @click="triggerMore" class="show-more-button" size="small" v-if="showMoreButton">
      <template  v-if="!more">展开<down-outlined /></template>
      <template   v-if="more">收起<up-outlined /></template>
    </a-button>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { DownOutlined,UpOutlined } from '@ant-design/icons-vue';
import { useSlots } from 'vue'
const slots = useSlots()
const showMoreButton = ref(false)
const more = ref(false)

const triggerMore = () => {
  console.log(more.value)
  more.value=!more.value
}
onMounted(() => {
  console.log(slots);
  if (slots.more) {
    showMoreButton.value = true
  } else {
    showMoreButton.value = false
  }
})

</script>


<style scoped >
.card-wrapper{
  width: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card-title{
  font-size: 12px;
  color: #4e5969;
  padding-top: 4px;
  padding-bottom: 4px;
  width: 100%;
}
.card-content{
  width: 100%;
}
.more-content{
  width: 100%;
  margin-top: 8px;
}
.show-more-button{
  border-radius: 12px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  padding: 0px 16px 0px 16px;
  border: 1px solid #e5e6eb;
  color:#86909c;
  margin-top: 12px;
}

</style>
