const defaultPromptMap = {
  CounterfeitV25_25: {
    prompt: "1girl, hatsune miku, solo, dress, flower, long hair, white dress, twintails, very long hair, holding, white flower, water, wading, closed eyes, bare shoulders, off-shoulder dress, holding flower, off shoulder, aqua hair, standing, from behind, lily pad",
    negativePrompt: "EasyNegative, (worst quality, low quality:1.4), nsfw, (blush:1.3)"
  },
  chilloutmix: {
    prompt: "wallpaper, Amazing, finely detail, light smile, extremely detailed CG unity 8k wallpaper, huge filesize, ultra-detailed, highres, absurdres, soft light, (((medium hair:1.3), short bang, pink hair, floating hair novafrogstyle)), beautiful detailed girl, detailed fingers, extremely detailed eyes and face, beautiful detailed nose, beautiful detailed eyes, long eyelashes, light on face, looking at viewer, (closed mouth:1.2), 1girl, cute, young, mature face, (full body:1.3), ((small breasts)), realistic face, realistic body, beautiful detailed thigh, (ulzzang-6500-v1.1:0.8), business suit, cross-laced clothes, collared shirt, open clothes, in office, detailed office, open cardigan,  miniskirt,  <lora:koreanDollLikenesss_v10:1>",
    negativePrompt: "nsfw, paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans, extra fingers, fewer fingers, ((watermark:2)), (white letters:1), (multi nipples), bad anatomy, bad hands, text, error, missing fingers, missing arms, missing legs, extra digit, fewer digits, cropped, worst quality, jpeg artifacts, signature, watermark, username, bad feet, {Multiple people}, blurry, poorly drawn hands, poorly drawn face, mutation, deformed, extra limbs, extra arms, extra legs, malformed limbs, fused fingers, too many fingers, long neck, cross-eyed, mutated hands, polar lowres, bad body, bad proportions, gross proportions, wrong feet bottom render, abdominal stretch, briefs, knickers, kecks, thong, {fused fingers}}, {bad body}, bad-picture-chill-75v, ng_deepnegative_v1_75t, EasyNegative, bad proportion body to legs, wrong toes, extra toes, missing toes, weird toes, 2 body, 2 pussy, 2 upper, 2 lower, 2 head, 3 hand, 3 feet, extra long leg, super long leg, mirrored image, mirrored noise, (bad_prompt_version2:0.8), aged up, old"
  },
  breakdomainrealistic: {
    prompt: "absurdres, highres, ultra detailed, (1girl:1.3), BREAK lomography, analog photography, vibrant colors, soft focus, light leaks, dreamy atmosphere, experimental charm, nostalgic appeal BREAK color field painting, large swaths of color, abstract expressionism, bold hues, emotional impact, atmospheric depth, minimalist approach BREAK , space exploration, celestial bodies, astronomical phenomena, scientific discoveries, otherworldly wonders",
    negativePrompt: "EasyNegative, (worst quality, low quality:1.4), nsfw, (blush:1.3)"
  },
  cheeseDaddys_35: {
    prompt: "masterpiece, best quality, high quality,extremely detailed CG unity 8k wallpaper, An enchanting and dreamy scene of a fantasy forest, with towering trees, glowing mushrooms, and hidden fairy glens, creating a sense of mystique and enchantment, artstation, digital illustration, intricate, trending, pastel colors, oil paiting, award winning photography, Bokeh, Depth of Field, HDR, bloom, Chromatic Aberration ,Photorealistic,extremely detailed, trending on artstation, trending on CGsociety, Intricate, High Detail, dramatic, art by midjourney",
    negativePrompt: "windows, canvas frame, cartoon, 3d, ((disfigured)), ((bad art)), ((deformed)),((extra limbs)),((close up)),((b&w)), wierd colors, blurry, (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))), Photoshop, video game, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, mutation, mutated, extra limbs, extra legs, extra arms, disfigured, deformed, cross-eye, body out of frame, blurry, bad art, bad anatomy, 3d render, ((naked)), ((nude)), ((NSFW)), (((claws)))"
  }
}
export const getDefaultPrompt = (checkpoint) => {
  return defaultPromptMap[checkpoint]
}



