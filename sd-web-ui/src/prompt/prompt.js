
const propmt = {
  "发色": {
    count: 1,
    value: {
      "blue | silver hair": "蓝色 | 银色头发",
      "silvery hair": "银色头发",
      "black hair": "黑色头发",
      "blonde hair": "金色的头发",
      "brunette hair": "深褐色的头发",
      "black hair": "黑色的头发",
      "red hair": "红色的头发",
      "ginger hair": "姜黄色的头发",
      "silver hair": "银色的头发",
      "platinum hair": "铂金色的头发",
      "auburn hair": "栗色的头发",
      "chestnut hair": "栗色的头发",
      "caramel hair": "焦糖色的头发",
      "honey hair": "蜜色的头发",
      "ash hair": "灰色的头发",
      "mahogany hair": "红棕色的头发",
      "ombre hair": "渐变色的头发",
      "pink hair": "渐变色的头发",
      "balayage hair": "手绘色的头发"
    }
  },
  "画质": {
    count: 4,
    value: {
      "ultra high quality": "超高清",
      "hard focus": "硬对焦",
      "film grain": "胶片颗粒",
      "masterpiece": "杰作",
      "best quality": "最佳质量",
      "highres": "高分辨率",
      "ultra detailed": "超级详细",
      "physically-based rendering": "基于物理渲染",
      "HDR": "高动态范围",
      "8k resolution": "8k 分辨率",
      "realistic": "真实",
      "photo-realistic": "照片级真实",
      "ultra-detailed": "超详细",
      "best quality": "最高画质",
      "ultra high res": "超高分辨率",
      "photorealistic": "照片级真实",
      "8k": "8K分辨率",
      "RAW photo": "RAW格式照片",
      "best quality": "最佳质量",
      "masterpiece:1.2": "杰作质量1.2",
      "realistic": "逼真",
      "photo-realistic:1.37": "照片般逼真1.37"
    }
  },
  "发型": {
    count: 1,
    value: {
      "very messy hair": "非常凌乱的头发",
      "very long hair": "非常长的头发",
      "long hair": "长发",
      "wavy hair": "波浪卷发",
      "twin braids": "双辫子",
      "long hair": "长发",
      "long and straight": "长直发",
      "short and curly": "短卷发",
      "bob cut": "齐耳短发",
      "pixie cut": "精灵短发",
      "updo": "盘发",
      "ponytail": "马尾辫",
      "braids": "辫子",
      "bun": "发髻",
      "long bangs": "长刘海",
      "pigtails": "双马尾",
      "medium hair": "中长发"
    }
  },
  "面部特征": {
    "nice detailed eyes": "(眼睛)细节好看",
    "heavy eye makeup": "浓妆艳抹",
    "blush": "腮红",
    "aegyo sal": "爱妆红",
  },
  "瞳孔颜色": {
    "blue eyes": "蓝色眼睛",
    "green eyes": "绿色眼睛",
    "brown eyes": "棕色眼睛",
    "hazel eyes": "淡褐色眼睛",
    "gray eyes": "灰色眼睛",
    "amber eyes": "琥珀色眼睛",
    "black eyes": "黑色眼睛",
    "violet eyes": "紫色眼睛",
    "red eyes": "红色眼睛",
    "pink eyes": "粉色眼睛",
    "gold eyes": "金色眼睛",
    "silver eyes": "银色眼睛",
    "emerald eyes": "翠绿色眼睛",
    "sapphire eyes": "蓝宝石色眼睛",
    "turquoise eyes": "绿松石色眼睛",
    "aquamarine eyes": "海蓝色眼睛",
    "topaz eyes": "黄玉色眼睛"
  },
  "眼部细节": {
    count: 1,
    value: {
      "puffy eyes": "浮肿的眼睛",
      "red eyes:1.4": "红色眼睛",
      "beautiful detailed eyes": "美丽细致的眼睛",
      "detailed eye makeup": "精细的眼妆",
      "nice detailed eyes": "精致的眼睛",
      "heavy eye makeup": "浓重的眼妆",
    }

  },
  "胸部大小": {
    count: 1,
    value: {
      "small breasts": "小胸部",
      "big breasts": "大胸部",
      "medium breasts": "中等胸围",
      "busty": "丰满的胸部",
    }
  },
  "身材特征": {
    count: 2,
    value: {
      "small head": "小头",
      "pretty legs": "美腿",
      "long legs": "长腿",
      "perfect anatomy": "完美的身材比例",
      "slim legs": "纤细的腿",
      "high-waist": "高腰",
      "narrow waist": "细腰",
      "slim waist": "窈窕的腰",
    }
  },
  "服装": {
    count: 1,
    value: {
      "skin tight": "紧身",
      "short bottoms": "短裤",
      "intricate choker": "复杂项链",
      "high heels": "高跟鞋",
      "white socks": "白色袜子",
      "off-shoulder": "露肩",
      "belt": "腰带",
      "white lace": "白色蕾丝",
      "crop top": "短上衣",
      "high-waisted shorts": "高腰短裤",
      "denim jacket": "牛仔外套",
      "sundress": "夏日连衣裙",
      "jumpsuit": "连身裤",
      "off-shoulder top": "露肩上衣",
      "mini skirt": "迷你裙",
      "maxi dress": "长裙",
      "lace dress": "蕾丝连衣裙",
      "pleated skirt": "褶裙",
      "A-line skirt": "A字裙",
      "wrap dress": "交叉连衣裙"
    }
  },
  //给我一些描写人像图片周围环境的词语,至少10个，输出为一个json 格式样例如下 {"环境": { "detailed cafe street": "超细致的咖啡厅街景"}} key 是英文value 是中文
  "环境": {
    count: 1,
    value: {
      "scenery": "风景",
      "detailed cafe street": "细致的咖啡厅街景",
      "daytime": "白天",
      "warm tone": "暖色调",
      "cinematic light": "电影般的光线",
      "street light": "街灯",
      "cityscape": "城市风景",
      "blue halo": "蓝色光环",
      "busy city street": "繁忙的城市街道",
      "quiet countryside field": "宁静的乡村田野",
      "modern office": "现代化的办公室",
      "cozy family living room": "舒适的家庭客厅",
      "crowded subway car": "拥挤的地铁车厢",
      "sunny beach": "阳光明媚的海滩",
      "snowy mountain": "雪山",
      "peaceful park": "宁静的公园",
      "historic castle": "历史悠久的城堡",
      "futuristic cityscape": "未来主义城市风光",
      "rainy city street": "雨中的城市街道",
      "sunset over the ocean": "海上日落",
      "bustling market": "繁忙的市场",
      "tranquil forest": "宁静的森林",
      "majestic waterfall": "壮观的瀑布",
      "desert oasis": "沙漠绿洲",
      "snowy village": "雪中村庄",
      "tropical island": "热带岛屿",
      "urban skyline": "城市天际线",
      "mountain lake": "山中湖泊"
    }
  },
  "动作": {
    count: 1,
    value: {
      "looking at viewer": "看着观众",
      "sitting": "坐着",
      "looking at viewer": "直视观众",
      "crossed legs": "交叉双腿"
    }
  },
  "皮肤": {
    count: 1,
    value: {
      "white skin": "白皙肌肤",
      "shiny skin": "光滑皮肤",
      "shiny skin": "光滑的皮肤",
      "dark skin": "深色皮肤",
      "light skin": "浅色皮肤",
      "tanned skin": "晒黑的皮肤",
      "pale skin": "苍白的皮肤",
      "olive skin": "橄榄色皮肤",
      "chocolate skin": "巧克力色皮肤",
      "caramel skin": "焦糖色皮肤",
      "porcelain skin": "瓷质肌肤",
      "ivory skin": "象牙色皮肤",
      "honey skin": "蜜色皮肤",
      "rosy skin": "玫瑰色皮肤",
      "peachy skin": "桃红色皮肤",
      "golden skin": "金色皮肤",
      "bronzed skin": "古铜色皮肤",
      "flushed skin": "泛红的皮肤",
      "ruddy skin": "红润的皮肤",
      "ashy skin": "灰色皮肤"
    }
  },
  "人物": {
    count: 2,
    value: {
      "1girl": "1个女孩",
      "cute girl": "可爱女孩",
      "cute face": "可爱脸蛋",
      "only 16": "只有16岁",
      "half body": "半身像",
      "full_body": "全身",
      "solo": "单人",
      "slender": "苗条",
      "mix4": "混血儿",
      "1girl": "单女性人物",
      "cleavage": "深V领口",
      "smile": "微笑",
      "cute": "可爱",
      "happy": "愉快的表情",
      "original_alice": "原创角色爱丽丝",
    }
  },
  //给我一些描写人像图片风格的词语,至少10个，输出为一个json 格式样例如下 {"风格": { "dreamlike": "梦幻般的"}} key 是英文value 是中文
  "风格": {
    count: 1,
    value: {
      "dreamlike": "梦幻般的",
      "extreme detailed illustration": "极其详细的插图"
    }
  }
}
export default propmt
