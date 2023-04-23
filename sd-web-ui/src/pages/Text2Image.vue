<template>
  <div class="container-wrapper">
    <div class="config-panel">
      <div class="params">
        <ParamsCard>
          <template v-slot:header><span>
              <span>描述</span> <a-button size="small" @click="randomPrompt" class="random-button">随机生成</a-button>
            </span>
          </template>
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
        <ParamsCard>
          <template v-slot:header>高级设置</template>
          <template v-slot:content>
            <a-row>
              <a-col :span="12" style="padding-right: 24px;">
                <div class="title">随机程度(越高随机度越大)</div>
                <a-slider style="width: 100%;" v-model:value="params.params.cgfScale" :min="1" :max="20" :step="0.5" />
                <div class="title">采样方法</div>
                <a-select id="test" style="width: 100%;" size="small" v-model:value="params.params.samplingMethod"
                  :options="samplingMethodOption" />
              </a-col>
              <a-col :span="12" style="padding-right: 24px;">
                <div class="title">采样步数</div>
                <a-slider v-model:value="params.params.sampling" :min="1" :max="50" :step="1" />
                <div class="title">种子</div>
                <a-input-number style="width: 100%;" size="small" v-model:value="params.params.seed" :min="-1"
                  :step="1" />
              </a-col>
            </a-row>
          </template>
          <!-- <template v-slot:more>
            <a-row>
              <a-col span="12"></a-col>
              <a-col span="12"></a-col>
            </a-row>
          </template> -->
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
import { generatePromopt, preProcessText2ImageParams } from "../prompt/promptGenerator"
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
    cgfScale: 7,
    seed: -1
  }

})

const size = ref({
  width: 512,
  height: 512
})
const loading = ref(false)

const randomPrompt = () => {
  const prompt = generatePromopt()
  params.params.prompt = prompt
}
const samplingMethodOption = ref([

  {
    title: "Euler a",
    value: "Euler a"
  },
  {
    title: "Euler",
    value: "Euler"
  },
  {
    title: "LMS",
    value: "LMS"
  },
  {
    title: "Henu",
    value: "Henu"
  },
  {
    title: "DPM2",
    value: "DPM2"
  },
  {
    title: "DPM2 a",
    value: "DPM2 a"
  },
  {
    title: "DPM++ 2S a",
    value: "DPM++ 2S a"
  },
  {
    title: "DPM++ SDE",
    value: "DPM++ SDE"
  },
  {
    title: "DPM2 Karras",
    value: "DPM2 Karras"
  },
  {
    title: "DPM2 a Karras",
    value: "DPM2 a Karras"
  },
  {
    title: "DPM++ 2s a Karras",
    value: "DPM++ 2S a Karras"
  },
  {
    title: "DPM++ 2M Karras",
    value: "DPM++ 2M  Karras"
  },
  {
    title: "DPM++ SDE Karras",
    value: "DPM++ SDE  Karras"
  },
  {
    title: "DPM fast",
    value: "DPM fast"
  },
  {
    title: "DPM adaptive",
    value: "DPM adaptive"
  },
  {
    title: "LMS Karras",
    value: "LMS Karras"
  },
  {
    title: "DDIM",
    value: "DDIM"
  },
  {
    title: "PLMS",
    value: "PLMS"
  }

])

const images = ref([
  {
    url: "https://th.bing.com/th/id/R.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0"

  }
])
const generate = async () => {
  loading.value = true
  images.value = []
  try {
    const data = { ...toRaw(params) }
    data.params = { ...toRaw(data.params), ...toRaw(size.value) }
    const worker = await stableDiffusionService.getAllWorker()
    if (!worker || worker.list.length === 0) {
      throw new Error("worker 已经全部离线，请等待worker 上线后再提交任务")
    }
    const task = await stableDiffusionService.getAllTask()
    message.success("当前任务前共有" + task.list.length + "个" + "任务")
    const res = await stableDiffusionService.text2Image(preProcessText2ImageParams(data))
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

.random-button {
  font-size: 12px !important;
  border-radius: 12px;
  margin-left: 12px;
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
