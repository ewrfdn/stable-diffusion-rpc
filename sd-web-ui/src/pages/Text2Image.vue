<template>
  <div class="container-wrapper">
    <div class="config-panel">
      <div class="params">
        <ParamsCard>
          <template v-slot:header>描述</template>
          <template v-slot:content>
            <a-textarea v-model:value="params.params.prompt" :autosize="{ minRows: 4, maxRows: 6 }"></a-textarea>
          </template>
          <template v-slot:more>
            <span class="title">我不要</span>
            <a-textarea v-model:value="params.params.negativePrompt" :autosize="{ minRows: 4, maxRows: 6 }"></a-textarea>
          </template>
        </ParamsCard>
        <ParamsCard>
          <template v-slot:header>比例</template>
          <template v-slot:content>
            <ratioView v-model:value="size"></ratioView>
          </template>
        </ParamsCard>

      </div>
      <div class="footer">
        <a-button class="generate-button" @click="generate" :loading="loading">生成</a-button>
      </div>
    </div>

    <div class="image-wrapper">
      <ImageView class="image-view" :images="images"></ImageView>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue';
import ParamsCard from '../components/ParamsCard.vue';
import stableDiffusionService from "../api/stableDiffusion"
import ImageView from '../components/ImageView.vue';
import ratioView from '../components/ratioView.vue';
import { message } from 'ant-design-vue';
const params = reactive({
  checkPoint: "chilloutmix",
  params: {
    width: 512,
    height: 512,
    prompt: "wallpaper, Amazing, finely detail, light smile, extremely detailed CG unity 8k wallpaper, huge filesize, ultra-detailed, highres, absurdres, soft light, (((medium hair:1.3), short bang, pink hair, floating hair novafrogstyle)), beautiful detailed girl, detailed fingers, extremely detailed eyes and face, beautiful detailed nose, beautiful detailed eyes, long eyelashes, light on face, looking at viewer, (closed mouth:1.2), 1girl, cute, young, mature face, (full body:1.3), ((small breasts)), realistic face, realistic body, beautiful detailed thigh, (ulzzang-6500-v1.1:0.8), business suit, cross-laced clothes, collared shirt, open clothes, in office, detailed office, open cardigan,  miniskirt,  <lora:koreanDollLikenesss_v10:1>",
    negativePrompt: "paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans, extra fingers, fewer fingers, ((watermark:2)), (white letters:1), (multi nipples), bad anatomy, bad hands, text, error, missing fingers, missing arms, missing legs, extra digit, fewer digits, cropped, worst quality, jpeg artifacts, signature, watermark, username, bad feet, {Multiple people}, blurry, poorly drawn hands, poorly drawn face, mutation, deformed, extra limbs, extra arms, extra legs, malformed limbs, fused fingers, too many fingers, long neck, cross-eyed, mutated hands, polar lowres, bad body, bad proportions, gross proportions, wrong feet bottom render, abdominal stretch, briefs, knickers, kecks, thong, {fused fingers}}, {bad body}, bad-picture-chill-75v, ng_deepnegative_v1_75t, EasyNegative, bad proportion body to legs, wrong toes, extra toes, missing toes, weird toes, 2 body, 2 pussy, 2 upper, 2 lower, 2 head, 3 hand, 3 feet, extra long leg, super long leg, mirrored image, mirrored noise, (bad_prompt_version2:0.8), aged up, old",
    sampling: 30,
    samplingMethod: "Euler a",
    restoreFace: false,
  }

})
const size = ref({
  width: 512,
  height: 512
})
const loading = ref(false)

const images = ref([])
const generate = async () => {
  loading.value = true
  try {
    const data = { ...toRaw(params) }
    data.params = { ...toRaw(data.params), ...toRaw(size.value) }
    console.log(size.value)
    console.log(data)
    const res = await stableDiffusionService.text2Image(data)
    const files = res.files;
    images.value = files.map(i => {
      return {
        url: "data:image/png;base64," + i.b64File
      }
    })
  } catch (e) {
    message.error(e.toString())
    console.log(e)
  }
  loading.value = false

}
</script>


<style scoped >
.container-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  background: #eee;
  position: relative;
}

.title {
  font-size: 12px;
  color: #4e5969;
  padding-top: 4px;
  padding-bottom: 4px;
  width: 100%;
}

.config-panel {
  min-width: 300px;
  max-width: 640px;
  width: 45%;
  height: 100%;
  background: #fff;
}

.params {
  width: 100%;
  height: calc(100% - 72px);
  padding: 8px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.generate-button {
  font-size: 15px;
  border-radius: 6px;
  bottom: 0px;
  width: calc(100% - 24px);
}

.footer {
  padding: 8px;
  height: 72px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.image-wrapper {
  flex: 1;
  padding: 16px
}

.image-view {
  width: 100%;
  height: 100%;
}
</style>
