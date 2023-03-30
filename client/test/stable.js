'use strict';
const axios = require('axios');
const text2Image = async () => {
  const response = await axios('http://127.0.0.1:7860/run/predict/', {
    headers: {
    },
    data: {
      fn_index: 85,
      data: [
        'task(jugasjuviw11r4v)', // taskId
        'masterpiece,best quality,extremely detailed CG unity 8K wallpaper,1girl,light smile,glint <lora:AnyaForger_v10:1>  pink hair\n', // 正tag
        'Lowres,Bad anatomy,Bad hands,Text,Error,multi-legged,Missing fingers,Extra digit,Fewer digits,Cropped,Worst quality,Low quality,Normal quality,Jpeg artifacts, Signature,Watermark,Username,Blurry,Missing arms,Missing legs,Bad arms,Bad legs,Bad animal ears,(mutated hands and fingers:1.5 ),(mutation, poorly drawn :1.2), (long body :1.3), (mutation, poorly drawn :1.2),(breasts:1.4), liquid body, text font ui, long neck, uncoordinated body,fused ears,huge,ugly,', // 反tag
        [],
        30, // sampling
        'Euler a', // sampling method
        false, // restore face
        false, // tiling
        2, // batch count
        1, // batchSize
        6.5, // cgf scale
        3854399300, // seed
        -1, // variation seed
        0, // variatiuon streng=
        0, // resize seed from height
        0, // resize seed from width
        false, // extra
        800, // height
        512, // width
        false, // hires fix
        0.7, // denoising
        2, // upscale BY
        'Latent', // upscaler
        0, // hires steps
        0, // resize width to
        0, // resize hight to
        [],
        'None',
        '<span>(No stats yet, run benchmark in VRAM Estimator tab)</span>',
        false,
        false,
        'positive',
        'comma',
        0,
        false,
        false,
        '',
        'Seed',
        '',
        'Nothing',
        '',
        'Nothing',
        '',
        true,
        false,
        false,
        false,
        0,
      ],
      // session_hash: '7kbnt0sum9t',
    },
    method: 'POST',
  });
  console.log(response.data.data[0]);
};

text2Image();
