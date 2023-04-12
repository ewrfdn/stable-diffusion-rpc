<template>
  <div class="image-view-wrapper">
    <viewer :images="imgSrc">
      <img style="max-width: 100%; max-height: 100%;" v-for="item in imgSrc" :key="item" :src="item">
    </viewer>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted,computed } from 'vue';
import { DownOutlined,UpOutlined } from '@ant-design/icons-vue';
import { useSlots } from 'vue'
const props = defineProps({
  images: {
    type: Array,
    default() {
      return [
        {
          url: "https://printidea.art/assets/clip-placeholder.359ce059.png",
          url:"https://th.bing.com/th/id/R.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0"
          
        }
      ]
    }
  }
})
const imgSrc = computed(() => {
  return props.images.map(i=>i.url)
}) 

</script>


<style scoped >
.image-view-wrapper{
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
