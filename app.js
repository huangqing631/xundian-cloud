(() => {
  "use strict";

  const STORAGE_KEY = "xundian-cloud:v5";
  const APP_VERSION = "2026.11.25.14";

  const iconPaths = {
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    "list-checks":
      '<path d="m3 7 2 2 4-4"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8M13 12h8M13 18h8"/>',
    alert:
      '<path d="m10.3 3.6-8 14A2 2 0 0 0 4 20.5h16a2 2 0 0 0 1.7-2.9l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
    store:
      '<path d="M3 9.5 4.5 4h15L21 9.5"/><path d="M4 9.5V20h16V9.5"/><path d="M8 20v-6h8v6"/><path d="M3 9.5h18"/>',
    layout:
      '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    clipboard:
      '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 9h6M9 13h6M9 17h4"/>',
    chart:
      '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/><path d="m4 6 6-3 6 7 6-6"/>',
    bell:
      '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    settings:
      '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    help:
      '<circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.4 2.4 0 1 1 3.8 2c-.9.7-1.5 1.2-1.5 2.5"/><path d="M12 17h.01"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    "arrow-up": '<path d="m18 15-6-6-6 6"/>',
    "arrow-down": '<path d="m6 9 6 6 6-6"/>',
    "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "arrow-up-right": '<path d="M7 17 17 7M7 7h10v10"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    play: '<path d="m8 5 11 7-11 7Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar:
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    camera:
      '<path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3Z"/><circle cx="12" cy="13" r="3"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    "x-circle":
      '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
    minus: '<path d="M5 12h14"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 20h14"/>',
    download:
      '<path d="M12 4v12M7 11l5 5 5-5"/><path d="M5 20h14"/>',
    sparkle:
      '<path d="m12 3 1.3 4.2a5 5 0 0 0 3.5 3.5L21 12l-4.2 1.3a5 5 0 0 0-3.5 3.5L12 21l-1.3-4.2a5 5 0 0 0-3.5-3.5L3 12l4.2-1.3a5 5 0 0 0 3.5-3.5Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    refresh:
      '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
    message:
      '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',
    trending:
      '<path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/>',
    target:
      '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    route:
      '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M6 17V9a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v7a2 2 0 0 0 2 2h.5"/>',
    award:
      '<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1.5 9 5-3 5 3-1.5-9"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    file:
      '<path d="M6 2h8l4 4v16H6Z"/><path d="M14 2v5h5M9 13h6M9 17h6"/>',
    shield:
      '<path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6Z"/><path d="m8 12 3 3 5-6"/>',
    package:
      '<path d="m12 3 9 5-9 5-9-5Z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
    image:
      '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 20"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    flag: '<path d="M5 22V4"/><path d="M5 5h10l-2 4 2 4H5"/>',
  };

  function icon(name, className = "") {
    return `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.sparkle}</svg>`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  const roleLabels = {
    hq: "总经理端",
    supervisor: "督导工作台",
    store: "门店端",
  };

  const templatesSeed = [
    {
      id: "tpl-quarter",
      name: "季度运营标准巡检",
      description: "覆盖门店形象、商品陈列、服务体验与运营安全的综合检查。",
      icon: "clipboard",
      color: "brand",
      version: "V3.2",
      usage: 42,
      categories: [
        {
          id: "image",
          name: "门店形象",
          items: [
            {
              id: "image-1",
              title: "门头与橱窗整洁，品牌灯箱正常",
              hint: "灯箱无缺字，玻璃无污渍与过期物料",
            },
            {
              id: "image-2",
              title: "入口动线与促销区无堆物",
              hint: "保留不少于 1.2 米主通道",
            },
            {
              id: "image-3",
              title: "店内灯光与温度符合营业标准",
              hint: "照明无故障，温度 22–26°C",
            },
          ],
        },
        {
          id: "display",
          name: "商品陈列",
          items: [
            {
              id: "display-1",
              title: "当季主题陈列完整、主推款位置正确",
              hint: "按本月陈列指引执行",
            },
            {
              id: "display-2",
              title: "重点款尺码齐全且库存可售",
              hint: "重点 SKU 尺码缺货不超过 1 个",
              severity: "high",
            },
            {
              id: "display-3",
              title: "价签、吊牌与活动信息一致",
              hint: "无错价、漏签或过期活动标识",
            },
          ],
        },
        {
          id: "service",
          name: "服务体验",
          items: [
            {
              id: "service-1",
              title: "店员主动问候并使用标准服务话术",
              hint: "进店 10 秒内得到回应",
            },
            {
              id: "service-2",
              title: "试衣间整洁，设施可正常使用",
              hint: "门锁、挂钩、座椅与镜面完好",
            },
            {
              id: "service-3",
              title: "会员活动解释准确，权益展示清晰",
              hint: "店员能够完整说明当前会员活动",
            },
          ],
        },
        {
          id: "operation",
          name: "运营安全",
          items: [
            {
              id: "operation-1",
              title: "消防通道畅通，灭火器在有效期内",
              hint: "通道无遮挡，灭火器压力正常",
              severity: "high",
            },
            {
              id: "operation-2",
              title: "收银、库存与巡店系统运行正常",
              hint: "当日交易和库存数据可正常查询",
            },
            {
              id: "operation-3",
              title: "闭店检查记录完整并按要求签字",
              hint: "近 7 日记录无缺失",
            },
          ],
        },
      ],
    },
    {
      id: "tpl-display",
      name: "冬季陈列专项巡检",
      description: "针对冬装主推、橱窗视觉、尺码完整度和价格标识的专项检查。",
      icon: "layout",
      color: "yellow",
      version: "V1.6",
      usage: 28,
      categories: [
        {
          id: "window",
          name: "橱窗与主推",
          items: [
            {
              id: "window-1",
              title: "橱窗按冬季主题指引完成布置",
              hint: "模特组合、道具和背景板与指引一致",
            },
            {
              id: "window-2",
              title: "羽绒与棉服主推款陈列在黄金位置",
              hint: "重点色系完整出样",
            },
            {
              id: "window-3",
              title: "橱窗灯光完整，无反光与暗区",
              hint: "重点商品正面照度充足",
            },
          ],
        },
        {
          id: "size",
          name: "尺码与库存",
          items: [
            {
              id: "size-1",
              title: "主推款 90–150 尺码齐全",
              hint: "断码商品需及时补货",
              severity: "high",
            },
            {
              id: "size-2",
              title: "仓库可用库存与系统数据一致",
              hint: "抽查 5 个 SKU，差异不得超 1 件",
            },
            {
              id: "size-3",
              title: "缺码标识与补货登记完整",
              hint: "缺码商品已登记并提交补货",
            },
          ],
        },
        {
          id: "price",
          name: "价格与活动",
          items: [
            {
              id: "price-1",
              title: "冬季活动价签正确无遗漏",
              hint: "系统价、价签、收银价一致",
            },
            {
              id: "price-2",
              title: "会员折扣信息清晰可理解",
              hint: "活动物料无遮挡、无错别字",
            },
            {
              id: "price-3",
              title: "线上线下同款价格策略一致",
              hint: "特殊差异已按审批执行",
            },
          ],
        },
      ],
    },
    {
      id: "tpl-recheck",
      name: "高风险门店复检",
      description: "聚焦上一次巡检的问题闭环、运营秩序与安全风险。",
      icon: "shield",
      color: "green",
      version: "V2.0",
      usage: 16,
      categories: [
        {
          id: "closure",
          name: "问题闭环",
          items: [
            {
              id: "closure-1",
              title: "上次巡检问题已按要求完成整改",
              hint: "抽查全部高优先级问题",
              severity: "high",
            },
            {
              id: "closure-2",
              title: "整改照片与现场情况一致",
              hint: "照片包含整改前后对比",
            },
            {
              id: "closure-3",
              title: "同类问题未重复发生",
              hint: "现场无相同问题的新门店实例",
            },
          ],
        },
        {
          id: "safety",
          name: "安全与秩序",
          items: [
            {
              id: "safety-1",
              title: "消防设施完好，安全通道无阻塞",
              hint: "重点检查后场与仓库入口",
              severity: "high",
            },
            {
              id: "safety-2",
              title: "仓库货品离地、分区、标识清楚",
              hint: "通道净宽不低于 0.8 米",
            },
            {
              id: "safety-3",
              title: "员工熟知突发事件处理流程",
              hint: "随机抽问 1 名员工",
            },
          ],
        },
      ],
    },
  ];

  const templatesSeedV2 = [
    {
      id: "tpl-standard",
      name: "门店运营标准检查",
      description:
        "巴布豆商丘区域现行 25 项门店运营标准，覆盖卫生、商品、人员、氛围与安全。",
      icon: "clipboard",
      color: "brand",
      version: "V4.0",
      usage: 10,
      categories: [
        {
          id: "cleaning",
          name: "卫生",
          photoCount: 2,
          photoHint: "①门头及店门口整体 ②店内地面、货架、玻璃或橱窗",
          items: [
            {
              id: "cleaning-1",
              title: "店铺门头无明显灰尘、蛛网、胶渍",
              hint: "从店外正面检查门头与招牌",
              photos: 2,
            },
            {
              id: "cleaning-2",
              title: "店门口 1 米内无明显灰尘",
              hint: "重点检查入口地面与边角",
              photos: 2,
            },
            {
              id: "cleaning-3",
              title: "店内玻璃无灰尘、胶渍",
              hint: "迎宾玻璃、橱窗及门玻璃均需检查",
              photos: 2,
            },
            {
              id: "cleaning-4",
              title: "店内地面无积灰、纸屑等",
              hint: "销售区、收银区与主通道",
              photos: 2,
            },
            {
              id: "cleaning-5",
              title: "店内货架、道具等无积灰、灰尘",
              hint: "随机触摸高频陈列位置",
              photos: 2,
            },
            {
              id: "cleaning-6",
              title: "商品表面干净，手摸无灰尘",
              hint: "抽查主陈列区商品",
              photos: 2,
            },
            {
              id: "cleaning-7",
              title: "店内角落无蛛网、粉尘等",
              hint: "含天花吊顶、踢脚线等位置",
              photos: 2,
            },
            {
              id: "cleaning-8",
              title: "有卫生间门店：卫生间无异味、清扫干净",
              hint: "无卫生间门店可选择不适用",
              photos: 2,
            },
          ],
        },
        {
          id: "product",
          name: "商品",
          photoCount: 2,
          photoHint: "①主陈列区 ②畅销品、价签与仓储整理",
          items: [
            {
              id: "product-1",
              title: "陈列：分品类、品牌陈列，价签无缺失、无错误",
              hint: "检查主陈列区分类与价签",
              photos: 2,
            },
            {
              id: "product-2",
              title: "陈列：畅销品货不缺",
              hint: "特殊情况需提前报备",
              photos: 2,
            },
            {
              id: "product-3",
              title: "陈列：商品最外侧与货架外沿平齐",
              hint: "沿主货架逐层检查",
              photos: 2,
            },
            {
              id: "product-4",
              title: "商品 TOP：能明确说出 TOP 款商品及卖点",
              hint: "现场抽问员工",
              photos: 2,
            },
            {
              id: "product-5",
              title: "效期管理：门店无临期一个月商品",
              hint: "抽检货架与库存商品",
              photos: 2,
            },
            {
              id: "product-6",
              title: "仓储管理：分类整理、摆放整齐、无杂物",
              hint: "检查仓库通道与分区",
              photos: 2,
            },
            {
              id: "product-7",
              title: "商品盘点：库存与实物一致",
              hint: "随机抽检 5 款以上商品",
              photos: 2,
            },
            {
              id: "product-8",
              title: "商品库存：外采商品库存不超过近半月销售 5 倍",
              hint: "且为最近一周订货，店长需说明原因",
              photos: 2,
              severity: "high",
            },
          ],
        },
        {
          id: "people",
          name: "人员",
          photoCount: 1,
          photoHint: "当班员工工装、淡妆与服务形象",
          items: [
            {
              id: "people-1",
              title: "当班员工着工装、化淡妆",
              hint: "特殊原因需提前报备",
              photos: 1,
            },
            {
              id: "people-2",
              title: "微笑服务，严禁对顾客恶言相向",
              hint: "观察员工接待状态",
              photos: 1,
            },
            {
              id: "people-3",
              title: "员工能够说出商品卖点和活动",
              hint: "随机抽取商品进行询问",
              photos: 1,
            },
            {
              id: "people-4",
              title: "员工能使用客员通查询促销、会员与库存",
              hint: "并说清近一周任务达成情况",
              photos: 1,
            },
          ],
        },
        {
          id: "atmosphere",
          name: "氛围",
          photoCount: 1,
          photoHint: "门店物料、营销活动与 POP 展示",
          items: [
            {
              id: "atmosphere-1",
              title: "门店不存在过期物料",
              hint: "包含单页、条幅、POP 等",
              photos: 1,
            },
            {
              id: "atmosphere-2",
              title: "店内有音响的需音乐适中",
              hint: "没有音响则选择不适用",
              photos: 1,
            },
            {
              id: "atmosphere-3",
              title: "营销活动：随机抽查 5 款商品，员工能说清活动",
              hint: "活动信息与当前档期一致",
              photos: 1,
            },
          ],
        },
        {
          id: "safety",
          name: "安全",
          photoCount: 2,
          photoHint: "①用电与插排区域 ②灭火器有效期",
          items: [
            {
              id: "safety-1",
              title: "店内无私拉插排、无大功率电器",
              hint: "公司配备设备除外",
              photos: 2,
              severity: "high",
            },
            {
              id: "safety-2",
              title: "灭火器无过期",
              hint: "核对灭火器有效期与压力",
              photos: 2,
              severity: "high",
            },
          ],
        },
      ],
    },
    {
      id: "tpl-display",
      name: "商品陈列专项巡检",
      description: "聚焦主推款、价签、畅销品、仓储与商品知识。",
      icon: "layout",
      color: "yellow",
      version: "V2.1",
      usage: 10,
      categories: [
        {
          id: "display-main",
          name: "陈列与库存",
          photoCount: 2,
          photoHint: "主陈列区与仓库整理情况",
          items: [
            {
              id: "display-main-1",
              title: "分品类、品牌陈列，价签无缺失或错误",
              hint: "按当前陈列指引检查",
              photos: 2,
            },
            {
              id: "display-main-2",
              title: "畅销品货不缺",
              hint: "特殊情况需报备",
              photos: 2,
            },
            {
              id: "display-main-3",
              title: "商品最外侧与货架外沿平齐",
              hint: "逐层检查主货架",
              photos: 2,
            },
            {
              id: "display-main-4",
              title: "仓储分类整理、摆放整齐、无杂物",
              hint: "保留顺畅通道",
              photos: 2,
            },
          ],
        },
        {
          id: "display-product",
          name: "商品与活动",
          photoCount: 1,
          photoHint: "商品活动与 POP 物料",
          items: [
            {
              id: "display-product-1",
              title: "员工能说清 TOP 款商品与卖点",
              hint: "现场抽问",
              photos: 1,
            },
            {
              id: "display-product-2",
              title: "营销活动与当前档期一致",
              hint: "抽查 5 款商品",
              photos: 1,
            },
          ],
        },
      ],
    },
    {
      id: "tpl-recheck",
      name: "问题门店复检",
      description: "聚焦上次问题闭环、同类问题复发与安全风险。",
      icon: "shield",
      color: "green",
      version: "V2.0",
      usage: 6,
      categories: [
        {
          id: "recheck",
          name: "问题闭环",
          photoCount: 2,
          photoHint: "整改前后对比与现场全景",
          items: [
            {
              id: "recheck-1",
              title: "上次巡检问题已按要求完成整改",
              hint: "逐项核对已下发问题",
              photos: 2,
              severity: "high",
            },
            {
              id: "recheck-2",
              title: "整改照片与现场情况一致",
              hint: "检查整改前后对比",
              photos: 2,
            },
            {
              id: "recheck-3",
              title: "同类问题未重复发生",
              hint: "现场复核同类区域",
              photos: 2,
            },
            {
              id: "recheck-4",
              title: "消防与用电安全符合标准",
              hint: "通道畅通，灭火器有效",
              photos: 2,
              severity: "high",
            },
          ],
        },
      ],
    },
  ];

  function seedStateLegacy() {
    return {
      role: "hq",
      page: "overview",
      storeId: "st1",
      tasks: [
        {
          id: "task-2501",
          storeId: "st1",
          title: "冬季陈列专项巡检",
          templateId: "tpl-display",
          date: "25",
          month: "11月",
          dueLabel: "今天 16:00",
          status: "pending",
          progress: 0,
          inspector: "林小满",
        },
        {
          id: "task-2502",
          storeId: "st2",
          title: "季度运营标准巡检",
          templateId: "tpl-quarter",
          date: "25",
          month: "11月",
          dueLabel: "今天 18:00",
          status: "in_progress",
          progress: 33,
          inspector: "林小满",
        },
        {
          id: "task-2503",
          storeId: "st3",
          title: "高风险门店复检",
          templateId: "tpl-recheck",
          date: "25",
          month: "11月",
          dueLabel: "今天 18:30",
          status: "urgent",
          progress: 0,
          inspector: "林小满",
        },
        {
          id: "task-2504",
          storeId: "st4",
          title: "季度运营标准巡检",
          templateId: "tpl-quarter",
          date: "26",
          month: "11月",
          dueLabel: "明天 11:00",
          status: "pending",
          progress: 0,
          inspector: "林小满",
        },
        {
          id: "task-2505",
          storeId: "st5",
          title: "冬季陈列专项巡检",
          templateId: "tpl-display",
          date: "25",
          month: "11月",
          dueLabel: "今天 15:40",
          status: "completed",
          progress: 100,
          inspector: "林小满",
          resultScore: 89,
          completedAt: "今天 15:42",
        },
        {
          id: "task-2506",
          storeId: "st6",
          title: "季度运营标准巡检",
          templateId: "tpl-quarter",
          date: "24",
          month: "11月",
          dueLabel: "昨天 16:00",
          status: "completed",
          progress: 100,
          inspector: "周子航",
          resultScore: 94,
          completedAt: "昨天 16:18",
        },
      ],
      issues: [
        {
          id: "IS-1024",
          storeId: "st3",
          title: "消防通道被补货纸箱占用",
          category: "运营安全",
          severity: "high",
          status: "pending",
          due: "今天 18:00",
          overdue: true,
          description:
            "后场通往消防门的通道堆放了两摞冬装补货纸箱，现场通道宽度不足。已当面提醒店长，需立即清理并上传整改照片。",
          reporter: "林小满",
          assignee: "陈思",
          createdAt: "11月 24日 17:26",
        },
        {
          id: "IS-1021",
          storeId: "st2",
          title: "主推羽绒服 120 码断货",
          category: "商品陈列",
          severity: "high",
          status: "rectifying",
          due: "明天 12:00",
          overdue: false,
          description:
            "主推羽绒服奶白色 120 码陈列样衣缺失，系统库存为 0，补货单尚未提交。",
          reporter: "林小满",
          assignee: "刘悦",
          createdAt: "11月 24日 16:08",
        },
        {
          id: "IS-1018",
          storeId: "st1",
          title: "橱窗右侧射灯不亮",
          category: "门店形象",
          severity: "normal",
          status: "review",
          due: "今天 12:00",
          overdue: false,
          description:
            "橱窗右侧两盏射灯不亮，影响主推款展示。工程人员已更换驱动电源，店长已上传修复照片。",
          reporter: "周子航",
          assignee: "王倩",
          createdAt: "11月 23日 10:32",
        },
        {
          id: "IS-1014",
          storeId: "st4",
          title: "试衣间门锁松动",
          category: "服务体验",
          severity: "normal",
          status: "pending",
          due: "明天 16:00",
          overdue: false,
          description:
            "3 号试衣间门锁固定螺丝松动，关门后存在缝隙，需要维修。",
          reporter: "周子航",
          assignee: "赵敏",
          createdAt: "11月 23日 14:10",
        },
        {
          id: "IS-1009",
          storeId: "st5",
          title: "入口活动立牌遮挡动线",
          category: "门店形象",
          severity: "low",
          status: "rectifying",
          due: "明天 18:00",
          overdue: false,
          description: "入口活动立牌位置过于靠中间，影响顾客进入，需向右侧调整。",
          reporter: "林小满",
          assignee: "孙颖",
          createdAt: "11月 22日 11:20",
        },
        {
          id: "IS-1006",
          storeId: "st6",
          title: "会员活动海报信息过期",
          category: "商品陈列",
          severity: "normal",
          status: "closed",
          due: "11月 22日",
          overdue: false,
          description: "旧会员活动海报未撤换，已替换为 11 月活动版本。",
          reporter: "周子航",
          assignee: "何雨",
          createdAt: "11月 21日 13:10",
        },
        {
          id: "IS-1002",
          storeId: "st2",
          title: "收银台物料摆放杂乱",
          category: "服务体验",
          severity: "low",
          status: "closed",
          due: "11月 21日",
          overdue: false,
          description: "收银台放置私人物品与未拆包装物料，已现场整理。",
          reporter: "林小满",
          assignee: "刘悦",
          createdAt: "11月 20日 15:22",
        },
      ],
      stores: [
        {
          id: "st1",
          name: "万象城店",
          short: "万象",
          city: "杭州",
          address: "江干区富春路 701 号 L3",
          manager: "王倩",
          managerInitials: "王",
          inspector: "林小满",
          score: 92,
          lastInspection: "11月 23日",
          issues: 1,
          risk: "稳定",
          trend: 3,
        },
        {
          id: "st2",
          name: "湖滨银泰店",
          short: "湖滨",
          city: "杭州",
          address: "上城区延安路 258 号 B2",
          manager: "刘悦",
          managerInitials: "刘",
          inspector: "林小满",
          score: 86,
          lastInspection: "11月 22日",
          issues: 2,
          risk: "关注",
          trend: -2,
        },
        {
          id: "st3",
          name: "滨江天街店",
          short: "滨江",
          city: "杭州",
          address: "滨江区江汉路 1515 号 L2",
          manager: "陈思",
          managerInitials: "陈",
          inspector: "林小满",
          score: 73,
          lastInspection: "11月 24日",
          issues: 4,
          risk: "高风险",
          trend: -8,
        },
        {
          id: "st4",
          name: "城西银泰店",
          short: "城西",
          city: "杭州",
          address: "拱墅区丰潭路 380 号 L2",
          manager: "赵敏",
          managerInitials: "赵",
          inspector: "周子航",
          score: 89,
          lastInspection: "11月 20日",
          issues: 1,
          risk: "稳定",
          trend: 1,
        },
        {
          id: "st5",
          name: "来福士店",
          short: "来福",
          city: "杭州",
          address: "上城区新业路 228 号 L4",
          manager: "孙颖",
          managerInitials: "孙",
          inspector: "林小满",
          score: 81,
          lastInspection: "今天 15:42",
          issues: 1,
          risk: "关注",
          trend: 5,
        },
        {
          id: "st6",
          name: "西湖印象城店",
          short: "西溪",
          city: "杭州",
          address: "西湖区余杭塘路 1001 号 L1",
          manager: "何雨",
          managerInitials: "何",
          inspector: "周子航",
          score: 94,
          lastInspection: "昨天 16:18",
          issues: 0,
          risk: "优秀",
          trend: 4,
        },
      ],
      templates: templatesSeed,
      drafts: {},
    };
  }

  function seedState() {
    return {
      role: "hq",
      page: "overview",
      storeId: "st1",
      region: "商丘区域",
      tasks: [
        {
          id: "task-20261125-01",
          storeId: "st1",
          title: "门店运营标准检查",
          templateId: "tpl-standard",
          date: "25",
          month: "11月",
          dueLabel: "2026-11-25 已完成",
          status: "completed",
          progress: 100,
          inspector: "黄庆",
          resultScore: 98,
          completedAt: "2026-11-25",
        },
        {
          id: "task-20261125-02",
          storeId: "st2",
          title: "门店运营标准检查",
          templateId: "tpl-standard",
          date: "25",
          month: "11月",
          dueLabel: "今天 16:00",
          status: "pending",
          progress: 0,
          inspector: "黄庆",
        },
        {
          id: "task-20261125-03",
          storeId: "st3",
          title: "商品陈列专项巡检",
          templateId: "tpl-display",
          date: "25",
          month: "11月",
          dueLabel: "今天 17:30",
          status: "urgent",
          progress: 0,
          inspector: "黄庆",
        },
        {
          id: "task-20261126-04",
          storeId: "st4",
          title: "门店运营标准检查",
          templateId: "tpl-standard",
          date: "26",
          month: "11月",
          dueLabel: "明天 10:00",
          status: "pending",
          progress: 0,
          inspector: "黄庆",
        },
        {
          id: "task-20261127-05",
          storeId: "st8",
          title: "门店运营标准检查",
          templateId: "tpl-standard",
          date: "27",
          month: "11月",
          dueLabel: "11月27日 14:00",
          status: "pending",
          progress: 0,
          inspector: "黄庆",
        },
      ],
      issues: [
        {
          id: "IS-1001",
          storeId: "st1",
          title: "【卫生】店门口 1 米内无明显灰尘",
          category: "卫生",
          severity: "normal",
          status: "closed",
          due: "2026-11-28",
          overdue: false,
          description:
            "巡店时发现店门口地面存在灰尘。门店已完成清扫并提交整改说明。",
          reporter: "黄庆",
          assignee: "门店店长",
          createdAt: "2026-11-25",
          completedAt: "2026-11-25",
          completionNote: "已打扫",
        },
        {
          id: "IS-1002",
          storeId: "st3",
          title: "【商品】畅销品货不缺",
          category: "商品",
          severity: "high",
          status: "pending",
          due: "今天 18:00",
          overdue: true,
          description:
            "主推畅销款部分尺码缺货，需确认库存并完成补货或提交特殊报备。",
          reporter: "黄庆",
          assignee: "门店店长",
          createdAt: "2026-11-25",
        },
        {
          id: "IS-1003",
          storeId: "st2",
          title: "【商品】商品最外侧与货架外沿平齐",
          category: "商品",
          severity: "normal",
          status: "rectifying",
          due: "2026-11-28",
          overdue: false,
          description:
            "部分主货架最外侧商品内缩，影响陈列面整齐度，已下发门店调整。",
          reporter: "黄庆",
          assignee: "门店店长",
          createdAt: "2026-11-25",
        },
        {
          id: "IS-1004",
          storeId: "st4",
          title: "【卫生】店内玻璃无灰尘、胶渍",
          category: "卫生",
          severity: "normal",
          status: "review",
          due: "2026-11-27",
          overdue: false,
          description:
            "迎宾玻璃右下角存在胶渍。门店已清洁并上传整改凭证，等待督导复核。",
          reporter: "黄庆",
          assignee: "门店店长",
          createdAt: "2026-11-25",
        },
      ],
      stores: [
        {
          id: "st1",
          name: "巴布豆商丘尚都国际店",
          short: "尚都",
          city: "商丘",
          address: "商丘区域 · 尚都国际",
          manager: "店长",
          managerInitials: "店",
          inspector: "黄庆",
          score: 98,
          lastInspection: "2026-11-25",
          issues: 0,
          risk: "优秀",
          trend: 0,
          sales: 3409.43,
          grossProfit: 952.51,
          margin: 27.94,
          newCustomers: 1,
          momChange: -21.71,
        },
        {
          id: "st8",
          name: "巴布豆商丘建业壹号城邦店",
          short: "建业",
          city: "商丘",
          address: "商丘区域 · 建业壹号城邦",
          manager: "店长",
          managerInitials: "店",
          inspector: "黄庆",
          score: null,
          lastInspection: "未巡检",
          issues: 0,
          risk: "待巡检",
          trend: 0,
          sales: 1769.56,
          grossProfit: 944.98,
          margin: 53.4,
          newCustomers: 0,
          momChange: -28.29,
        },
        {
          id: "st4",
          name: "巴布豆商丘睢阳万达店",
          short: "睢阳",
          city: "商丘",
          address: "商丘区域 · 睢阳万达",
          manager: "店长",
          managerInitials: "店",
          inspector: "黄庆",
          score: null,
          lastInspection: "未巡检",
          issues: 1,
          risk: "待巡检",
          trend: 0,
          sales: 1594.3,
          grossProfit: 748.96,
          margin: 46.98,
          newCustomers: 4,
          momChange: 52.75,
        },
        {
          id: "st7",
          name: "巴布豆商丘帝和温莎阳光店",
          short: "帝和",
          city: "商丘",
          address: "商丘区域 · 帝和温莎阳光",
          manager: "店长",
          managerInitials: "店",
          inspector: "黄庆",
          score: null,
          lastInspection: "未巡检",
          issues: 0,
          risk: "待巡检",
          trend: 0,
          sales: 1520.4,
          grossProfit: 602.42,
          margin: 39.62,
          newCustomers: 0,
          momChange: 47.2,
        },
        {
          id: "st6",
          name: "巴布豆商丘团结路步行街店",
          short: "团结",
          city: "商丘",
          address: "商丘区域 · 团结路步行街",
          manager: "店长",
          managerInitials: "店",
          inspector: "黄庆",
          score: null,
          lastInspection: "未巡检",
          issues: 0,
          risk: "待巡检",
          trend: 0,
          sales: 1061,
          grossProfit: 361.5,
          margin: 34.07,
          newCustomers: 0,
          momChange: 6.03,
        },
        {
          id: "st3",
          name: "巴布豆商丘吾悦广场店",
          short: "吾悦",
          city: "商丘",
          address: "商丘区域 · 吾悦广场",
          manager: "店长",
          managerInitials: "店",
          inspector: "黄庆",
          score: null,
          lastInspection: "未巡检",
          issues: 1,
          risk: "待巡检",
          trend: 0,
          sales: 1001.79,
          grossProfit: 472.98,
          margin: 47.21,
          newCustomers: 3,
          momChange: 57.51,
        },
        {
          id: "st10",
          name: "巴布豆商丘睢县解放路店",
          short: "睢县",
          city: "商丘",
          address: "商丘区域 · 睢县解放路",
          manager: "店长",
          managerInitials: "店",
          inspector: "黄庆",
          score: null,
          lastInspection: "未巡检",
          issues: 0,
          risk: "待巡检",
          trend: 0,
          sales: 977.2,
          grossProfit: 567.72,
          margin: 58.1,
          newCustomers: 3,
          momChange: -29.66,
        },
        {
          id: "st9",
          name: "巴布豆商丘虞城汇景江南店",
          short: "虞城",
          city: "商丘",
          address: "商丘区域 · 虞城汇景江南",
          manager: "店长",
          managerInitials: "店",
          inspector: "黄庆",
          score: null,
          lastInspection: "未巡检",
          issues: 0,
          risk: "待巡检",
          trend: 0,
          sales: 936.82,
          grossProfit: 424.16,
          margin: 45.28,
          newCustomers: 2,
          momChange: -42.61,
        },
        {
          id: "st5",
          name: "巴布豆商丘金色福园店",
          short: "金色",
          city: "商丘",
          address: "商丘区域 · 金色福园",
          manager: "店长",
          managerInitials: "店",
          inspector: "黄庆",
          score: null,
          lastInspection: "未巡检",
          issues: 0,
          risk: "待巡检",
          trend: 0,
          sales: 559.12,
          grossProfit: 275.96,
          margin: 49.36,
          newCustomers: 2,
          momChange: -65.35,
        },
        {
          id: "st2",
          name: "巴布豆商丘华夏路店",
          short: "华夏",
          city: "商丘",
          address: "商丘区域 · 华夏路",
          manager: "店长",
          managerInitials: "店",
          inspector: "黄庆",
          score: null,
          lastInspection: "未巡检",
          issues: 1,
          risk: "待巡检",
          trend: 0,
          sales: 404.3,
          grossProfit: 142.92,
          margin: 35.35,
          newCustomers: 1,
          momChange: -64.16,
        },
      ],
      approvals: [
        {
          id: "AP-001",
          name: "张晓雨",
          requestedRole: "门店端",
          store: "巴布豆商丘华夏路店",
          status: "pending",
          createdAt: "2026-11-25 14:20",
        },
        {
          id: "AP-002",
          name: "黄庆",
          requestedRole: "总经理",
          store: "全区域",
          status: "approved",
          createdAt: "2026-11-25 09:10",
        },
      ],
      templates: templatesSeedV2,
      drafts: {},
    };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || !Array.isArray(saved.tasks) || !Array.isArray(saved.stores)) {
        return seedState();
      }
      return {
        ...seedState(),
        ...saved,
        templates: saved.templates?.length ? saved.templates : templatesSeedV2,
        drafts: saved.drafts || {},
      };
    } catch {
      return seedState();
    }
  }

  function normalizeAppState(target) {
    target.route = target.route || {
      date: "2026-11-25",
      storeIds: [],
      plannedBy: "黄庆",
      updatedAt: "",
    };
    target.stores = (target.stores || []).map((store) => ({
      ...store,
      status: store.status || "营业中",
      businessHours: store.businessHours || "10:00–22:00",
      contact: store.contact || "门店人员",
      manager: "门店人员",
      managerInitials: "门",
    }));
    target.tasks = (target.tasks || []).map((task) => ({
      ...task,
      taskType:
        task.taskType || (task.templateId ? "inspection" : "operation"),
      assigneeRole:
        task.assigneeRole || (task.templateId ? "supervisor" : "store"),
      reviewStatus:
        task.reviewStatus ||
        (task.status === "completed"
          ? "approved"
          : task.status === "submitted"
            ? "pending_review"
            : "not_submitted"),
      createdBy: task.createdBy || "督导现场",
    }));
    target.issues = (target.issues || []).map((issue) => ({
      ...issue,
      assignee:
        issue.assignee === "门店店长" || !issue.assignee
          ? "门店人员"
          : issue.assignee,
    }));
    if (!target.accounts?.length) {
      target.accounts = [
        {
          id: "ACC-HQ-001",
          name: "黄庆",
          phone: "已绑定总经理账号",
          role: "总经理",
          store: "全区域",
          storeId: "",
          status: "启用",
        },
        {
          id: "ACC-SUP-001",
          name: "王宁",
          phone: "138****2016",
          role: "督导",
          store: "商丘区域",
          storeId: "",
          status: "启用",
        },
        {
          id: "ACC-STORE-001",
          name: "张晓雨",
          phone: "139****0821",
          role: "门店人员",
          store: "巴布豆商丘华夏路店",
          storeId: "st2",
          status: "待启用",
        },
      ];
    }
    const addTaskIfMissing = (task) => {
      if (!target.tasks.some((item) => item.id === task.id)) {
        target.tasks.push(task);
      }
    };
    addTaskIfMissing({
      id: "task-op-001",
      storeId: "st3",
      title: "完成本月消防器材自查",
      templateId: null,
      taskType: "operation",
      assigneeRole: "store",
      status: "pending",
      reviewStatus: "not_submitted",
      progress: 0,
      date: "28",
      month: "11月",
      dueLabel: "2026-11-28",
      inspector: "门店人员",
      createdBy: "总经理",
      description: "检查灭火器有效期、压力表和消防通道，完成后提交文字与照片。",
    });
    addTaskIfMissing({
      id: "task-op-002",
      storeId: "st2",
      title: "补齐会员活动陈列照片",
      templateId: null,
      taskType: "operation",
      assigneeRole: "store",
      status: "pending",
      reviewStatus: "not_submitted",
      progress: 0,
      date: "26",
      month: "11月",
      dueLabel: "2026-11-26",
      inspector: "门店人员",
      createdBy: "总经理",
      description: "将当前会员活动物料调整到位，并提交现场照片。",
    });
    addTaskIfMissing({
      id: "task-sv-other-001",
      storeId: "",
      title: "整理本周门店经营复盘",
      templateId: null,
      taskType: "other",
      assigneeRole: "supervisor",
      status: "pending",
      reviewStatus: "not_submitted",
      progress: 0,
      date: "26",
      month: "11月",
      dueLabel: "2026-11-26",
      inspector: "黄庆",
      createdBy: "总经理",
      description: "汇总本周销售、毛利、巡店与整改情况，提交复盘结果。",
    });
    addTaskIfMissing({
      id: "task-op-review-001",
      storeId: "st1",
      title: "完成入口地垫更换",
      templateId: null,
      taskType: "operation",
      assigneeRole: "store",
      status: "submitted",
      reviewStatus: "pending_review",
      progress: 100,
      date: "25",
      month: "11月",
      dueLabel: "2026-11-25",
      inspector: "门店人员",
      createdBy: "总经理",
      description: "更换入口磨损地垫。",
      completionNote: "旧地垫已撤除，新防滑地垫已铺设完成。",
      completedAt: "2026-11-25",
    });
    return target;
  }

  let state = normalizeAppState(loadState());
  const ui = {
    taskFilter: "all",
    taskQuery: "",
    issueQuery: "",
    issueFocus: "all",
    storeQuery: "",
    approvalFilter: "all",
    routeDraft: [],
    assignTaskPhotos: [],
    mobileTab: "home",
    reportPeriod: "month",
  };

  const launchParams = new URLSearchParams(window.location.search);
  const launchPage = launchParams.get("page");
  if (launchPage) {
    if (state.role === "store") {
      if (launchPage === "issues") ui.mobileTab = "issues";
      else if (launchPage === "tasks") ui.mobileTab = "tasks";
    } else if (
      ["overview", "tasks", "issues", "stores", "reports"].includes(
        launchPage,
      )
    ) {
      state.page =
        state.role === "supervisor" && launchPage === "tasks"
          ? "tasks"
          : launchPage;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The app remains functional when storage is unavailable.
    }
  }

  const storeById = (id) => state.stores.find((store) => store.id === id);
  const taskById = (id) => state.tasks.find((task) => task.id === id);
  const issueById = (id) => state.issues.find((issue) => issue.id === id);
  const templateById = (id) =>
    state.templates.find((template) => template.id === id);

  function getTemplateItems(template) {
    return template.categories.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        categoryId: category.id,
        categoryName: category.name,
      })),
    );
  }

  function getDraft(taskId) {
    return (
      state.drafts[taskId] || {
        ratings: {},
        notes: {},
        itemPhotos: {},
        categoryPhotos: {},
        categoryFeedback: {},
      }
    );
  }

  async function analyzePhoto(file) {
    if (!file || !String(file.type || "").startsWith("image/")) {
      return {
        aiStatus: "fail",
        aiMessage: "文件不是有效图片",
        name: file?.name || "未知文件",
      };
    }
    if (file.size > 15 * 1024 * 1024) {
      return {
        aiStatus: "fail",
        aiMessage: "图片超过 15MB，请压缩后重拍",
        name: file.name,
      };
    }

    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      return {
        aiStatus: "fail",
        aiMessage: "图片无法解析，请重新拍摄",
        name: file.name,
      };
    }

    const imageWidth = bitmap.width;
    const imageHeight = bitmap.height;
    const maxSide = 180;
    const scale = Math.min(1, maxSide / Math.max(imageWidth, imageHeight));
    const width = Math.max(1, Math.round(imageWidth * scale));
    const height = Math.max(1, Math.round(imageHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(bitmap, 0, 0, width, height);
    const pixels = context.getImageData(0, 0, width, height).data;
    const luminance = new Float32Array(width * height);
    let brightnessTotal = 0;
    for (let index = 0, pixel = 0; index < pixels.length; index += 4, pixel += 1) {
      const value =
        pixels[index] * 0.299 +
        pixels[index + 1] * 0.587 +
        pixels[index + 2] * 0.114;
      luminance[pixel] = value;
      brightnessTotal += value;
    }
    const brightness = brightnessTotal / (width * height);
    let edgeTotal = 0;
    let edgeCount = 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const index = y * width + x;
        if (x + 1 < width) {
          edgeTotal += Math.abs(luminance[index] - luminance[index + 1]);
          edgeCount += 1;
        }
        if (y + 1 < height) {
          edgeTotal += Math.abs(luminance[index] - luminance[index + width]);
          edgeCount += 1;
        }
      }
    }
    const sharpness = edgeCount ? edgeTotal / edgeCount : 0;

    const thumbnailCanvas = document.createElement("canvas");
    const thumbnailMax = 320;
    const thumbnailScale = Math.min(
      1,
      thumbnailMax / Math.max(imageWidth, imageHeight),
    );
    thumbnailCanvas.width = Math.max(1, Math.round(imageWidth * thumbnailScale));
    thumbnailCanvas.height = Math.max(
      1,
      Math.round(imageHeight * thumbnailScale),
    );
    const thumbnailContext = thumbnailCanvas.getContext("2d");
    thumbnailContext.drawImage(
      bitmap,
      0,
      0,
      thumbnailCanvas.width,
      thumbnailCanvas.height,
    );
    bitmap.close?.();

    let aiStatus = "pass";
    let aiMessage = "AI自检通过";
    if (
      imageWidth < 480 ||
      imageHeight < 480 ||
      brightness < 25 ||
      brightness > 246 ||
      sharpness < 3
    ) {
      aiStatus = "fail";
      aiMessage =
        brightness < 25
          ? "画面过暗，请补光后重拍"
          : brightness > 246
            ? "画面过曝，请避免强光后重拍"
            : sharpness < 3
              ? "画面模糊，请稳定手机后重拍"
              : "图片尺寸过小，请重新拍摄";
    } else if (
      brightness < 45 ||
      brightness > 225 ||
      sharpness < 5 ||
      imageWidth < 720 ||
      imageHeight < 720
    ) {
      aiStatus = "warn";
      aiMessage =
        sharpness < 5
          ? "清晰度偏低，建议重拍"
          : brightness < 45 || brightness > 225
            ? "光线条件一般，建议重拍"
            : "分辨率偏低，建议使用高清模式";
    }

    return {
      name: file.name,
      size: file.size,
      width: imageWidth,
      height: imageHeight,
      brightness: Math.round(brightness * 10) / 10,
      sharpness: Math.round(sharpness * 10) / 10,
      aiStatus,
      aiMessage,
      thumbnail: thumbnailCanvas.toDataURL("image/jpeg", 0.72),
      checkedAt: new Date().toISOString(),
    };
  }

  function renderAiBadge(photo) {
    if (!photo) return "";
    const className =
      photo.aiStatus === "pass"
        ? "success"
        : photo.aiStatus === "warn"
          ? "warning"
          : "urgent";
    return `<span class="badge ${className} ai-badge">${icon(
      photo.aiStatus === "pass" ? "check-circle" : "alert",
      "icon-sm",
    )} ${escapeHtml(photo.aiMessage)}</span>`;
  }

  function isPhotoReady(photo) {
    return Boolean(photo && photo.aiStatus !== "fail");
  }

  function renderCategoryPhotoSlot(task, category, photoIndex, photo) {
    const inputId = `cat-photo-${task.id}-${category.id}-${photoIndex}`;
    const cameraOnly = state.role === "supervisor";
    return `
      <div class="category-photo-slot ${photo ? "filled" : ""}">
        ${
          photo
            ? `<img src="${escapeHtml(photo.thumbnail)}" alt="${escapeHtml(
                category.name,
              )}留档照 ${photoIndex + 1}" />
                <div class="category-photo-ai">${renderAiBadge(photo)}</div>`
            : cameraOnly
              ? `<button class="category-photo-add" data-action="open-camera" data-camera-kind="category" data-task-id="${
                  task.id
                }" data-category="${category.id}" data-photo-index="${photoIndex}">
                  ${icon("camera")}
                  <span>拍摄第 ${photoIndex + 1} 张</span>
                </button>`
              : `<label class="category-photo-add" for="${inputId}">
                  ${icon("camera")}
                  <span>拍摄第 ${photoIndex + 1} 张</span>
                </label>`
        }
        <div class="category-photo-foot">
          <span>留档 ${photoIndex + 1}</span>
          ${
            cameraOnly
              ? `<button data-action="open-camera" data-camera-kind="category" data-task-id="${
                  task.id
                }" data-category="${category.id}" data-photo-index="${photoIndex}">${
                  photo ? "重拍" : "拍照"
                }</button>`
              : `<label for="${inputId}">${photo ? "重拍" : "上传"}</label>`
          }
        </div>
        ${
          cameraOnly
            ? ""
            : `<input
                class="photo-file-input"
                id="${inputId}"
                type="file"
                accept="image/*"
                capture="environment"
                data-category-photo-input
                data-category="${category.id}"
                data-photo-index="${photoIndex}"
                data-task-id="${task.id}"
              />`
        }
      </div>
    `;
  }

  function renderItemPhotoPreviewMarkup(photo) {
    if (!photo) return "";
    return `<div class="ai-photo-preview">
      <img src="${escapeHtml(photo.thumbnail)}" alt="不符合项现场照片" />
      <div class="ai-photo-copy">
        ${renderAiBadge(photo)}
        <span>清晰度 ${escapeHtml(photo.sharpness)} · 亮度 ${escapeHtml(
          photo.brightness,
        )} · ${escapeHtml(photo.width)}×${escapeHtml(photo.height)}</span>
      </div>
    </div>`;
  }

  function renderExecutionPhotoBlock(task) {
    const photos =
      task.completionPhotos ||
      (task.completionPhoto ? [task.completionPhoto] : []);
    return `
      <div class="category-evidence required" id="executionPhotoBlock" style="margin-top:16px">
        <div class="category-feedback-head"><span>${icon(
          "camera",
          "icon-sm",
        )} 完成反馈图片</span><span>${photos.length}/3</span></div>
        <div class="instruction-photo-grid">
          ${photos
            .map(
              (photo, index) =>
                `<div class="assignment-photo-item"><img src="${escapeHtml(
                  photo.thumbnail,
                )}" alt="完成反馈图片 ${index + 1}" /></div>`,
            )
            .join("")}
        </div>
        <div style="margin-top:9px">
          <label class="button button-secondary button-sm photo-upload-label" for="execution-photo-${
            task.id
          }">${icon("camera", "icon-sm")} ${
            photos.length ? "继续添加图片" : "上传完成图片"
          }</label>
          <input class="photo-file-input" id="execution-photo-${
            task.id
          }" type="file" accept="image/*" multiple data-execution-photo-input data-task-id="${
            task.id
          }" />
          <div class="form-hint">门店完成反馈支持从相册上传，最多 3 张。</div>
        </div>
      </div>
    `;
  }

  function renderAssignmentPhotoList() {
    return ui.assignTaskPhotos
      .map(
        (photo, index) => `
          <div class="assignment-photo-item">
            <img src="${escapeHtml(photo.thumbnail)}" alt="任务说明图片 ${
              index + 1
            }" />
            <button type="button" data-action="remove-assignment-photo" data-photo-index="${index}">${icon(
              "x",
              "icon-sm",
            )}</button>
          </div>
        `,
      )
      .join("");
  }

  function renderInstructionPhotos(task) {
    const photos = task.instructionPhotos || [];
    if (!photos.length) return "";
    return `
      <div class="instruction-photo-block">
        <div class="category-feedback-head"><span>${icon(
          "image",
          "icon-sm",
        )} 任务说明图片</span><span>${photos.length} 张</span></div>
        <div class="instruction-photo-grid">
          ${photos
            .map(
              (photo, index) =>
                `<img src="${escapeHtml(photo.thumbnail)}" alt="任务说明图片 ${
                  index + 1
                }" />`,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  let activeCameraStream = null;

  function closeCameraCapture() {
    activeCameraStream?.getTracks().forEach((track) => track.stop());
    activeCameraStream = null;
    const root = document.getElementById("camera-root");
    if (root) root.innerHTML = "";
  }

  async function openCameraCapture(options) {
    const task = taskById(options.taskId);
    const store = storeById(task.storeId);
    const subjectName =
      options.kind === "item"
        ? getTemplateItems(templateById(task.templateId)).find(
            (item) => item.id === options.itemId,
          )?.title
        : templateById(task.templateId).categories.find(
            (category) => category.id === options.categoryId,
          )?.name;
    const root = document.getElementById("camera-root");
    root.innerHTML = `
      <div class="camera-capture-backdrop">
        <div class="camera-capture-modal" role="dialog" aria-modal="true" aria-label="督导现场拍照">
          <div class="camera-capture-header">
            <div><strong>督导现场拍照</strong><span>${escapeHtml(
              store.name,
            )} · ${escapeHtml(subjectName || "现场照片")}</span></div>
            <button class="close-button" data-action="close-camera">${icon(
              "x",
            )}</button>
          </div>
          <div class="camera-video-wrap">
            <video id="cameraVideo" autoplay playsinline muted></video>
            <div class="camera-watermark-preview">
              <span>巡店现场</span>
              <strong>${escapeHtml(store.name)}</strong>
              <small>督导：黄庆 · 自动添加时间与地点水印</small>
            </div>
            <div class="camera-guide"></div>
          </div>
          <div class="camera-capture-footer">
            <span>${icon("shield", "icon-sm")} 仅支持实时拍摄，不能从相册上传</span>
            <div><button class="button button-secondary" data-action="close-camera">取消</button><button class="button button-primary" data-action="capture-camera">${icon(
              "camera",
              "icon-sm",
            )} 拍摄并添加水印</button></div>
          </div>
        </div>
      </div>
    `;
    root.dataset.captureContext = JSON.stringify(options);

    try {
      try {
        activeCameraStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
      } catch {
        activeCameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }
      const video = document.getElementById("cameraVideo");
      if (video) {
        video.srcObject = activeCameraStream;
        await video.play().catch(() => {});
      }
    } catch {
      closeCameraCapture();
      showToast("无法调用摄像头，请检查相机权限并使用手机打开", "error");
    }
  }

  async function captureCameraPhoto() {
    const root = document.getElementById("camera-root");
    const options = JSON.parse(root.dataset.captureContext || "{}");
    const video = document.getElementById("cameraVideo");
    if (!video?.videoWidth) {
      showToast("相机尚未准备好，请稍后重试", "error");
      return;
    }
    const scale = Math.min(
      1,
      1920 / Math.max(video.videoWidth, video.videoHeight),
    );
    const width = Math.round(video.videoWidth * scale);
    const height = Math.round(video.videoHeight * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, width, height);

    const task = taskById(options.taskId);
    const store = storeById(task.storeId);
    const subject =
      options.kind === "item"
        ? getTemplateItems(templateById(task.templateId)).find(
            (item) => item.id === options.itemId,
          )?.title
        : templateById(task.templateId).categories.find(
            (category) => category.id === options.categoryId,
          )?.name;
    const now = new Date();
    const timeText = now.toLocaleString("zh-CN", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const baseFont = Math.max(18, Math.round(width * 0.022));
    const barHeight = Math.round(baseFont * 4.7);
    context.fillStyle = "rgba(18, 24, 30, 0.78)";
    context.fillRect(0, height - barHeight, width, barHeight);
    context.fillStyle = "#ff5a3d";
    context.fillRect(0, height - barHeight, Math.round(baseFont * 0.55), barHeight);
    context.fillStyle = "#ffffff";
    context.font = `700 ${Math.round(baseFont * 1.12)}px "Microsoft YaHei", sans-serif`;
    context.fillText(store.name, baseFont * 1.4, height - barHeight + baseFont * 1.45);
    context.font = `500 ${baseFont}px "Microsoft YaHei", sans-serif`;
    context.fillText(
      `督导现场 · 黄庆 · ${timeText}`,
      baseFont * 1.4,
      height - barHeight + baseFont * 2.75,
    );
    context.fillStyle = "rgba(255,255,255,.78)";
    context.font = `400 ${Math.round(baseFont * 0.82)}px "Microsoft YaHei", sans-serif`;
    context.fillText(
      String(subject || "巡店现场").slice(0, 58),
      baseFont * 1.4,
      height - barHeight + baseFont * 3.82,
    );

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9),
    );
    if (!blob) {
      showToast("照片生成失败，请重试", "error");
      return;
    }
    const file = new File(
      [blob],
      `watermarked-${Date.now()}.jpg`,
      { type: "image/jpeg" },
    );
    const analysis = await analyzePhoto(file);
    if (analysis.aiStatus === "fail") {
      showToast(`AI自检未通过：${analysis.aiMessage}`, "error");
      return;
    }
    if (options.kind === "item") {
      applyItemPhotoResult(options.taskId, options.itemId, analysis);
    } else {
      applyCategoryPhotoResult(
        options.taskId,
        options.categoryId,
        Number(options.photoIndex || 0),
        analysis,
      );
    }
    closeCameraCapture();
    showToast("现场照片已拍摄并添加水印");
  }

  function applyItemPhotoResult(taskId, itemId, analysis) {
    const draft = getDraft(taskId);
    draft.itemPhotos ||= {};
    draft.itemPhotoNames ||= {};
    draft.itemPhotos[itemId] = analysis;
    draft.itemPhotoNames[itemId] = analysis.name || "现场照片";
    state.drafts[taskId] = draft;
    saveState();
    const checkItem = document.querySelector(
      `.check-item[data-check-id="${itemId}"]`,
    );
    const feedback = checkItem?.querySelector(".item-fail-feedback");
    if (feedback) {
      const count = feedback.querySelector(".photo-requirement-count");
      if (count) count.textContent = "1/1";
      const existingPreview = feedback.querySelector(".ai-photo-preview");
      const previewMarkup = renderItemPhotoPreviewMarkup(analysis);
      if (existingPreview) {
        existingPreview.outerHTML = previewMarkup;
      } else {
        feedback
          .querySelector(".item-fail-tools")
          ?.insertAdjacentHTML("beforebegin", previewMarkup);
      }
      const uploadLabel = feedback.querySelector(".photo-upload-label");
      if (uploadLabel) {
        uploadLabel.innerHTML = `${icon("camera", "icon-sm")} 重新拍摄`;
      }
    }
    refreshInspectionUi(taskId);
  }

  function applyCategoryPhotoResult(
    taskId,
    categoryId,
    photoIndex,
    analysis,
  ) {
    const task = taskById(taskId);
    const template = templateById(task.templateId);
    const category = template.categories.find(
      (item) => item.id === categoryId,
    );
    const draft = getDraft(taskId);
    draft.categoryPhotos ||= {};
    draft.categoryPhotos[categoryId] ||= [];
    draft.categoryPhotos[categoryId][photoIndex] = analysis;
    state.drafts[taskId] = draft;
    saveState();
    const slot = document.querySelector(
      `.category-photo-slot:has(#cat-photo-${taskId}-${categoryId}-${photoIndex})`,
    );
    if (slot) {
      slot.outerHTML = renderCategoryPhotoSlot(
        task,
        category,
        photoIndex,
        analysis,
      );
    }
    const evidence = document.querySelector(
      `#category-${categoryId} .category-evidence`,
    );
    const evidenceCount = evidence?.querySelector(
      ".category-feedback-head span:last-child",
    );
    if (evidenceCount) {
      evidenceCount.textContent = `${
        (draft.categoryPhotos?.[categoryId] || []).filter(isPhotoReady).length
      }/${category.photoCount} 张 · AI自检`;
    }
    refreshInspectionUi(taskId);
  }

  function getDraftProgress(taskId) {
    const task = taskById(taskId);
    if (!task) return 0;
    const template = templateById(task.templateId);
    const items = getTemplateItems(template);
    const draft = getDraft(taskId);
    const selected = items.filter((item) => draft.ratings[item.id]).length;
    const failedItems = items.filter(
      (item) => draft.ratings[item.id] === "fail",
    );
    const failedPhotos = failedItems.filter(
      (item) => isPhotoReady(draft.itemPhotos?.[item.id]),
    ).length;
    const failedNotes = failedItems.filter((item) =>
      String(draft.notes?.[item.id] || "").trim(),
    ).length;
    const completeCategories = template.categories.filter((category) =>
      category.items.every((item) => draft.ratings[item.id]),
    );
    const categoryFeedbackDone = completeCategories.filter(
      (category) =>
        String(draft.categoryFeedback?.[category.id] || "").trim(),
    ).length;
    const requiredCategoryPhotos = template.categories.reduce(
      (total, category) => total + (category.photoCount || 0),
      0,
    );
    const capturedCategoryPhotos = template.categories.reduce(
      (total, category) =>
        total +
        Math.min(
          (draft.categoryPhotos?.[category.id] || []).filter(isPhotoReady)
            .length,
          category.photoCount || 0,
        ),
      0,
    );
    const totalUnits =
      items.length +
      failedItems.length * 2 +
      requiredCategoryPhotos +
      completeCategories.length;
    const completedUnits =
      selected +
      failedPhotos +
      failedNotes +
      capturedCategoryPhotos +
      categoryFeedbackDone;
    return totalUnits
      ? Math.round((completedUnits / totalUnits) * 100)
      : 0;
  }

  function pendingIssueCount() {
    return state.issues.filter((issue) => issue.status !== "closed").length;
  }

  function openTaskCount() {
    return state.tasks.filter((task) => task.status !== "completed").length;
  }

  function supervisorOpenTaskCount() {
    return state.tasks.filter(
      (task) =>
        task.assigneeRole === "supervisor" &&
        !["completed", "submitted"].includes(task.status),
    ).length;
  }

  function pendingReviewCount() {
    return state.tasks.filter(
      (task) =>
        task.status === "submitted" ||
        task.reviewStatus === "pending_review",
    ).length;
  }

  function storeRouteStatus(storeId) {
    const task = state.tasks.find(
      (item) =>
        item.storeId === storeId &&
        item.taskType === "inspection" &&
        ["submitted", "completed"].includes(item.status),
    );
    if (!task) return { done: false, label: "待巡店" };
    return {
      done: true,
      label: task.status === "completed" ? "已审核" : "已提交",
    };
  }

  function averageStoreScore() {
    const scored = state.stores.filter((store) => Number.isFinite(store.score));
    if (!scored.length) return 0;
    return Math.round(
      scored.reduce((total, store) => total + store.score, 0) / scored.length,
    );
  }

  function totalSales() {
    return state.stores.reduce((total, store) => total + (store.sales || 0), 0);
  }

  function totalGrossProfit() {
    return state.stores.reduce(
      (total, store) => total + (store.grossProfit || 0),
      0,
    );
  }

  function formatMoney(value) {
    return `¥${Number(value || 0).toLocaleString("zh-CN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function completedTaskRate() {
    return Math.round(
      (state.tasks.filter((task) => task.status === "completed").length /
        state.tasks.length) *
        100,
    );
  }

  function rectificationRate() {
    const closed = state.issues.filter((issue) => issue.status === "closed").length;
    return state.issues.length
      ? Math.round((closed / state.issues.length) * 100)
      : 100;
  }

  function statusMeta(status) {
    const map = {
      pending: { label: "待开始", className: "neutral" },
      urgent: { label: "紧急", className: "urgent" },
      in_progress: { label: "进行中", className: "info" },
      submitted: { label: "待审核", className: "purple" },
      rejected: { label: "已驳回", className: "urgent" },
      completed: { label: "已完成", className: "success" },
      rectifying: { label: "整改中", className: "warning" },
      review: { label: "待复核", className: "purple" },
      closed: { label: "已关闭", className: "success" },
    };
    return map[status] || { label: status, className: "neutral" };
  }

  function renderAvatar(name, colorClass = "") {
    return `<span class="avatar ${colorClass}" aria-hidden="true">${escapeHtml(
      name.slice(-1),
    )}</span>`;
  }

  function renderRoleSelect(extraClass = "") {
    return `
      <div class="role-switcher ${extraClass}">
        <select class="role-select" aria-label="切换应用角色" data-role-select>
          ${Object.entries(roleLabels)
            .map(
              ([value, label]) =>
                `<option value="${value}" ${
                  state.role === value ? "selected" : ""
                }>${label}</option>`,
            )
            .join("")}
        </select>
      </div>
    `;
  }

  function navItems() {
    const isSupervisor = state.role === "supervisor";
    const common = [
      {
        id: "overview",
        label: isSupervisor ? "巡店打卡" : "经营看板",
        icon: isSupervisor ? "clipboard" : "chart",
      },
      {
        id: "tasks",
        label: isSupervisor ? "我的任务" : "任务中心",
        icon: "list-checks",
        count: openTaskCount(),
      },
      {
        id: "issues",
        label: isSupervisor ? "整改跟进" : "整改总览",
        icon: "alert",
        count: pendingIssueCount(),
      },
      { id: "stores", label: "门店档案", icon: "store" },
    ];
    if (!isSupervisor) {
      common.push(
        {
          id: "management",
          label: "管理中心",
          icon: "shield",
          count: state.tasks.filter(
            (task) =>
              task.status === "submitted" ||
              task.reviewStatus === "pending_review",
          ).length,
        },
      );
    }
    common.push(
      { id: "templates", label: "巡检标准", icon: "layout" },
      { id: "reports", label: "经营报表", icon: "trending" },
    );
    if (!isSupervisor) {
      common.push({
        id: "approvals",
        label: "进入审批",
        icon: "check-circle",
        count: state.approvals?.filter((item) => item.status === "pending").length,
      });
      common.push(
        {
          id: "accounts",
          label: "人员账号",
          icon: "user",
          count: state.accounts?.filter((item) => item.status === "待启用").length,
        },
        { id: "store-settings", label: "门店设置", icon: "settings" },
      );
    }
    return common;
  }

  function renderSidebar() {
    return `
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">${icon("check-circle")}</div>
          <div>
            <div class="brand-name">巡店<span>云</span></div>
            <div class="brand-caption">Store intelligence</div>
          </div>
        </div>

        <div class="workspace-pill">
          <div class="workspace-logo">巴</div>
          <div class="workspace-meta">
            <div class="workspace-name">巴布豆商丘区域</div>
            <div class="workspace-sub">10 家门店 · 运营中心</div>
          </div>
          ${icon("chevron", "icon-sm")}
        </div>

        <div class="nav-label">管理中心</div>
        <nav class="sidebar-nav" aria-label="主导航">
          ${navItems()
            .map(
              (item) => `
                <button class="nav-item ${
                  state.page === item.id ? "active" : ""
                }" data-action="navigate" data-page="${item.id}">
                  ${icon(item.icon)}
                  <span>${item.label}</span>
                  ${item.count ? `<span class="nav-count">${item.count}</span>` : ""}
                </button>
              `,
            )
            .join("")}
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-help">
            <div class="help-icon">${icon("sparkle", "icon-sm")}</div>
            <strong>巡店小助手</strong>
            <p>优先完成高风险门店复检，今天还有 ${openTaskCount()} 项任务待处理。</p>
          </div>
          <div class="sidebar-user">
            ${renderAvatar("黄庆", "avatar-green")}
            <div class="sidebar-user-copy">
              <div class="sidebar-user-name">黄庆</div>
              <div class="sidebar-user-role">${
                state.role === "supervisor" ? "商丘区域督导" : "总经理"
              }</div>
            </div>
            <button class="icon-button" style="width: 30px; height: 30px; background: transparent; border: 0; color: #9ba4ae" data-action="open-help" aria-label="帮助">
              ${icon("settings", "icon-sm")}
            </button>
          </div>
        </div>
      </aside>
    `;
  }

  function pageTitle() {
    return (
      {
        overview: state.role === "supervisor" ? "巡店打卡" : "经营看板",
        tasks: state.role === "supervisor" ? "我的任务" : "任务中心",
        issues: state.role === "supervisor" ? "整改跟进" : "整改总览",
        stores: "门店档案",
        "store-settings": "门店设置",
        accounts: "人员账号设置",
        management: "管理中心",
        templates: "巡检标准",
        reports: "经营报表",
        approvals: "进入审批",
      }[state.page] || "经营看板"
    );
  }

  function renderTopbar() {
    return `
      <header class="topbar">
        <button class="icon-button mobile-menu-button" data-action="navigate" data-page="overview" aria-label="返回工作台">
          ${icon("menu")}
        </button>
        <div class="topbar-breadcrumb">
          <small>巴布豆 / 商丘区域 · 10店</small>
          <strong>${pageTitle()}</strong>
        </div>
        <label class="topbar-search">
          ${icon("search", "icon-sm")}
          <input id="globalSearch" type="search" placeholder="搜索门店、任务或问题…" autocomplete="off" />
          <kbd>Enter</kbd>
        </label>
        <div class="top-actions">
          ${renderRoleSelect()}
          <button class="icon-button notification-button" data-action="notifications" aria-label="通知">
            ${icon("bell")}
            <span class="notification-dot"></span>
          </button>
          <a class="icon-button" href="./xundian-cloud.apk" download aria-label="下载 Android App" title="下载 Android App">
            ${icon("download")}
          </a>
          ${renderAvatar("黄庆", "avatar-green")}
        </div>
      </header>
    `;
  }

  function renderMobileNav() {
    const items = [
      {
        id: "overview",
        label: state.role === "supervisor" ? "打卡" : "看板",
        icon: state.role === "supervisor" ? "clipboard" : "chart",
      },
      {
        id: "tasks",
        label: "任务",
        icon: "list-checks",
      },
      { id: "issues", label: "整改", icon: "alert" },
      { id: "stores", label: "门店", icon: "store" },
      state.role === "supervisor"
        ? { id: "reports", label: "报表", icon: "trending" }
        : { id: "management", label: "管理", icon: "shield" },
    ];
    return `
      <nav class="mobile-nav" aria-label="移动端导航">
        ${items
          .map(
            (item) => `
              <button class="mobile-nav-item ${
                state.page === item.id ? "active" : ""
              }" data-action="navigate" data-page="${item.id}">
                ${icon(item.icon)}
                <span>${item.label}</span>
              </button>
            `,
          )
          .join("")}
      </nav>
    `;
  }

  function renderHeaderActions() {
    const startVisitButton =
      state.role === "supervisor"
        ? `<button class="button button-primary" data-action="start-visit">
            ${icon("plus", "icon-sm")} 发起巡店
          </button>`
        : "";
    const planRouteButton =
      state.role === "supervisor"
        ? `<button class="button button-secondary" data-action="plan-route">
            ${icon("route", "icon-sm")} 规划路线
          </button>`
        : "";
    const assignTaskButton =
      state.role === "hq"
        ? `<button class="button button-primary" data-action="assign-task">
            ${icon("plus", "icon-sm")} 下发任务
          </button>`
        : "";
    if (state.page === "management") {
      return `
        <button class="button button-secondary" data-action="check-update">
          ${icon("refresh", "icon-sm")} 检查更新
        </button>
        ${assignTaskButton}
      `;
    }
    if (state.page === "store-settings") {
      return `
        <button class="button button-secondary" data-action="export-stores">
          ${icon("download", "icon-sm")} 导出设置
        </button>
        <button class="button button-primary" data-action="add-store">
          ${icon("plus", "icon-sm")} 新增门店
        </button>
      `;
    }
    if (state.page === "accounts") {
      return `
        <button class="button button-secondary" data-action="navigate" data-page="approvals">
          ${icon("check-circle", "icon-sm")} 进入审批
        </button>
        <button class="button button-primary" data-action="add-account">
          ${icon("plus", "icon-sm")} 新增账号
        </button>
      `;
    }
    if (state.page === "approvals") {
      return `
        <button class="button button-secondary" data-action="refresh-data">
          ${icon("refresh", "icon-sm")} 刷新申请
        </button>
      `;
    }
    if (state.page === "reports") {
      return `
        <button class="button button-secondary" data-action="export-report">
          ${icon("download", "icon-sm")} 导出报表
        </button>
        ${startVisitButton}${assignTaskButton}
      `;
    }
    if (state.page === "issues") {
      return `
        <button class="button button-secondary" data-action="refresh-data">
          ${icon("refresh", "icon-sm")} 刷新
        </button>
        <button class="button button-primary" data-action="new-issue">
          ${icon("plus", "icon-sm")} 新建问题
        </button>
      `;
    }
    if (state.page === "stores") {
      return `
        <button class="button button-secondary" data-action="export-stores">
          ${icon("download", "icon-sm")} 导出门店
        </button>
        ${startVisitButton}${assignTaskButton}
      `;
    }
    if (state.page === "templates") {
      return `
        <button class="button button-secondary" data-action="template-help">
          ${icon("help", "icon-sm")} 使用说明
        </button>
        ${
          state.role === "supervisor"
            ? startVisitButton
            : `<button class="button button-secondary" data-action="new-template">
                ${icon("layout", "icon-sm")} 配置标准
              </button>`
        }
      `;
    }
    if (state.role === "supervisor") {
      return `
        <button class="button button-secondary" data-action="refresh-data">
          ${icon("refresh", "icon-sm")} 刷新
        </button>
        ${planRouteButton}
        ${startVisitButton}
      `;
    }
    return `<button class="button button-secondary" data-action="weekly-report">
      ${icon("file", "icon-sm")} 生成周报
    </button>${assignTaskButton}`;
  }

  function renderPreviewTaskList() {
    const tasks = state.tasks
      .filter(
        (task) =>
          task.status !== "completed" &&
          (state.role !== "supervisor" ||
            task.assigneeRole === "supervisor"),
      )
      .slice(0, 3);
    return tasks
      .map((task) => {
        const store = storeById(task.storeId);
        const status = statusMeta(task.status);
        const canExecute =
          state.role === "supervisor" &&
          !["submitted", "completed"].includes(task.status);
        return `
          <div class="task-list-item">
            <div class="date-block">
              <strong>${task.date}</strong>
              <span>${task.month}</span>
            </div>
            <div class="task-copy">
              <div class="task-title-row">
                <span class="task-title">${escapeHtml(task.title)}</span>
                <span class="badge ${status.className}">${status.label}</span>
              </div>
              <div class="task-meta">
                <span>${icon("store", "icon-sm")} ${escapeHtml(
                  store?.name || "商丘区域",
                )}</span>
                <span>${icon("clock", "icon-sm")} ${escapeHtml(task.dueLabel)}</span>
              </div>
            </div>
            <button class="button ${
              canExecute ? "button-primary" : "button-secondary"
            } button-sm task-action" data-action="${
              canExecute
                ? task.taskType === "inspection"
                  ? "open-inspection"
                  : "execute-task"
                : "navigate"
            }" data-task-id="${task.id}" ${
              canExecute ? "" : 'data-page="tasks"'
            }>
              ${
                canExecute
                  ? task.status === "in_progress"
                    ? task.taskType === "inspection"
                      ? "继续巡店"
                      : "继续任务"
                    : task.taskType === "inspection"
                      ? "执行巡店"
                      : "提交完成"
                  : "查看状态"
              }
            </button>
          </div>
        `;
      })
      .join("");
  }

  function renderIssueCompactList() {
    const issues = state.issues
      .filter((issue) => issue.status !== "closed")
      .slice(0, 3);
    return issues
      .map((issue) => {
        const store = storeById(issue.storeId);
        return `
          <button class="issue-compact" data-action="open-issue" data-issue-id="${issue.id}">
            <span class="issue-accent ${issue.severity}"></span>
            <span class="issue-compact-copy">
              <span class="issue-compact-title">${escapeHtml(issue.title)}</span>
              <span class="issue-compact-meta">
                <span>${escapeHtml(store.name)}</span>
                <span class="due">${escapeHtml(issue.due)}</span>
              </span>
            </span>
            ${icon("chevron", "icon-sm")}
          </button>
        `;
      })
      .join("");
  }

  function renderRiskStores() {
    return state.stores
      .slice()
      .sort(
        (a, b) =>
          b.issues - a.issues ||
          (Number.isFinite(a.score) ? a.score : 101) -
            (Number.isFinite(b.score) ? b.score : 101),
      )
      .slice(0, 3)
      .map((store) => {
        const score = Number.isFinite(store.score) ? store.score : "—";
        return `
          <button class="risk-store" data-action="open-store" data-store-id="${store.id}">
            <span class="store-mini-mark">${icon("store", "icon-sm")}</span>
            <span class="risk-store-copy">
              <span class="risk-store-name">${escapeHtml(store.name)}</span>
              <span class="risk-store-meta">${store.issues} 项待整改 · 昨日销售 ${formatMoney(
                store.sales,
              )}</span>
            </span>
            <span class="score-mini">${score}<span>${Number.isFinite(
              store.score,
            ) ? "分" : "未巡"}</span></span>
            ${icon("chevron", "icon-sm")}
          </button>
        `;
      })
      .join("");
  }

  function renderOverviewPage() {
    const isSupervisor = state.role === "supervisor";
    const nextTask = state.tasks.find(
      (task) =>
        task.status !== "completed" &&
        (state.role !== "supervisor" ||
          task.assigneeRole === "supervisor"),
    );
    const avgScore = averageStoreScore();
    const completedRate = completedTaskRate();
    const openIssues = pendingIssueCount();
    const sales = totalSales();
    const grossProfit = totalGrossProfit();
    const marginRate = sales ? (grossProfit / sales) * 100 : 0;
    const routeStores = (state.route?.storeIds || [])
      .map((storeId) => storeById(storeId))
      .filter(Boolean);
    const nextRouteStore = routeStores.find(
      (store) => !storeRouteStatus(store.id).done,
    );
    const nextRouteTask = nextRouteStore
      ? state.tasks.find(
          (task) =>
            task.storeId === nextRouteStore.id &&
            task.taskType === "inspection" &&
            ["pending", "in_progress", "rejected", "urgent"].includes(
              task.status,
            ),
        )
      : null;
    const routeDoneCount = routeStores.filter(
      (store) => storeRouteStatus(store.id).done,
    ).length;
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">${isSupervisor ? "Field operations" : "Store overview"}</div>
            <h1>${isSupervisor ? "巡店打卡" : "下午好，黄庆"}</h1>
            <p>${
              isSupervisor
                ? `商丘区域 10 家门店，当前有 ${supervisorOpenTaskCount()} 项任务待执行。`
                : `商丘区域 10 家门店 · ${pendingReviewCount()} 项任务待审核。`
            }</p>
          </div>
          <div class="header-actions">${renderHeaderActions()}</div>
        </div>

        <div class="dashboard-grid">
          <div class="dashboard-main">
            <div class="hero-banner">
              <div class="hero-copy">
                <div class="hero-kicker">
                  ${icon("sparkle", "icon-sm")}
                  ${
                    isSupervisor
                      ? routeStores.length
                        ? "督导自主规划路线"
                        : "今日巡店路线待规划"
                      : "本周运营重点"
                  }
                </div>
                <h2>${
                  isSupervisor
                    ? nextRouteStore
                      ? `下一站，${escapeHtml(nextRouteStore.name)}`
                      : routeStores.length
                        ? "今日巡店路线已完成"
                        : "规划今天的巡店路线"
                    : "把经营数据，连接到每一家门店"
                }</h2>
                <p>${
                  isSupervisor
                    ? routeStores.length
                      ? `已规划 ${routeStores.length} 家门店，完成 ${routeDoneCount} 家。路线由督导本人安排，可随时重新调整顺序。`
                      : "选择计划到访的门店并按实际出行顺序排列，开始巡店时会自动带入该门店。"
                    : `昨日销售 ${formatMoney(
                      sales,
                    )}、毛利 ${formatMoney(
                      grossProfit,
                    )}；当前有 ${pendingReviewCount()} 项任务待总经理审核。`
                }</p>
                <div class="hero-actions">
                  <button class="button button-primary" data-action="${
                    isSupervisor
                      ? nextRouteStore
                        ? nextRouteTask
                          ? "open-inspection"
                          : "start-visit"
                        : "plan-route"
                      : "navigate"
                  }" data-store-id="${nextRouteStore?.id || ""}" data-task-id="${
                    nextRouteTask?.id || ""
                  }" ${
                    isSupervisor ? "" : 'data-page="tasks"'
                  }>
                    ${icon(
                      isSupervisor
                        ? nextRouteStore
                          ? "play"
                          : "route"
                        : "list-checks",
                      "icon-sm",
                    )} ${
                      isSupervisor
                        ? nextRouteStore
                          ? "开始下一站"
                          : routeStores.length
                            ? "重新规划路线"
                            : "规划巡店路线"
                        : "查看任务中心"
                    }
                  </button>
                  <button class="button button-ghost" data-action="navigate" data-page="issues">
                    查看整改闭环 ${icon("arrow-right", "icon-sm")}
                  </button>
                </div>
              </div>
              <div class="hero-art" aria-hidden="true">
                <div class="hero-paw">${icon("check-circle")}</div>
                <div class="hero-store-card">
                  <div class="hero-store-stripe"></div>
                  <div class="hero-store-line"></div>
                  <div class="hero-store-line"></div>
                  <div class="hero-store-line short"></div>
                  <div class="hero-store-badge">${icon("check", "icon-sm")}</div>
                </div>
              </div>
            </div>

            <div class="kpi-grid">
              <article class="stat-card" style="--accent: var(--brand); --tint: var(--brand-soft)">
                <div class="stat-head">
                  <span>${isSupervisor ? "待执行任务" : "昨日销售额"}</span>
                  <span class="stat-icon">${icon("store", "icon-sm")}</span>
                </div>
                <div class="stat-number-row">
                  <span class="stat-value" ${
                    isSupervisor ? "" : 'style="font-size:21px;letter-spacing:-.04em"'
                  }>${isSupervisor ? supervisorOpenTaskCount() : formatMoney(sales)}</span>
                  <span class="stat-unit">${isSupervisor ? "项" : ""}</span>
                </div>
                <div class="stat-foot">${isSupervisor ? "今日计划" : "10 家门店 · 2026-11-24"}</div>
              </article>
              <article class="stat-card" style="--accent: var(--green); --tint: var(--green-soft)">
                <div class="stat-head">
                  <span>${isSupervisor ? "巡店完成率" : "总毛利额"}</span>
                  <span class="stat-icon">${icon("check-circle", "icon-sm")}</span>
                </div>
                <div class="stat-number-row">
                  <span class="stat-value" ${
                    isSupervisor ? "" : 'style="font-size:21px;letter-spacing:-.04em"'
                  }>${isSupervisor ? completedRate : formatMoney(grossProfit)}</span>
                  <span class="stat-unit">${isSupervisor ? "%" : ""}</span>
                </div>
                <div class="stat-foot">${
                  isSupervisor
                    ? "近 7 天"
                    : `综合毛利率 ${marginRate.toFixed(1)}%`
                }</div>
              </article>
              <article class="stat-card" style="--accent: var(--orange); --tint: var(--orange-soft)">
                <div class="stat-head">
                  <span>待整改问题</span>
                  <span class="stat-icon">${icon("alert", "icon-sm")}</span>
                </div>
                <div class="stat-number-row">
                  <span class="stat-value">${openIssues}</span>
                  <span class="stat-unit">项</span>
                </div>
                <div class="stat-foot"><span class="trend down">${icon("arrow-up", "icon-sm")} 1</span> 高优先级</div>
              </article>
              <article class="stat-card" style="--accent: var(--blue); --tint: var(--blue-soft)">
                <div class="stat-head">
                  <span>门店平均分</span>
                  <span class="stat-icon">${icon("award", "icon-sm")}</span>
                </div>
                <div class="stat-number-row">
                  <span class="stat-value">${avgScore}</span>
                  <span class="stat-unit">分</span>
                </div>
                <div class="stat-foot"><span class="trend up">${icon("arrow-up", "icon-sm")} 2.6</span> 环比上期</div>
              </article>
            </div>

            <section class="panel">
              <div class="panel-header">
                <div class="panel-heading">
                  <h3>${isSupervisor ? "待办任务" : "任务动态"}</h3>
                  <p>按计划时间排序，共 ${openTaskCount()} 项待完成</p>
                </div>
                <button class="panel-link" data-action="navigate" data-page="tasks">
                  查看全部 ${icon("chevron", "icon-sm")}
                </button>
              </div>
              <div class="panel-body">
                <div class="task-list">${renderPreviewTaskList()}</div>
              </div>
            </section>
            ${
              isSupervisor
                ? `<section class="panel">
                    <div class="panel-header">
                      <div class="panel-heading">
                        <h3>今日巡店路线</h3>
                        <p>由督导自主选择门店并调整顺序</p>
                      </div>
                      <button class="panel-link" data-action="plan-route">
                        ${routeStores.length ? "重新规划" : "规划路线"} ${icon(
                          "chevron",
                          "icon-sm",
                        )}
                      </button>
                    </div>
                    <div class="panel-body">
                      ${
                        routeStores.length
                          ? `<div class="route-order-list">${routeStores
                              .map((store, index) => {
                                const routeStatus = storeRouteStatus(store.id);
                                const routeTask = state.tasks.find(
                                  (task) =>
                                    task.storeId === store.id &&
                                    task.taskType === "inspection" &&
                                    [
                                      "pending",
                                      "in_progress",
                                      "rejected",
                                      "urgent",
                                    ].includes(task.status),
                                );
                                return `<div class="route-order-item">
                                  <span class="route-number">${index + 1}</span>
                                  <span class="route-order-copy"><strong>${escapeHtml(
                                    store.name,
                                  )}</strong><span>${escapeHtml(
                                    store.address,
                                  )}</span></span>
                                  <span class="badge ${
                                    routeStatus.done ? "success" : "info"
                                  }">${routeStatus.label}</span>
                                  ${
                                    routeStatus.done
                                      ? ""
                                      : `<button class="button button-secondary button-sm" data-action="${
                                          routeTask
                                            ? "open-inspection"
                                            : "start-visit"
                                        }" data-store-id="${store.id}" data-task-id="${
                                          routeTask?.id || ""
                                        }">到这店巡店</button>`
                                  }
                                </div>`;
                              })
                              .join("")}</div>`
                          : `<div class="empty-state" style="min-height:180px"><div class="empty-icon">${icon(
                              "route",
                            )}</div><strong>还没有规划路线</strong><p>督导可自行选择门店和到访顺序。</p></div>`
                      }
                    </div>
                  </section>`
                : ""
            }
          </div>

          <div class="dashboard-aside">
            <section class="panel score-card">
              <div class="panel-header">
                <div class="panel-heading">
                  <h3>本月运营指数</h3>
                  <p>综合任务、问题与复检数据</p>
                </div>
                <span class="badge success">良好</span>
              </div>
              <div class="score-overview">
                <div class="donut" style="--value: ${avgScore}">
                  <div class="donut-center">
                    <strong>${avgScore}</strong>
                    <span>综合得分</span>
                  </div>
                </div>
                <div class="score-copy">
                  <h3>已完成首轮标准巡检</h3>
                  <p>尚都国际店得分 98；其余 9 家门店正在按商丘区域计划推进。</p>
                  <span class="trend up">${icon("check-circle", "icon-sm")} 25 项标准已启用</span>
                </div>
              </div>
              <div class="score-legend">
                <div class="legend-item"><strong>${state.stores.length}</strong><span>在营门店</span></div>
                <div class="legend-item"><strong>${rectificationRate()}%</strong><span>整改闭环</span></div>
                <div class="legend-item"><strong>2.1</strong><span>平均天数</span></div>
              </div>
            </section>

            <section class="panel">
              <div class="panel-header">
                <div class="panel-heading">
                  <h3>待跟进问题</h3>
                  <p>${openIssues} 项尚未关闭</p>
                </div>
                <button class="panel-link" data-action="navigate" data-page="issues">
                  全部 ${icon("chevron", "icon-sm")}
                </button>
              </div>
              <div class="panel-body">
                <div class="issue-compact-list">${renderIssueCompactList()}</div>
              </div>
            </section>

            <section class="panel">
              <div class="panel-header">
                <div class="panel-heading">
                  <h3>风险门店</h3>
                  <p>按最新巡检得分排序</p>
                </div>
              </div>
              <div class="panel-body">
                <div class="risk-store-list">${renderRiskStores()}</div>
              </div>
            </section>
          </div>
        </div>
      </section>
    `;
  }

  function filteredTasks() {
    return state.tasks.filter((task) => {
      const store = storeById(task.storeId);
      const assigneeMatch =
        state.role !== "supervisor" || task.assigneeRole === "supervisor";
      const statusMatch =
        ui.taskFilter === "all" ||
        (ui.taskFilter === "pending" &&
          ["pending", "urgent"].includes(task.status)) ||
        task.status === ui.taskFilter;
      const query = ui.taskQuery.trim().toLowerCase();
      const text = `${task.title} ${store?.name || "商丘区域"} ${task.inspector}`.toLowerCase();
      return assigneeMatch && statusMatch && (!query || text.includes(query));
    });
  }

  function taskTypeLabel(task) {
    return (
      {
        inspection: "巡店任务",
        other: "督导其他任务",
        operation: "门店运营任务",
      }[task.taskType] || "任务"
    );
  }

  function renderTaskCards() {
    const tasks = filteredTasks();
    if (!tasks.length) {
      return `
        <div class="empty-state">
          <div class="empty-icon">${icon("search")}</div>
          <strong>没有匹配的巡店任务</strong>
          <p>试试调整筛选条件，或发起一项新的门店巡检。</p>
        </div>
      `;
    }
    return `
      <div class="task-cards">
        ${tasks
          .map((task) => {
            const store = storeById(task.storeId);
            const storeName = store?.name || "商丘区域";
            const status = statusMeta(task.status);
            const tint =
              task.status === "completed"
                ? "var(--green)"
                : task.status === "submitted"
                  ? "var(--purple)"
                  : task.status === "rejected"
                    ? "var(--red)"
                : task.status === "urgent"
                  ? "var(--red)"
                  : task.status === "in_progress"
                    ? "var(--blue)"
                    : "var(--brand)";
            const progress =
              task.status === "in_progress" && task.taskType === "inspection"
                ? Math.max(task.progress, getDraftProgress(task.id))
                : task.progress;
            let actionMarkup = `<span class="badge info">待${escapeHtml(
              task.assigneeRole === "store" ? "门店" : "督导",
            )}执行</span>`;
            if (state.role === "hq" && task.status === "submitted") {
              actionMarkup = `<button class="button button-primary button-sm" data-action="review-task" data-task-id="${task.id}">审核任务</button>`;
            } else if (task.status === "completed") {
              actionMarkup = `<button class="button button-secondary button-sm" data-action="task-detail" data-task-id="${task.id}">查看结果</button>`;
            } else if (
              state.role === "supervisor" &&
              task.assigneeRole === "supervisor" &&
              !["submitted", "completed"].includes(task.status)
            ) {
              actionMarkup = `<button class="button button-primary button-sm" data-action="${
                task.taskType === "inspection"
                  ? "open-inspection"
                  : "execute-task"
              }" data-task-id="${task.id}">${
                task.taskType === "inspection" ? "执行巡店" : "提交完成"
              }</button>`;
            } else if (task.status === "submitted") {
              actionMarkup = `<span class="badge purple">待上级审核</span>`;
            }
            return `
              <article class="task-card" style="--tint: ${tint}">
                <div class="task-card-head">
                  <div>
                    <span class="store-badge">${icon("store", "icon-sm")} ${escapeHtml(
                      storeName,
                    )}</span>
                    <h3>${escapeHtml(task.title)}</h3>
                    <div class="task-card-location">${icon(
                      "pin",
                      "icon-sm",
                    )} ${escapeHtml(store?.address || "商丘区域")}</div>
                  </div>
                  <span class="badge ${status.className}">${status.label}</span>
                </div>
                <div class="task-card-progress">
                  <div class="progress-line"><span style="width: ${progress}%"></span></div>
                  <div class="progress-meta">
                    <span>${icon("clock", "icon-sm")} ${escapeHtml(task.dueLabel)}</span>
                    <span>${
                      task.status === "completed"
                        ? task.resultScore
                          ? `巡检得分 ${task.resultScore} · 已审核`
                          : "任务已审核"
                        : task.status === "submitted"
                          ? "等待总经理审核"
                          : `完成 ${progress}%`
                    }</span>
                  </div>
                </div>
                <div class="task-card-bottom">
                  <div class="assignee">
                    ${renderAvatar(task.inspector, "avatar-blue")}
                    ${escapeHtml(task.inspector)} · ${escapeHtml(
                      taskTypeLabel(task),
                    )} · ${escapeHtml(task.createdBy || "系统")}下发
                  </div>
                  ${actionMarkup}
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderTasksPage() {
    const visibleTasks = state.tasks.filter(
      (task) =>
        state.role !== "supervisor" || task.assigneeRole === "supervisor",
    );
    const counts = {
      all: visibleTasks.length,
      pending: visibleTasks.filter((task) =>
        ["pending", "urgent"].includes(task.status),
      ).length,
      in_progress: visibleTasks.filter((task) => task.status === "in_progress")
        .length,
      submitted: visibleTasks.filter((task) => task.status === "submitted")
        .length,
      completed: visibleTasks.filter((task) => task.status === "completed")
        .length,
    };
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">Inspection tasks</div>
            <h1>${
              state.role === "supervisor" ? "我的任务" : "任务中心"
            }</h1>
            <p>总经理下发督导或门店任务，执行人提交完成结果，再由上级审核关闭。</p>
          </div>
          <div class="header-actions">${renderHeaderActions()}</div>
        </div>

        <div class="filter-row">
          <div class="chips" role="group" aria-label="任务状态筛选">
            ${[
              ["all", "全部"],
              ["pending", "待开始"],
              ["in_progress", "进行中"],
              ["submitted", "待审核"],
              ["completed", "已完成"],
            ]
              .map(
                ([value, label]) => `
                  <button class="chip ${
                    ui.taskFilter === value ? "active" : ""
                  }" data-action="filter-tasks" data-filter="${value}">
                    ${label}<span class="chip-count">${counts[value]}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
          <label class="inline-search">
            ${icon("search", "icon-sm")}
            <input id="taskSearch" type="search" value="${escapeHtml(
              ui.taskQuery,
            )}" placeholder="搜索门店或任务…" />
          </label>
        </div>

        <div id="taskResults">${renderTaskCards()}</div>
      </section>
    `;
  }

  function severityLabel(severity) {
    return (
      { high: "高优先级", normal: "中优先级", low: "低优先级" }[severity] ||
      "中优先级"
    );
  }

  function renderIssueCard(issue) {
    const store = storeById(issue.storeId);
    return `
      <article class="issue-card" data-action="open-issue" data-issue-id="${issue.id}">
        <div class="issue-card-top">
          <span class="severity ${issue.severity}">${icon(
            issue.severity === "high" ? "alert" : "flag",
            "icon-sm",
          )} ${severityLabel(issue.severity)}</span>
          <span class="issue-code">${issue.id}</span>
        </div>
        <h3>${escapeHtml(issue.title)}</h3>
        <div class="issue-store">${icon("store", "icon-sm")} ${escapeHtml(
          store.name,
        )} · ${escapeHtml(issue.category)}</div>
        <div class="issue-evidence">
          <div class="evidence-frame ${
            issue.category === "运营安全" ? "hallway" : "shelves"
          }"><span class="photo-count">现场 01</span></div>
          <div class="evidence-frame ${
            issue.category === "运营安全" ? "shelves" : "hallway"
          }"><span class="photo-count">现场 02</span></div>
        </div>
        <div class="issue-card-footer">
          <span class="assignee">
            ${renderAvatar(issue.assignee, "avatar-pink")}
            ${escapeHtml(issue.assignee)}
          </span>
          <span class="due-date ${issue.overdue ? "overdue" : ""}">
            ${icon("clock", "icon-sm")} ${escapeHtml(issue.due)}
          </span>
        </div>
      </article>
    `;
  }

  function issueBoardMarkup() {
    const query = ui.issueQuery.trim().toLowerCase();
    const filtered = state.issues
      .filter((issue) => issue.status !== "closed")
      .filter((issue) => {
        const store = storeById(issue.storeId);
        const text =
          `${issue.id} ${issue.title} ${issue.category} ${store?.name || ""}`.toLowerCase();
        const focusMatch =
          ui.issueFocus === "all" ||
          (ui.issueFocus === "high" && issue.severity === "high") ||
          (ui.issueFocus === "mine" && issue.assignee === "门店人员");
        return focusMatch && (!query || text.includes(query));
      });
    const columns = [
      {
        label: "待处理",
        accent: "var(--orange)",
        items: filtered.filter((issue) => issue.status === "pending"),
      },
      {
        label: "整改中",
        accent: "var(--blue)",
        items: filtered.filter((issue) => issue.status === "rectifying"),
      },
      {
        label: "待复核",
        accent: "var(--purple)",
        items: filtered.filter((issue) => issue.status === "review"),
      },
    ];
    return columns
      .map(
        (column) => `
          <section class="issue-column">
            <div class="issue-column-header" style="--accent: ${column.accent}">
              <span class="column-dot"></span>
              <strong>${column.label}</strong>
              <span>${column.items.length}</span>
            </div>
            <div class="issue-column-list">
              ${
                column.items.length
                  ? column.items.map(renderIssueCard).join("")
                  : `<div class="empty-state" style="min-height: 160px"><div class="empty-icon">${icon(
                      "check-circle",
                    )}</div><strong>暂无问题</strong><p>当前分组下没有待处理事项。</p></div>`
              }
            </div>
          </section>
        `,
      )
      .join("");
  }

  function refreshIssueBoardView() {
    const board = document.getElementById("issueBoard");
    if (board) board.innerHTML = issueBoardMarkup();
  }

  function renderIssuesPage() {
    const openIssues = state.issues.filter((issue) => issue.status !== "closed");
    const query = ui.issueQuery.trim().toLowerCase();
    const filtered = openIssues.filter((issue) => {
      const store = storeById(issue.storeId);
      const text = `${issue.id} ${issue.title} ${issue.category} ${store.name}`.toLowerCase();
      const focusMatch =
        ui.issueFocus === "all" ||
        (ui.issueFocus === "high" && issue.severity === "high") ||
        (ui.issueFocus === "mine" && issue.assignee === "门店人员");
      return focusMatch && (!query || text.includes(query));
    });
    const columns = [
      {
        status: "pending",
        label: "待处理",
        accent: "var(--orange)",
        items: filtered.filter((issue) => issue.status === "pending"),
      },
      {
        status: "rectifying",
        label: "整改中",
        accent: "var(--blue)",
        items: filtered.filter((issue) => issue.status === "rectifying"),
      },
      {
        status: "review",
        label: "待复核",
        accent: "var(--purple)",
        items: filtered.filter((issue) => issue.status === "review"),
      },
    ];
    const counts = {
      open: openIssues.length,
      high: openIssues.filter((issue) => issue.severity === "high").length,
      review: openIssues.filter((issue) => issue.status === "review").length,
      closed: state.issues.filter((issue) => issue.status === "closed").length,
    };
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">Issue resolution</div>
            <h1>${
              state.role === "supervisor" ? "整改跟进" : "整改总览"
            }</h1>
            <p>督导问题照与门店整改照双留档，门店提交反馈后由督导复核关闭。</p>
          </div>
          <div class="header-actions">${renderHeaderActions()}</div>
        </div>

        <div class="issue-summary-grid">
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--orange); --tint: var(--orange-soft)">${icon("alert")}</span>
            <span class="summary-copy"><strong>${counts.open}</strong><span>待闭环问题</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--red); --tint: var(--red-soft)">${icon("flag")}</span>
            <span class="summary-copy"><strong>${counts.high}</strong><span>高优先级</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--purple); --tint: var(--purple-soft)">${icon("eye")}</span>
            <span class="summary-copy"><strong>${counts.review}</strong><span>等待复核</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--green); --tint: var(--green-soft)">${icon("check-circle")}</span>
            <span class="summary-copy"><strong>${counts.closed}</strong><span>本月已关闭</span></span>
          </article>
        </div>

        <div class="filter-row">
          <div class="chips">
            ${[
              ["all", "全部问题"],
              ["high", "高优先级"],
              ["mine", "门店负责人"],
            ]
              .map(
                ([value, label]) => `
                  <button class="chip ${
                    ui.issueFocus === value ? "active" : ""
                  }" data-action="filter-issues" data-filter="${value}">${label}</button>
                `,
              )
              .join("")}
          </div>
          <label class="inline-search">
            ${icon("search", "icon-sm")}
            <input id="issueSearch" type="search" value="${escapeHtml(
              ui.issueQuery,
            )}" placeholder="搜索问题或门店…" />
          </label>
        </div>

        <div id="issueBoard" class="issue-board">${issueBoardMarkup()}</div>
      </section>
    `;
  }

  function riskBadge(risk) {
    const className =
      risk === "高风险"
        ? "urgent"
        : risk === "关注"
          ? "warning"
          : risk === "待巡检"
            ? "neutral"
            : "success";
    return `<span class="badge ${className}">${risk}</span>`;
  }

  function renderStoreRows(stores) {
    if (!stores.length) {
      return `<tr><td colspan="9"><div class="empty-state" style="min-height: 220px"><div class="empty-icon">${icon(
        "search",
      )}</div><strong>没有匹配的门店</strong><p>换个关键词搜索门店名称或管理人员。</p></div></td></tr>`;
    }
    return stores
      .map(
        (store) => `
          <tr data-action="open-store" data-store-id="${store.id}">
            <td>
              <div class="table-store">
                <span class="table-store-mark">${icon("store", "icon-sm")}</span>
                <span><strong>${escapeHtml(store.name)}</strong><span>${escapeHtml(
                  store.address,
                )}</span></span>
              </div>
            </td>
            <td>${formatMoney(store.sales)}</td>
            <td>${formatMoney(store.grossProfit)}</td>
            <td><span class="badge ${
              store.margin >= 35 ? "success" : store.margin >= 25 ? "warning" : "urgent"
            } no-dot">${store.margin.toFixed(2)}%</span></td>
            <td>${store.newCustomers}</td>
            <td>${escapeHtml(store.lastInspection)}</td>
            <td>
              <div class="score-cell">
                ${Number.isFinite(store.score) ? store.score : "—"}
                ${
                  Number.isFinite(store.score)
                    ? `<span class="score-bar ${
                        store.score < 80
                          ? "danger"
                          : store.score < 88
                            ? "warning"
                            : ""
                      }"><span style="width: ${store.score}%"></span></span>`
                    : ""
                }
              </div>
            </td>
            <td>${store.issues ? `<span class="badge warning">${store.issues} 项</span>` : `<span class="badge success">无</span>`}</td>
            <td>${riskBadge(store.risk)}</td>
          </tr>
        `,
      )
      .join("");
  }

  function filteredStores() {
    const query = ui.storeQuery.trim().toLowerCase();
    return state.stores.filter((store) => {
      const text = `${store.name} ${store.city} ${store.address} ${store.manager} ${store.risk}`.toLowerCase();
      return !query || text.includes(query);
    });
  }

  function renderStoresPage() {
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">Store directory</div>
            <h1>门店档案</h1>
            <p>商丘区域 10 家门店，联合展示 11月24日销售、毛利与巡店状态。</p>
          </div>
          <div class="header-actions">${renderHeaderActions()}</div>
        </div>

        <div class="issue-summary-grid">
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--blue); --tint: var(--blue-soft)">${icon("store")}</span>
            <span class="summary-copy"><strong>${state.stores.length}</strong><span>在营门店</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--orange); --tint: var(--orange-soft)">${icon("target")}</span>
            <span class="summary-copy"><strong>${averageStoreScore()}</strong><span>平均门店得分</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--red); --tint: var(--red-soft)">${icon("alert")}</span>
            <span class="summary-copy"><strong>${state.stores.filter((store) => store.risk === "待巡检").length}</strong><span>待巡检门店</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--green); --tint: var(--green-soft)">${icon("check-circle")}</span>
            <span class="summary-copy"><strong>${state.stores.reduce((total, store) => total + store.issues, 0)}</strong><span>未关闭问题</span></span>
          </article>
        </div>

        <div class="data-panel">
          <div class="data-panel-toolbar">
            <div class="data-panel-toolbar-copy">
              <h3>门店档案</h3>
              <p>共 ${state.stores.length} 家门店，点击行查看详情</p>
            </div>
            <label class="inline-search">
              ${icon("search", "icon-sm")}
              <input id="storeSearch" type="search" value="${escapeHtml(
                ui.storeQuery,
              )}" placeholder="搜索门店、城市或门店人员…" />
            </label>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>门店</th>
                  <th>昨日销售</th>
                  <th>毛利额</th>
                  <th>毛利率</th>
                  <th>新客</th>
                  <th>最近巡检</th>
                  <th>最新得分</th>
                  <th>待整改</th>
                  <th>风险状态</th>
                </tr>
              </thead>
              <tbody id="storeTableBody">${renderStoreRows(filteredStores())}</tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  function renderStoreSettingsPage() {
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">Store configuration</div>
            <h1>门店设置</h1>
            <p>维护 10 家门店的营业状态、营业时间、门店人员与基础资料。</p>
          </div>
          <div class="header-actions">${renderHeaderActions()}</div>
        </div>
        <div class="issue-summary-grid">
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--blue);--tint:var(--blue-soft)">${icon("store")}</span><span class="summary-copy"><strong>${state.stores.length}</strong><span>门店总数</span></span></article>
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--green);--tint:var(--green-soft)">${icon("check-circle")}</span><span class="summary-copy"><strong>${state.stores.filter((store) => store.status === "营业中").length}</strong><span>正常营业</span></span></article>
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--orange);--tint:var(--orange-soft)">${icon("user")}</span><span class="summary-copy"><strong>${state.accounts.length}</strong><span>已配置账号</span></span></article>
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--purple);--tint:var(--purple-soft)">${icon("clock")}</span><span class="summary-copy"><strong>10:00</strong><span>默认营业开始</span></span></article>
        </div>
        <div class="data-panel">
          <div class="data-panel-toolbar">
            <div class="data-panel-toolbar-copy">
              <h3>门店基础设置</h3>
              <p>门店人员账号只绑定门店，不再区分店长或导购</p>
            </div>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead><tr><th>门店</th><th>营业状态</th><th>营业时间</th><th>门店联系人</th><th>员工账号</th><th>操作</th></tr></thead>
              <tbody>
                ${state.stores
                  .map((store) => {
                    const accountCount = state.accounts.filter(
                      (account) =>
                        account.role === "门店人员" &&
                        account.storeId === store.id,
                    ).length;
                    return `
                      <tr style="cursor:default">
                        <td><div class="table-store"><span class="table-store-mark">${icon(
                          "store",
                          "icon-sm",
                        )}</span><span><strong>${escapeHtml(
                          store.name,
                        )}</strong><span>${escapeHtml(
                          store.address,
                        )}</span></span></div></td>
                        <td><span class="badge ${
                          store.status === "营业中" ? "success" : "warning"
                        }">${escapeHtml(store.status)}</span></td>
                        <td>${escapeHtml(store.businessHours)}</td>
                        <td>${escapeHtml(store.contact)}</td>
                        <td>${accountCount} 个</td>
                        <td><div style="display:flex;gap:6px"><button class="button button-secondary button-sm" data-action="edit-store-setting" data-store-id="${
                          store.id
                        }">编辑</button><button class="button button-danger button-sm" data-action="delete-store" data-store-id="${
                          store.id
                        }">删除</button></div></td>
                      </tr>
                    `;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  function renderAccountsPage() {
    const roleCounts = {
      hq: state.accounts.filter((item) => item.role === "总经理").length,
      supervisor: state.accounts.filter((item) => item.role === "督导").length,
      store: state.accounts.filter((item) => item.role === "门店人员").length,
    };
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">People & accounts</div>
            <h1>人员账号设置</h1>
            <p>总部、督导按职责授权；门店人员统一绑定门店，不区分店长和导购。</p>
          </div>
          <div class="header-actions">${renderHeaderActions()}</div>
        </div>
        <div class="issue-summary-grid">
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--brand);--tint:var(--brand-soft)">${icon("shield")}</span><span class="summary-copy"><strong>${roleCounts.hq}</strong><span>总经理</span></span></article>
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--blue);--tint:var(--blue-soft)">${icon("clipboard")}</span><span class="summary-copy"><strong>${roleCounts.supervisor}</strong><span>督导</span></span></article>
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--green);--tint:var(--green-soft)">${icon("store")}</span><span class="summary-copy"><strong>${roleCounts.store}</strong><span>门店人员</span></span></article>
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--orange);--tint:var(--orange-soft)">${icon("clock")}</span><span class="summary-copy"><strong>${state.accounts.filter((item) => item.status === "待启用").length}</strong><span>待启用</span></span></article>
        </div>
        <div class="data-panel">
          <div class="data-panel-toolbar">
            <div class="data-panel-toolbar-copy"><h3>人员账号</h3><p>账号状态和门店绑定关系</p></div>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead><tr><th>人员</th><th>角色</th><th>手机号/登录账号</th><th>门店/区域</th><th>状态</th><th>操作</th></tr></thead>
              <tbody>
                ${state.accounts
                  .map(
                    (account) => `
                      <tr style="cursor:default">
                        <td><div class="person-cell">${renderAvatar(
                          account.name,
                          account.role === "门店人员"
                            ? "avatar-green"
                            : account.role === "督导"
                              ? "avatar-blue"
                              : "",
                        )}<strong>${escapeHtml(account.name)}</strong></div></td>
                        <td><span class="badge ${
                          account.role === "总经理"
                            ? "purple"
                            : account.role === "督导"
                              ? "info"
                              : "success"
                        }">${escapeHtml(account.role)}</span></td>
                        <td>${escapeHtml(account.phone)}</td>
                        <td>${escapeHtml(account.store)}</td>
                        <td><span class="badge ${
                          account.status === "启用" ? "success" : "warning"
                        }">${escapeHtml(account.status)}</span></td>
                        <td><button class="button button-secondary button-sm" data-action="toggle-account" data-account-id="${
                          account.id
                        }">${account.status === "启用" ? "停用" : "启用"}</button></td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  function renderManagementPage() {
    const reviewTasks = state.tasks.filter(
      (task) =>
        task.status === "submitted" ||
        task.reviewStatus === "pending_review",
    );
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">Operations control</div>
            <h1>管理中心</h1>
            <p>统一处理任务下发、完成审核、账号与门店配置，并管理应用版本。</p>
          </div>
          <div class="header-actions">${renderHeaderActions()}</div>
        </div>
        <div class="issue-summary-grid">
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--purple);--tint:var(--purple-soft)">${icon("check-circle")}</span><span class="summary-copy"><strong>${reviewTasks.length}</strong><span>待审核任务</span></span></article>
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--blue);--tint:var(--blue-soft)">${icon("list-checks")}</span><span class="summary-copy"><strong>${state.tasks.length}</strong><span>任务总数</span></span></article>
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--green);--tint:var(--green-soft)">${icon("user")}</span><span class="summary-copy"><strong>${state.accounts.length}</strong><span>人员账号</span></span></article>
          <article class="summary-card"><span class="summary-icon" style="--accent:var(--orange);--tint:var(--orange-soft)">${icon("refresh")}</span><span class="summary-copy"><strong>${APP_VERSION}</strong><span>当前应用版本</span></span></article>
        </div>
        <div class="report-summary">
          <section class="panel ranking-panel">
            <div class="panel-header" style="padding:0">
              <div class="panel-heading"><h3>任务审核</h3><p>完成情况需由总经理审核后关闭</p></div>
              <span class="badge ${reviewTasks.length ? "purple" : "success"}">${reviewTasks.length ? "待处理" : "已清空"}</span>
            </div>
            <div class="ranking-list">
              ${
                reviewTasks.length
                  ? reviewTasks
                      .map((task) => {
                        const store = storeById(task.storeId);
                        return `
                          <div class="ranking-row">
                            <span class="rank-number">${icon("clipboard", "icon-sm")}</span>
                            <span class="ranking-copy"><strong>${escapeHtml(
                              task.title,
                            )}</strong><span>${escapeHtml(
                              store?.name || "督导任务",
                            )} · ${escapeHtml(task.inspector)}</span></span>
                            <button class="button button-primary button-sm" data-action="review-task" data-task-id="${
                              task.id
                            }">审核</button>
                          </div>
                        `;
                      })
                      .join("")
                  : `<div class="empty-state" style="min-height:180px"><div class="empty-icon">${icon("check-circle")}</div><strong>暂无待审核任务</strong><p>督导或门店完成并提交后会显示在这里。</p></div>`
              }
            </div>
          </section>
          <section class="panel insight-card">
            <div class="panel-header" style="padding:0">
              <div class="panel-heading"><h3>管理入口</h3><p>常用配置与系统能力</p></div>
            </div>
            <div class="insight-list">
              <button class="insight-item" data-action="navigate" data-page="store-settings"><span class="insight-number">1</span><p><strong>门店设置</strong><br>营业时间、状态与门店资料</p></button>
              <button class="insight-item" data-action="navigate" data-page="accounts"><span class="insight-number">2</span><p><strong>人员账号设置</strong><br>总部、督导、门店人员与门店绑定</p></button>
              <button class="insight-item" data-action="check-update"><span class="insight-number">3</span><p><strong>应用更新中心</strong><br>检测新版本并让在线用户自动刷新</p></button>
              <a class="insight-item" href="./xundian-cloud.apk" download><span class="insight-number">4</span><p><strong>Android 安装包</strong><br>下载 APK 安装到 Android 手机</p></a>
            </div>
          </section>
        </div>
      </section>
    `;
  }

  function templateColor(color) {
    const colors = {
      brand: ["var(--brand)", "var(--brand-soft)"],
      yellow: ["#c58c05", "var(--yellow-soft)"],
      green: ["var(--green)", "var(--green-soft)"],
      blue: ["var(--blue)", "var(--blue-soft)"],
    };
    return colors[color] || colors.brand;
  }

  function renderTemplatesPage() {
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">Inspection templates</div>
            <h1>巡检标准</h1>
            <p>25 项门店运营标准分为卫生、商品、人员、氛围与安全，不符合项自动下发整改。</p>
          </div>
          <div class="header-actions">${renderHeaderActions()}</div>
        </div>

        <div class="template-grid">
          ${state.templates
            .map((template) => {
              const [color, tint] = templateColor(template.color);
              const itemCount = getTemplateItems(template).length;
              const usageRate = Math.min(100, template.usage * 2);
              return `
                <article class="template-card" style="--accent: ${color}; --tint: ${tint}">
                  <span class="template-icon">${icon(template.icon)}</span>
                  <h3>${escapeHtml(template.name)}</h3>
                  <p>${escapeHtml(template.description)}</p>
                  <div class="template-meta">
                    <span>${icon("list-checks", "icon-sm")} ${itemCount} 项检查</span>
                    <span>${icon("layout", "icon-sm")} ${template.categories.length} 个分类</span>
                    <span>${escapeHtml(template.version)}</span>
                  </div>
                  <div class="template-card-footer">
                    <div class="template-progress">
                      <div class="template-progress-label"><span>本月使用</span><span>${template.usage} 次</span></div>
                      <div class="progress-line"><span style="width: ${usageRate}%"></span></div>
                    </div>
                    <button class="button button-secondary button-sm" data-action="open-template" data-template-id="${template.id}">
                      查看检查项
                    </button>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderReportPage() {
    const sortedStores = state.stores.slice().sort((a, b) => b.score - a.score);
    const categoryCounts = [
      { name: "运营安全", count: 8, color: "var(--red)" },
      { name: "商品陈列", count: 7, color: "var(--orange)" },
      { name: "门店形象", count: 5, color: "var(--brand)" },
      { name: "服务体验", count: 4, color: "var(--blue)" },
    ];
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">Performance analytics</div>
            <h1>数据报表</h1>
            <p>洞察门店表现、问题分布与整改进度，为下一轮运营动作提供依据。</p>
          </div>
          <div class="header-actions">
            <select class="form-control" style="height: 40px; min-width: 116px" data-action="report-period">
              <option value="month" ${ui.reportPeriod === "month" ? "selected" : ""}>本月数据</option>
              <option value="quarter" ${ui.reportPeriod === "quarter" ? "selected" : ""}>本季度</option>
              <option value="year" ${ui.reportPeriod === "year" ? "selected" : ""}>本年度</option>
            </select>
            ${renderHeaderActions()}
          </div>
        </div>

        <div class="report-summary">
          <section class="panel trend-panel">
            <div class="panel-header" style="padding: 0">
              <div class="panel-heading">
                <h3>门店评分趋势</h3>
                <p>近 7 次巡检平均得分</p>
              </div>
              <span class="badge success">持续提升</span>
            </div>
            <div class="trend-chart">
              <div class="trend-chart-grid"><i></i><i></i><i></i><i></i></div>
              <svg class="trend-svg" viewBox="0 0 600 180" preserveAspectRatio="none" role="img" aria-label="门店评分上升趋势">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#ff5a3d" stop-opacity=".22"/>
                    <stop offset="1" stop-color="#ff5a3d" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path class="area" d="M0 145C45 141 62 127 100 128S155 111 200 112 257 95 300 98 351 76 400 80 457 61 500 58 556 43 600 33V180H0Z"/>
                <path class="line" d="M0 145C45 141 62 127 100 128S155 111 200 112 257 95 300 98 351 76 400 80 457 61 500 58 556 43 600 33"/>
                <circle class="dot" cx="100" cy="128" r="5"/>
                <circle class="dot" cx="200" cy="112" r="5"/>
                <circle class="dot" cx="300" cy="98" r="5"/>
                <circle class="dot" cx="400" cy="80" r="5"/>
                <circle class="dot" cx="500" cy="58" r="5"/>
                <circle class="dot" cx="600" cy="33" r="5"/>
              </svg>
              <div class="trend-labels"><span>11/04</span><span>11/08</span><span>11/12</span><span>11/16</span><span>11/20</span><span>11/25</span></div>
            </div>
          </section>

          <section class="panel category-chart">
            <div class="panel-header" style="padding: 0">
              <div class="panel-heading">
                <h3>问题类型分布</h3>
                <p>本月共记录 24 项问题</p>
              </div>
            </div>
            <div class="category-list">
              ${categoryCounts
                .map(
                  (category) => `
                    <div class="category-row">
                      <div class="category-row-label"><span>${category.name}</span><span>${category.count} 项</span></div>
                      <div class="category-track"><span style="width: ${
                        (category.count / 10) * 100
                      }%; --accent: ${category.color}"></span></div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </section>
        </div>

        <div class="report-bottom">
          <section class="panel ranking-panel">
            <div class="panel-header" style="padding: 0">
              <div class="panel-heading">
                <h3>门店表现排行</h3>
                <p>最新一次综合巡检得分</p>
              </div>
              <button class="panel-link" data-action="export-report">导出 ${icon("download", "icon-sm")}</button>
            </div>
            <div class="ranking-list">
              ${sortedStores
                .map(
                  (store, index) => `
                    <div class="ranking-row">
                      <span class="rank-number">${index + 1}</span>
                      <span class="ranking-copy"><strong>${escapeHtml(
                        store.name,
                      )}</strong><span>${escapeHtml(
                        store.manager,
                      )} · ${store.issues} 项待整改</span></span>
                      <span class="ranking-score">${store.score}</span>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </section>

          <section class="panel insight-card">
            <div class="panel-header" style="padding: 0">
              <div class="panel-heading">
                <h3>本周运营洞察</h3>
                <p>根据巡检与整改数据生成</p>
              </div>
              <span class="summary-icon" style="--accent: #c58c05; --tint: var(--yellow-soft)">${icon(
                "sparkle",
              )}</span>
            </div>
            <div class="insight-list">
              <div class="insight-item"><span class="insight-number">1</span><p><strong>陈列质量改善明显。</strong>主推款完整度较上周提升 11%，万象城店表现最佳。</p></div>
              <div class="insight-item"><span class="insight-number">2</span><p><strong>运营安全仍是首要风险。</strong>本周 8 项问题来自消防与后场，建议做专项培训。</p></div>
              <div class="insight-item"><span class="insight-number">3</span><p><strong>湖滨银泰店整改偏慢。</strong>平均关闭时长 3.8 天，高于区域均值 1.7 天。</p></div>
            </div>
          </section>
        </div>
      </section>
    `;
  }

  function renderSalesReportPage() {
    const rankedBySales = state.stores
      .slice()
      .sort((a, b) => b.sales - a.sales);
    const rankedByGross = state.stores
      .slice()
      .sort((a, b) => b.grossProfit - a.grossProfit);
    const marginGroups = [
      {
        name: "≥35% 优",
        count: state.stores.filter((store) => store.margin >= 35).length,
        color: "var(--green)",
      },
      {
        name: "25–35% 关注",
        count: state.stores.filter(
          (store) => store.margin >= 25 && store.margin < 35,
        ).length,
        color: "var(--orange)",
      },
      {
        name: "<25% 预警",
        count: state.stores.filter((store) => store.margin < 25).length,
        color: "var(--red)",
      },
    ];
    const maxSales = Math.max(...state.stores.map((store) => store.sales));
    const marginRate = totalSales()
      ? (totalGrossProfit() / totalSales()) * 100
      : 0;
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">Business analytics</div>
            <h1>经营报表</h1>
            <p>商丘区域 10 家门店 · 2026 年 11 月 24 日销售、毛利与巡店质量。</p>
          </div>
          <div class="header-actions">
            <select class="form-control" style="height: 40px; min-width: 126px" data-action="report-period">
              <option value="day">11月24日</option>
              <option value="month" ${ui.reportPeriod === "month" ? "selected" : ""}>本月累计</option>
              <option value="quarter">本季度</option>
            </select>
            ${renderHeaderActions()}
          </div>
        </div>

        <div class="issue-summary-grid">
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--brand); --tint: var(--brand-soft)">${icon("trending")}</span>
            <span class="summary-copy"><strong style="font-size:15px">${formatMoney(totalSales())}</strong><span>昨日总销售额</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--green); --tint: var(--green-soft)">${icon("chart")}</span>
            <span class="summary-copy"><strong style="font-size:15px">${formatMoney(totalGrossProfit())}</strong><span>昨日总毛利额</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--blue); --tint: var(--blue-soft)">${icon("store")}</span>
            <span class="summary-copy"><strong>${state.stores.reduce((total, store) => total + store.newCustomers, 0)}</strong><span>昨日新增会员</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--purple); --tint: var(--purple-soft)">${icon("award")}</span>
            <span class="summary-copy"><strong>${marginRate.toFixed(
              1,
            )}%</strong><span>综合毛利率</span></span>
          </article>
        </div>

        <div class="report-summary">
          <section class="panel ranking-panel">
            <div class="panel-header" style="padding: 0">
              <div class="panel-heading">
                <h3>昨日销售额排行</h3>
                <p>10 家门店 · 按销售额降序</p>
              </div>
              <span class="badge info">2026-11-24</span>
            </div>
            <div class="ranking-list">
              ${rankedBySales
                .map(
                  (store, index) => `
                    <div class="ranking-row">
                      <span class="rank-number">${index + 1}</span>
                      <span class="ranking-copy">
                        <strong>${escapeHtml(store.name)}</strong>
                        <span>毛利 ${formatMoney(store.grossProfit)} · 毛利率 ${store.margin.toFixed(
                          2,
                        )}%</span>
                      </span>
                      <span class="ranking-score">${formatMoney(
                        store.sales,
                      )}</span>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </section>

          <section class="panel category-chart">
            <div class="panel-header" style="padding: 0">
              <div class="panel-heading">
                <h3>销售贡献</h3>
                <p>各门店占区域昨日销售额比例</p>
              </div>
            </div>
            <div class="category-list">
              ${rankedBySales
                .slice(0, 8)
                .map(
                  (store) => `
                    <div class="category-row">
                      <div class="category-row-label"><span>${escapeHtml(
                        store.short,
                      )}</span><span>${(
                        (store.sales / totalSales()) *
                        100
                      ).toFixed(1)}%</span></div>
                      <div class="category-track"><span style="width: ${
                        (store.sales / maxSales) * 100
                      }%; --accent: var(--brand)"></span></div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </section>
        </div>

        <div class="report-bottom">
          <section class="panel ranking-panel">
            <div class="panel-header" style="padding: 0">
              <div class="panel-heading">
                <h3>毛利额排行</h3>
                <p>高销售不等于高毛利，重点关注销售与毛利差异</p>
              </div>
              <button class="panel-link" data-action="export-report">导出 ${icon("download", "icon-sm")}</button>
            </div>
            <div class="ranking-list">
              ${rankedByGross
                .slice(0, 6)
                .map(
                  (store, index) => `
                    <div class="ranking-row">
                      <span class="rank-number">${index + 1}</span>
                      <span class="ranking-copy"><strong>${escapeHtml(
                        store.name,
                      )}</strong><span>销售额 ${formatMoney(
                        store.sales,
                      )}</span></span>
                      <span class="ranking-score">${formatMoney(
                        store.grossProfit,
                      )}</span>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </section>

          <section class="panel insight-card">
            <div class="panel-header" style="padding: 0">
              <div class="panel-heading">
                <h3>经营洞察</h3>
                <p>根据 10 家门店日经营数据生成</p>
              </div>
              <span class="summary-icon" style="--accent: #c58c05; --tint: var(--yellow-soft)">${icon(
                "sparkle",
              )}</span>
            </div>
            <div class="insight-list">
              <div class="insight-item"><span class="insight-number">1</span><p><strong>尚都国际店销售与毛利双第一。</strong>日销售 ${formatMoney(
                3409.43,
              )}，毛利 ${formatMoney(952.51)}。</p></div>
              <div class="insight-item"><span class="insight-number">2</span><p><strong>睢县解放路店毛利率最高。</strong>毛利率 58.10%，但销售额仍有提升空间。</p></div>
              <div class="insight-item"><span class="insight-number">3</span><p><strong>${
                marginGroups[0].count
              } 家门店毛利率达到 35% 以上。</strong>华夏路店和金色福园店同比下降较多，需关注客流与商品结构。</p></div>
            </div>
          </section>
        </div>
      </section>
    `;
  }

  function renderApprovalsPage() {
    const allApprovals = state.approvals || [];
    const approvals = allApprovals.filter(
      (item) =>
        ui.approvalFilter === "all" || item.status === ui.approvalFilter,
    );
    const counts = {
      pending: allApprovals.filter((item) => item.status === "pending").length,
      approved: allApprovals.filter((item) => item.status === "approved").length,
      rejected: allApprovals.filter((item) => item.status === "rejected").length,
    };
    return `
      <section>
        <div class="page-header">
          <div class="page-heading">
            <div class="eyebrow">Account approval</div>
            <h1>账号审批</h1>
            <p>员工首次使用需提交进入申请。审批通过后绑定角色与门店，下次自动进入。</p>
          </div>
          <div class="header-actions">${renderHeaderActions()}</div>
        </div>

        <div class="issue-summary-grid">
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--orange); --tint: var(--orange-soft)">${icon("clock")}</span>
            <span class="summary-copy"><strong>${counts.pending}</strong><span>待审批</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--green); --tint: var(--green-soft)">${icon("check-circle")}</span>
            <span class="summary-copy"><strong>${counts.approved}</strong><span>已通过</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--red); --tint: var(--red-soft)">${icon("x-circle")}</span>
            <span class="summary-copy"><strong>${counts.rejected}</strong><span>已拒绝</span></span>
          </article>
          <article class="summary-card">
            <span class="summary-icon" style="--accent: var(--blue); --tint: var(--blue-soft)">${icon("user")}</span>
            <span class="summary-copy"><strong>${approvals.length}</strong><span>累计申请</span></span>
          </article>
        </div>

        <div class="data-panel">
          <div class="data-panel-toolbar">
            <div class="data-panel-toolbar-copy">
              <h3>进入申请</h3>
              <p>审核账号角色、所属门店与申请时间</p>
            </div>
            <div class="chips">
              <button class="chip ${
                ui.approvalFilter === "all" ? "active" : ""
              }" data-action="filter-approvals" data-filter="all">全部</button>
              <button class="chip ${
                ui.approvalFilter === "pending" ? "active" : ""
              }" data-action="filter-approvals" data-filter="pending">待审批</button>
              <button class="chip ${
                ui.approvalFilter === "approved" ? "active" : ""
              }" data-action="filter-approvals" data-filter="approved">已通过</button>
            </div>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>申请人</th>
                  <th>申请角色</th>
                  <th>所属门店</th>
                  <th>申请时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                ${
                  approvals.length
                    ? approvals
                        .map((item) => {
                          const badge =
                            item.status === "pending"
                              ? "warning"
                              : item.status === "approved"
                                ? "success"
                                : "urgent";
                          const label =
                            item.status === "pending"
                              ? "待审批"
                              : item.status === "approved"
                                ? "已通过"
                                : "已拒绝";
                          return `
                            <tr style="cursor:default">
                              <td><div class="person-cell">${renderAvatar(
                                item.name,
                                "avatar-blue",
                              )}<strong>${escapeHtml(item.name)}</strong></div></td>
                              <td>${escapeHtml(item.requestedRole)}</td>
                              <td>${escapeHtml(item.store)}</td>
                              <td>${escapeHtml(item.createdAt)}</td>
                              <td><span class="badge ${badge}">${label}</span></td>
                              <td>
                                ${
                                  item.status === "pending"
                                    ? `<div style="display:flex;gap:6px">
                                        <button class="button button-success button-sm" data-action="approve-account" data-approval-id="${item.id}">通过</button>
                                        <button class="button button-danger button-sm" data-action="reject-account" data-approval-id="${item.id}">拒绝</button>
                                      </div>`
                                    : `<span style="color:var(--ink-faint)">已处理</span>`
                                }
                              </td>
                            </tr>
                          `;
                        })
                        .join("")
                    : `<tr><td colspan="6"><div class="empty-state" style="min-height:180px"><div class="empty-icon">${icon(
                        "check-circle",
                      )}</div><strong>暂无申请</strong><p>新的账号进入申请会显示在这里。</p></div></td></tr>`
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  function renderDesktopPage() {
    const pages = {
      overview: renderOverviewPage,
      tasks: renderTasksPage,
      issues: renderIssuesPage,
      stores: renderStoresPage,
      "store-settings": renderStoreSettingsPage,
      accounts: renderAccountsPage,
      management: renderManagementPage,
      templates: renderTemplatesPage,
      reports: renderSalesReportPage,
      approvals: renderApprovalsPage,
    };
    return `
      <div class="app-shell">
        ${renderSidebar()}
        <div class="main-shell">
          ${renderTopbar()}
          <main class="content">${(pages[state.page] || renderOverviewPage)()}</main>
        </div>
        ${renderMobileNav()}
      </div>
    `;
  }

  function mobileTasksForStore() {
    return state.tasks.filter((task) => task.storeId === state.storeId);
  }

  function mobileStoreOperationalTasks() {
    return state.tasks.filter(
      (task) =>
        task.storeId === state.storeId && task.assigneeRole === "store",
    );
  }

  function mobileIssuesForStore() {
    return state.issues.filter(
      (issue) => issue.storeId === state.storeId && issue.status !== "closed",
    );
  }

  function renderMobileHome() {
    const store = storeById(state.storeId);
    const issues = mobileIssuesForStore();
    return `
      <div class="store-mobile-content">
        <div class="mobile-greeting">
          <h1>下午好，门店伙伴</h1>
          <p>${escapeHtml(store.name)} · 门店人员统一工作台</p>
        </div>

        <section class="mobile-score-card">
          <div class="mobile-score-top">
            <span>本月门店运营得分</span>
            <span class="badge no-dot">${store.score >= 88 ? "表现优秀" : "持续改善中"}</span>
          </div>
          <div class="mobile-score-value"><strong>${store.score}</strong><span>/ 100</span></div>
          <div class="mobile-score-meta">
            <span>较上期<strong>+${Math.max(1, store.trend)} 分</strong></span>
            <span>区域排名<strong>第 2 名</strong></span>
          </div>
        </section>

        <section class="mobile-section">
          <div class="mobile-section-title"><h2>快捷操作</h2></div>
          <div class="mobile-quick-grid">
            <button class="mobile-quick" data-action="mobile-submit-issue">
              <span class="mobile-quick-icon" style="--accent: var(--brand); --tint: var(--brand-soft)">${icon(
                "camera",
                "icon-sm",
              )}</span>
              提交整改
            </button>
            <button class="mobile-quick" data-action="mobile-tab" data-mobile-tab="tasks">
              <span class="mobile-quick-icon" style="--accent: var(--green); --tint: var(--green-soft)">${icon(
                "list-checks",
                "icon-sm",
              )}</span>
              运营任务
            </button>
            <button class="mobile-quick" data-action="mobile-message">
              <span class="mobile-quick-icon" style="--accent: var(--blue); --tint: var(--blue-soft)">${icon(
                "message",
                "icon-sm",
              )}</span>
              异常报备
            </button>
          </div>
        </section>

        <section class="mobile-section">
          <div class="mobile-section-title">
            <h2>门店任务 · ${mobileStoreOperationalTasks().filter((task) => !["completed", "submitted"].includes(task.status)).length}</h2>
            <button data-action="mobile-tab" data-mobile-tab="tasks">查看全部</button>
          </div>
          ${
            mobileStoreOperationalTasks().length
              ? mobileStoreOperationalTasks()
                  .slice(0, 2)
                  .map(
                    (task) => `
                      <article class="mobile-issue-card" data-action="${
                        ["pending", "in_progress", "rejected"].includes(
                          task.status,
                        )
                          ? "execute-task"
                          : "task-detail"
                      }" data-task-id="${task.id}">
                        <div class="mobile-issue-head"><strong>${escapeHtml(
                          task.title,
                        )}</strong><span class="badge ${
                          statusMeta(task.status).className
                        }">${statusMeta(task.status).label}</span></div>
                        <div class="mobile-issue-meta"><span>${escapeHtml(
                          taskTypeLabel(task),
                        )} · ${escapeHtml(task.createdBy || "总经理")}下发</span><span>${escapeHtml(
                          task.dueLabel,
                        )}</span></div>
                      </article>
                    `,
                  )
                  .join("")
              : `<div class="mobile-issue-card"><div class="mobile-issue-head"><strong>暂无门店运营任务</strong></div><div class="mobile-issue-meta"><span>总经理下发后会显示在这里</span>${icon(
                  "check-circle",
                  "icon-sm",
                )}</div></div>`
          }
        </section>

        <section class="mobile-section">
          <div class="mobile-section-title">
            <h2>待整改 · ${issues.length}</h2>
            <button data-action="mobile-tab" data-mobile-tab="issues">查看全部</button>
          </div>
          ${
            issues.length
              ? issues
                  .slice(0, 2)
                  .map(
                    (issue) => `
                      <article class="mobile-issue-card" data-action="open-issue" data-issue-id="${issue.id}">
                        <div class="mobile-issue-head">
                          <span class="severity ${issue.severity}">${severityLabel(
                            issue.severity,
                          )}</span>
                          <strong>${escapeHtml(issue.title)}</strong>
                        </div>
                        <div class="mobile-issue-meta">
                          <span>${escapeHtml(issue.id)} · ${escapeHtml(
                            issue.category,
                          )}</span>
                          <span class="due-date ${
                            issue.overdue ? "overdue" : ""
                          }">${icon("clock", "icon-sm")} ${escapeHtml(
                            issue.due,
                          )}</span>
                        </div>
                      </article>
                    `,
                  )
                  .join("")
              : `<div class="mobile-issue-card"><div class="mobile-issue-head"><strong>当前没有待整改问题</strong></div><div class="mobile-issue-meta"><span>门店状态很好，继续保持</span>${icon(
                  "check-circle",
                  "icon-sm",
                )}</div></div>`
          }
        </section>

        <section class="mobile-section">
          <div class="mobile-section-title">
            <h2>最近巡检</h2>
            <button data-action="mobile-tab" data-mobile-tab="history">全部记录</button>
          </div>
          ${mobileTasksForStore()
            .slice(-2)
            .reverse()
            .map(
              (task) => `
                <div class="mobile-history-row">
                  <span class="history-score">${task.resultScore || "—"}</span>
                  <span class="history-copy"><strong>${escapeHtml(
                    task.title,
                  )}</strong><span>${escapeHtml(
                    task.completedAt || task.dueLabel,
                  )} · ${escapeHtml(task.inspector)}</span></span>
                  ${icon("chevron", "icon-sm")}
                </div>
              `,
            )
            .join("")}
        </section>
      </div>
    `;
  }

  function renderMobileIssues() {
    const issues = state.issues.filter(
      (issue) => issue.storeId === state.storeId,
    );
    return `
      <div class="store-mobile-content">
        <div class="mobile-greeting">
          <h1>问题整改</h1>
          <p>上传整改凭证，提交后由督导复核关闭</p>
        </div>
        <section class="mobile-section" style="margin-top: 4px">
          ${
            issues.length
              ? issues
                  .map(
                    (issue) => `
                      <article class="mobile-issue-card" data-action="open-issue" data-issue-id="${issue.id}">
                        <div class="mobile-issue-head">
                          <span class="severity ${issue.severity}">${severityLabel(
                            issue.severity,
                          )}</span>
                          <strong>${escapeHtml(issue.title)}</strong>
                        </div>
                        <div class="mobile-issue-meta">
                          <span class="badge ${statusMeta(issue.status).className}">${
                            statusMeta(issue.status).label
                          }</span>
                          <span>${escapeHtml(issue.due)}</span>
                        </div>
                      </article>
                    `,
                  )
                  .join("")
              : `<div class="mobile-placeholder"><div class="empty-icon">${icon(
                  "check-circle",
                )}</div><h2>全部整改完成</h2><p>当前门店没有待处理问题。</p></div>`
          }
        </section>
      </div>
    `;
  }

  function renderMobileTaskCenter() {
    const tasks = mobileStoreOperationalTasks();
    return `
      <div class="store-mobile-content">
        <div class="mobile-greeting">
          <h1>门店任务</h1>
          <p>只按所属门店接收任务，不区分店长和导购</p>
        </div>
        <section class="mobile-section" style="margin-top:4px">
          ${
            tasks.length
              ? tasks
                  .map(
                    (task) => `
                      <article class="mobile-issue-card" data-action="${
                        ["pending", "in_progress", "rejected"].includes(
                          task.status,
                        )
                          ? "execute-task"
                          : "task-detail"
                      }" data-task-id="${task.id}">
                        <div class="mobile-issue-head">
                          <strong>${escapeHtml(task.title)}</strong>
                          <span class="badge ${
                            statusMeta(task.status).className
                          }">${statusMeta(task.status).label}</span>
                        </div>
                        <div class="mobile-issue-meta">
                          <span>${escapeHtml(taskTypeLabel(task))} · ${escapeHtml(
                            task.createdBy || "总经理",
                          )}下发</span>
                          <span>${icon("clock", "icon-sm")} ${escapeHtml(
                            task.dueLabel,
                          )}</span>
                        </div>
                        <p class="detail-copy" style="margin-top:9px;font-size:9px">${escapeHtml(
                          task.description || "按任务要求完成并提交",
                        )}</p>
                        <div class="mobile-task-action">${
                          ["pending", "in_progress", "rejected"].includes(
                            task.status,
                          )
                            ? "点击处理任务 →"
                            : "点击查看完成结果 →"
                        }</div>
                      </article>
                    `,
                  )
                  .join("")
              : `<div class="mobile-placeholder"><div class="empty-icon">${icon(
                  "list-checks",
                )}</div><h2>暂无门店任务</h2><p>总经理下发运营任务后会显示在这里。</p></div>`
          }
        </section>
      </div>
    `;
  }

  function renderMobileHistory() {
    const tasks = mobileTasksForStore();
    return `
      <div class="store-mobile-content">
        <div class="mobile-greeting">
          <h1>巡检记录</h1>
          <p>查看门店历次巡检、得分与整改状态</p>
        </div>
        <section class="mobile-section" style="margin-top: 4px">
          ${
            tasks.length
              ? tasks
                  .map(
                    (task) => `
                      <button class="mobile-history-row" style="width: 100%; text-align: left" data-action="${
                        task.status === "completed"
                          ? "view-inspection"
                          : "open-inspection"
                      }" data-task-id="${task.id}">
                        <span class="history-score" style="${
                          task.status !== "completed"
                            ? "color: var(--orange); background: var(--orange-soft)"
                            : ""
                        }">${task.resultScore || "待"}</span>
                        <span class="history-copy"><strong>${escapeHtml(
                          task.title,
                        )}</strong><span>${escapeHtml(
                          task.completedAt || task.dueLabel,
                        )} · ${statusMeta(task.status).label}</span></span>
                        ${icon("chevron", "icon-sm")}
                      </button>
                    `,
                  )
                  .join("")
              : `<div class="mobile-placeholder"><div class="empty-icon">${icon(
                  "calendar",
                )}</div><h2>暂无巡检记录</h2><p>完成第一次巡检后，报告会出现在这里。</p></div>`
          }
        </section>
      </div>
    `;
  }

  function renderMobileProfile() {
    const store = storeById(state.storeId);
    return `
      <div class="store-mobile-content">
        <div class="mobile-greeting">
          <h1>门店档案</h1>
          <p>基本资料与运营负责人</p>
        </div>
        <section class="mobile-issue-card" style="margin-top: 4px; padding: 17px">
          <div class="mobile-issue-head"><strong style="font-size: 15px">${escapeHtml(
            store.name,
          )}</strong>${riskBadge(store.risk)}</div>
          <div class="detail-grid" style="margin-top: 16px; margin-bottom: 0">
            <div class="detail-cell"><span>门店编号</span><strong>${store.id.toUpperCase()}</strong></div>
            <div class="detail-cell"><span>所在城市</span><strong>${escapeHtml(
              store.city,
            )}</strong></div>
            <div class="detail-cell"><span>门店人员</span><strong>${escapeHtml(
              store.manager,
            )}</strong></div>
            <div class="detail-cell"><span>负责督导</span><strong>${escapeHtml(
              store.inspector,
            )}</strong></div>
          </div>
          <div class="detail-cell" style="margin-top: 10px"><span>门店地址</span><strong>${escapeHtml(
            store.address,
          )}</strong></div>
        </section>
        <section class="mobile-section">
          <div class="mobile-section-title"><h2>运营数据</h2></div>
          <div class="mobile-quick-grid">
            <div class="mobile-quick"><strong style="font-size: 19px">${store.score}</strong>门店得分</div>
            <div class="mobile-quick"><strong style="font-size: 19px">${store.issues}</strong>待整改</div>
            <div class="mobile-quick"><strong style="font-size: 19px">${tasksForCompletedCount(
              store.id,
            )}</strong>已完成巡检</div>
          </div>
        </section>
      </div>
    `;
  }

  function tasksForCompletedCount(storeId) {
    return state.tasks.filter(
      (task) => task.storeId === storeId && task.status === "completed",
    ).length;
  }

  function renderMobileTabs() {
    const tabs = [
      { id: "home", label: "首页", icon: "home" },
      { id: "tasks", label: "任务", icon: "list-checks" },
      { id: "issues", label: "整改", icon: "alert" },
      { id: "profile", label: "我的", icon: "user" },
    ];
    return `
      <nav class="mobile-tabbar">
        ${tabs
          .map(
            (tab) => `
              <button class="mobile-tab ${
                ui.mobileTab === tab.id ? "active" : ""
              }" data-action="mobile-tab" data-mobile-tab="${tab.id}">
                ${icon(tab.icon)}
                <span>${tab.label}</span>
              </button>
            `,
          )
          .join("")}
      </nav>
    `;
  }

  function renderStorePortal() {
    const store = storeById(state.storeId);
    const page =
      ui.mobileTab === "tasks"
        ? renderMobileTaskCenter()
        : ui.mobileTab === "issues"
          ? renderMobileIssues()
          : ui.mobileTab === "history"
            ? renderMobileHistory()
            : ui.mobileTab === "profile"
              ? renderMobileProfile()
              : renderMobileHome();
    return `
      <div class="store-portal-wrap">
        <div class="store-portal-role" style="position: fixed; top: 22px; right: 24px; z-index: 20">
          ${renderRoleSelect()}
        </div>
        <div class="phone-shell">
          <div class="phone-screen">
            <div class="store-mobile">
              <header class="store-mobile-header">
                <div class="store-mobile-brand">${icon("check-circle", "icon-sm")}</div>
                <div class="store-mobile-heading">
                  <strong>${escapeHtml(store.name)}</strong>
                  <span>门店人员工作台 · 今日任务</span>
                </div>
                ${renderAvatar(store.manager, "avatar-pink")}
              </header>
              ${page}
            </div>
            ${renderMobileTabs()}
          </div>
        </div>
      </div>
    `;
  }

  function renderApp() {
    const root = document.getElementById("app");
    root.innerHTML =
      state.role === "store" ? renderStorePortal() : renderDesktopPage();
    root.setAttribute("aria-busy", "false");
  }

  let updateCheckInFlight = false;
  async function checkForAppUpdate(manual = false) {
    if (updateCheckInFlight) return;
    updateCheckInFlight = true;
    try {
      const response = await fetch(`./version.json?t=${Date.now()}`, {
        cache: "no-store",
      });
      const release = await response.json();
      if (release.version && release.version !== APP_VERSION) {
        showToast(`发现新版本 ${release.version}，正在自动更新`);
        localStorage.setItem(
          "xundian-last-release",
          JSON.stringify(release),
        );
        const channel = new BroadcastChannel("xundian-app-update");
        channel.postMessage({ version: release.version });
        channel.close();
        window.setTimeout(() => location.reload(), 900);
        return;
      }
      if (manual) {
        showToast(`当前已是最新版本 ${APP_VERSION}`);
      }
    } catch {
      if (manual) {
        showToast("检查更新失败，请稍后重试", "error");
      }
    } finally {
      updateCheckInFlight = false;
    }
  }

  window.__xundianAppVersion = APP_VERSION;
  window.setInterval(() => checkForAppUpdate(false), 60_000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkForAppUpdate(false);
  });
  try {
    const updateChannel = new BroadcastChannel("xundian-app-update");
    updateChannel.addEventListener("message", () => location.reload());
  } catch {
    // BroadcastChannel is unavailable in some embedded browsers.
  }

  function showToast(message, type = "success") {
    const root = document.getElementById("toast-root");
    while (root.children.length >= 2) {
      root.firstElementChild?.remove();
    }
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icon(
        type === "error" ? "alert" : "check-circle",
        "icon-sm",
      )}</span>
      <span>${escapeHtml(message)}</span>
    `;
    root.appendChild(toast);
    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-8px)";
      window.setTimeout(() => toast.remove(), 220);
    }, 2800);
  }

  function closeModal() {
    document.getElementById("modal-root").innerHTML = "";
  }

  function closeDrawer() {
    document.getElementById("drawer-root").innerHTML = "";
  }

  function openRoutePlannerModal() {
    if (state.role !== "supervisor") {
      showToast("巡店路线由督导自行规划", "error");
      return;
    }
    ui.routeDraft = [...(state.route?.storeIds || [])].filter((storeId) =>
      state.stores.some((store) => store.id === storeId),
    );
    renderRoutePlannerModal();
  }

  function renderRouteOrderListMarkup() {
    if (!ui.routeDraft.length) {
      return `<div class="empty-state" style="min-height:280px"><div class="empty-icon">${icon(
        "route",
      )}</div><strong>还没有选择巡店门店</strong><p>从左侧勾选门店，再调整到访顺序。</p></div>`;
    }
    return ui.routeDraft
      .map((storeId, index) => {
        const store = storeById(storeId);
        return `
          <div class="route-order-item">
            <span class="route-number">${index + 1}</span>
            <span class="route-order-copy"><strong>${escapeHtml(
              store.name,
            )}</strong><span>${escapeHtml(store.address)}</span></span>
            <button class="icon-button" data-action="route-move-up" data-store-id="${
              store.id
            }" ${index === 0 ? "disabled" : ""}>${icon(
              "arrow-up",
              "icon-sm",
            )}</button>
            <button class="icon-button" data-action="route-move-down" data-store-id="${
              store.id
            }" ${
              index === ui.routeDraft.length - 1 ? "disabled" : ""
            }>${icon("arrow-down", "icon-sm")}</button>
            <button class="icon-button" data-action="route-remove" data-store-id="${
              store.id
            }">${icon("x", "icon-sm")}</button>
          </div>
        `;
      })
      .join("");
  }

  function refreshRoutePlannerUi() {
    document.querySelectorAll("[data-route-store-checkbox]").forEach((input) => {
      const selected = ui.routeDraft.includes(input.value);
      input.checked = selected;
      input.closest(".route-store-option")?.classList.toggle("selected", selected);
    });
    const count = document.querySelector("#routeSelectedCount");
    if (count) count.textContent = `已选择 ${ui.routeDraft.length} 家门店`;
    const list = document.querySelector("#routeOrderList");
    if (list) list.innerHTML = renderRouteOrderListMarkup();
    const save = document.querySelector('[data-action="save-route"]');
    if (save) save.disabled = ui.routeDraft.length === 0;
  }

  function renderRoutePlannerModal() {
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="routePlanTitle">
          <div class="modal-header">
            <div><div class="eyebrow">督导自主规划</div><h2 id="routePlanTitle">今日巡店路线</h2><p>选择计划到访的门店，并按实际出行顺序排列。</p></div>
            <button class="close-button" data-action="close-modal">${icon("x")}</button>
          </div>
          <div class="inspection-shell">
            <aside class="inspection-side">
              <div class="inspection-side-title">可选门店</div>
              <div class="route-store-picker">
                ${state.stores
                  .map(
                    (store) => `
                      <label class="route-store-option ${
                        ui.routeDraft.includes(store.id) ? "selected" : ""
                      }">
                        <input type="checkbox" data-route-store-checkbox value="${
                          store.id
                        }" ${
                          ui.routeDraft.includes(store.id) ? "checked" : ""
                        } />
                        <span><strong>${escapeHtml(
                          store.name,
                        )}</strong><small>${escapeHtml(
                          store.short,
                        )} · ${store.issues} 项整改</small></span>
                      </label>
                    `,
                  )
                  .join("")}
              </div>
            </aside>
            <div class="inspection-main">
              <div class="inspection-store-strip">
                <span class="store-mini-mark">${icon("route", "icon-sm")}</span>
                <span><strong id="routeSelectedCount">已选择 ${ui.routeDraft.length} 家门店</strong><span>保存后作为今日巡店顺序</span></span>
              </div>
              <div id="routeOrderList" class="route-order-list">${renderRouteOrderListMarkup()}</div>
            </div>
          </div>
          <div class="modal-footer">
            <span class="footer-info">路线由督导本人规划，不需要总经理派发</span>
            <button class="button button-secondary" data-action="close-modal">取消</button>
            <button class="button button-primary" data-action="save-route" ${
              ui.routeDraft.length ? "" : "disabled"
            }>保存路线</button>
          </div>
        </div>
      </div>
    `;
  }

  function openStartVisitModal(storeId = "", templateId = "") {
    if (state.role !== "supervisor") {
      showToast("当前阶段仅督导可主动发起巡店", "error");
      return;
    }
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="startVisitTitle">
          <div class="modal-header">
            <div>
              <div class="eyebrow">督导主动巡店</div>
              <h2 id="startVisitTitle">发起本次巡店</h2>
              <p>督导到店后现场发起，不经过总经理派单。</p>
            </div>
            <button class="close-button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
          </div>
          <form id="startVisitForm">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field full">
                  <label for="visitStore">巡店门店<em>*</em></label>
                  <select class="form-control" id="visitStore" name="storeId" required>
                    ${state.stores
                      .map(
                        (store) =>
                          `<option value="${store.id}" ${
                            store.id === storeId ? "selected" : ""
                          }>${escapeHtml(store.name)}</option>`,
                      )
                      .join("")}
                  </select>
                </div>
                <div class="form-field full">
                  <label for="visitTemplate">检查标准<em>*</em></label>
                  <select class="form-control" id="visitTemplate" name="templateId" required>
                    ${state.templates
                      .map(
                        (template) =>
                          `<option value="${template.id}" ${
                            template.id === templateId ? "selected" : ""
                          }>${escapeHtml(template.name)} · ${getTemplateItems(template).length} 项</option>`,
                      )
                      .join("")}
                  </select>
                </div>
                <div class="form-field">
                  <label for="visitDate">巡店日期</label>
                  <input class="form-control" id="visitDate" name="date" type="date" value="2026-11-25" required />
                </div>
                <div class="form-field">
                  <label for="visitTime">到店时间</label>
                  <input class="form-control" id="visitTime" name="time" type="time" value="15:30" required />
                </div>
                <div class="form-field full">
                  <label>执行督导</label>
                  <div class="inspection-store-strip" style="margin-bottom:0">
                    ${renderAvatar("黄庆", "avatar-green")}
                    <span><strong>黄庆</strong><span>商丘区域督导 · 当前账号</span></span>
                    <span class="badge info">现场发起</span>
                  </div>
                </div>
                <div class="form-field full">
                  <label for="visitNote">本次巡店备注</label>
                  <textarea class="form-control" id="visitNote" name="note" placeholder="可填写本次重点关注事项，例如：复查上次整改、检查新品陈列…"></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <span class="footer-info">发起后直接进入检查清单</span>
              <button type="button" class="button button-secondary" data-action="close-modal">取消</button>
              <button type="submit" class="button button-primary">${icon(
                "play",
                "icon-sm",
              )} 开始巡店</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function openStoreSettingModal(storeId) {
    const store = storeById(storeId);
    if (!store) return;
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="storeSettingTitle">
          <div class="modal-header">
            <div><div class="eyebrow">门店设置</div><h2 id="storeSettingTitle">${escapeHtml(
              store.name,
            )}</h2><p>门店人员按门店统一识别，不再区分店长与导购。</p></div>
            <button class="close-button" data-action="close-modal">${icon("x")}</button>
          </div>
          <form id="storeSettingForm">
            <input type="hidden" name="storeId" value="${store.id}" />
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field full"><label>门店名称</label><input class="form-control" name="name" value="${escapeHtml(
                  store.name,
                )}" required /></div>
                <div class="form-field"><label>营业状态</label><select class="form-control" name="status"><option ${
                  store.status === "营业中" ? "selected" : ""
                }>营业中</option><option ${
                  store.status !== "营业中" ? "selected" : ""
                }>暂停营业</option></select></div>
                <div class="form-field"><label>营业时间</label><input class="form-control" name="businessHours" value="${escapeHtml(
                  store.businessHours,
                )}" /></div>
                <div class="form-field"><label>门店联系人</label><input class="form-control" name="contact" value="${escapeHtml(
                  store.contact,
                )}" /></div>
                <div class="form-field"><label>门店电话</label><input class="form-control" name="phone" value="${escapeHtml(
                  store.phone || "",
                )}" placeholder="选填" /></div>
                <div class="form-field full"><label>门店地址</label><input class="form-control" name="address" value="${escapeHtml(
                  store.address,
                )}" /></div>
              </div>
            </div>
            <div class="modal-footer"><button type="button" class="button button-secondary" data-action="close-modal">取消</button><button type="submit" class="button button-primary">保存设置</button></div>
          </form>
        </div>
      </div>
    `;
  }

  function openNewStoreModal() {
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="newStoreTitle">
          <div class="modal-header">
            <div><div class="eyebrow">门店设置</div><h2 id="newStoreTitle">新增门店</h2><p>新增后可在人员账号中绑定门店人员。</p></div>
            <button class="close-button" data-action="close-modal">${icon("x")}</button>
          </div>
          <form id="newStoreForm">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field full"><label>门店名称<em>*</em></label><input class="form-control" name="name" required placeholder="例如：巴布豆商丘新门店" /></div>
                <div class="form-field"><label>所在城市</label><input class="form-control" name="city" value="商丘" /></div>
                <div class="form-field"><label>营业状态</label><select class="form-control" name="status"><option>营业中</option><option>暂停营业</option></select></div>
                <div class="form-field"><label>营业时间</label><input class="form-control" name="businessHours" value="10:00–22:00" /></div>
                <div class="form-field"><label>门店联系人</label><input class="form-control" name="contact" value="门店人员" /></div>
                <div class="form-field"><label>门店电话</label><input class="form-control" name="phone" placeholder="选填" /></div>
                <div class="form-field"><label>督导</label><input class="form-control" name="inspector" value="黄庆" /></div>
                <div class="form-field full"><label>门店地址</label><input class="form-control" name="address" required placeholder="填写商场、楼层或街道地址" /></div>
              </div>
            </div>
            <div class="modal-footer"><button type="button" class="button button-secondary" data-action="close-modal">取消</button><button type="submit" class="button button-primary">新增门店</button></div>
          </form>
        </div>
      </div>
    `;
  }

  function openDeleteStoreModal(storeId) {
    const store = storeById(storeId);
    if (!store) return;
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="deleteStoreTitle">
          <div class="modal-header">
            <div><div class="eyebrow">删除门店</div><h2 id="deleteStoreTitle">确认删除 ${escapeHtml(
              store.name,
            )}？</h2><p>该操作会同时移除该门店的任务、整改记录，并解除人员账号绑定。</p></div>
            <button class="close-button" data-action="close-modal">${icon("x")}</button>
          </div>
          <div class="modal-body">
            <div class="detail-cell" style="background:var(--red-soft)"><span>删除影响</span><strong>删除后无法在当前版本内恢复，请确认该门店已经停止运营或不再管理。</strong></div>
          </div>
          <div class="modal-footer"><button class="button button-secondary" data-action="close-modal">取消</button><button class="button button-danger" data-action="confirm-delete-store" data-store-id="${
            store.id
          }">确认删除</button></div>
        </div>
      </div>
    `;
  }

  function openAddAccountModal() {
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="addAccountTitle">
          <div class="modal-header">
            <div><div class="eyebrow">人员账号</div><h2 id="addAccountTitle">新增人员账号</h2><p>门店人员只选择所属门店，不设置店长或导购身份。</p></div>
            <button class="close-button" data-action="close-modal">${icon("x")}</button>
          </div>
          <form id="accountForm">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field"><label>姓名</label><input class="form-control" name="name" required /></div>
                <div class="form-field"><label>手机号 / 登录账号</label><input class="form-control" name="phone" required /></div>
                <div class="form-field"><label>账号角色</label><select class="form-control" name="role"><option>门店人员</option><option>督导</option><option>总经理</option></select></div>
                <div class="form-field"><label>所属门店 / 区域</label><select class="form-control" name="storeId"><option value="">全区域</option>${state.stores
                  .map(
                    (store) =>
                      `<option value="${store.id}">${escapeHtml(store.name)}</option>`,
                  )
                  .join("")}</select></div>
                <div class="form-field full"><label>初始状态</label><select class="form-control" name="status"><option>启用</option><option>待启用</option></select><div class="form-hint">门店人员账号不区分店长和导购，登录后统一进入所属门店工作台。</div></div>
              </div>
            </div>
            <div class="modal-footer"><button type="button" class="button button-secondary" data-action="close-modal">取消</button><button type="submit" class="button button-primary">新增账号</button></div>
          </form>
        </div>
      </div>
    `;
  }

  function openAssignTaskModal() {
    ui.assignTaskPhotos = [];
    const supervisors = state.accounts.filter(
      (account) => account.role === "督导" && account.status === "启用",
    );
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="assignTaskTitle">
          <div class="modal-header">
            <div><div class="eyebrow">总经理下发</div><h2 id="assignTaskTitle">下发任务</h2><p>可下发给督导执行，也可直接下发给门店完成运营任务。完成后统一由总经理审核。</p></div>
            <button class="close-button" data-action="close-modal">${icon("x")}</button>
          </div>
          <form id="assignTaskForm">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field full"><label>任务类型</label><select class="form-control" id="assignmentType" name="taskType"><option value="inspection">巡店任务 · 督导执行</option><option value="other">其他任务 · 督导执行</option><option value="operation">正常运营任务 · 门店执行</option></select></div>
                <div class="form-field"><label>执行督导</label><select class="form-control" name="supervisor">${supervisors
                  .map(
                    (account) =>
                      `<option value="${escapeHtml(account.name)}">${escapeHtml(
                        account.name,
                      )}</option>`,
                  )
                  .join("")}<option value="黄庆">黄庆</option></select></div>
                <div class="form-field"><label>任务门店</label><select class="form-control" name="storeId" required>${state.stores
                  .map(
                    (store) =>
                      `<option value="${store.id}">${escapeHtml(store.name)}</option>`,
                  )
                  .join("")}</select></div>
                <div class="form-field full"><label>任务标题</label><input class="form-control" name="title" required placeholder="例如：复查消防通道整改情况" /></div>
                <div class="form-field"><label>检查标准（巡店任务）</label><select class="form-control" name="templateId">${state.templates
                  .map(
                    (template) =>
                      `<option value="${template.id}">${escapeHtml(
                        template.name,
                      )}</option>`,
                  )
                  .join("")}</select></div>
                <div class="form-field"><label>完成期限</label><input class="form-control" type="date" name="due" value="2026-11-28" required /></div>
                <div class="form-field full"><label>任务说明</label><textarea class="form-control" name="description" placeholder="说明任务背景、完成要求和审核标准"></textarea></div>
                <div class="form-field full">
                  <label>任务说明图片</label>
                  <div class="assignment-photo-list" id="assignmentPhotoList"></div>
                  <label class="photo-upload-button" for="assignmentPhotos">
                    ${icon("image", "icon-sm")} 上传参考图片
                  </label>
                  <input class="photo-file-input" id="assignmentPhotos" type="file" accept="image/*" multiple data-assignment-photo-input />
                  <div class="form-hint">可上传陈列标准、整改示例或现场参考图，最多 3 张。</div>
                </div>
              </div>
            </div>
            <div class="modal-footer"><span class="footer-info">提交后进入执行人员任务列表</span><button type="button" class="button button-secondary" data-action="close-modal">取消</button><button type="submit" class="button button-primary">确认下发</button></div>
          </form>
        </div>
      </div>
    `;
  }

  function openExecutionTaskModal(taskId) {
    const task = taskById(taskId);
    if (!task) return;
    const store = storeById(task.storeId);
    const photoRequired = task.assigneeRole === "store";
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="executionTaskTitle">
          <div class="modal-header">
            <div><div class="eyebrow">${escapeHtml(
              taskTypeLabel(task),
            )}</div><h2 id="executionTaskTitle">${escapeHtml(
              task.title,
            )}</h2><p>${escapeHtml(store?.name || "商丘区域")} · ${escapeHtml(
              task.dueLabel,
            )}</p></div>
            <button class="close-button" data-action="close-modal">${icon("x")}</button>
          </div>
          <form id="executionTaskForm">
            <input type="hidden" name="taskId" value="${task.id}" />
            <div class="modal-body">
              <div class="detail-cell" style="margin-bottom:16px"><span>任务说明</span><strong>${escapeHtml(
                task.description || "按任务要求完成并提交结果。",
              )}</strong></div>
              ${renderInstructionPhotos(task)}
              <div class="form-field">
                <label>完成反馈<em>*</em></label>
                <textarea class="form-control" name="completionNote" data-task-completion-note data-task-id="${
                  task.id
                }" placeholder="说明完成情况、结果或需要上级关注的问题">${escapeHtml(
                  task.completionNote || "",
                )}</textarea>
              </div>
              ${
                photoRequired
                  ? renderExecutionPhotoBlock(task)
                  : ""
              }
            </div>
            <div class="modal-footer"><span class="footer-info">提交后由总经理审核</span><button type="button" class="button button-secondary" data-action="close-modal">取消</button><button type="submit" class="button button-primary">提交审核</button></div>
          </form>
        </div>
      </div>
    `;
  }

  function openTaskReviewModal(taskId) {
    const task = taskById(taskId);
    if (!task) return;
    const store = storeById(task.storeId);
    const canReview =
      state.role === "hq" &&
      (task.status === "submitted" ||
        task.reviewStatus === "pending_review");
    const completionPhotos =
      task.completionPhotos ||
      (task.completionPhoto ? [task.completionPhoto] : []);
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="taskReviewTitle">
          <div class="modal-header">
            <div><div class="eyebrow">任务审核</div><h2 id="taskReviewTitle">${escapeHtml(
              task.title,
            )}</h2><p>${escapeHtml(store?.name || "商丘区域")} · ${escapeHtml(
              taskTypeLabel(task),
            )} · 执行人 ${escapeHtml(task.inspector)}</p></div>
            <button class="close-button" data-action="close-modal">${icon("x")}</button>
          </div>
          <div class="modal-body">
            <div class="detail-grid">
              <div class="detail-cell"><span>下发人</span><strong>${escapeHtml(
                task.createdBy || "总经理",
              )}</strong></div>
              <div class="detail-cell"><span>完成期限</span><strong>${escapeHtml(
                task.dueLabel,
              )}</strong></div>
              <div class="detail-cell"><span>任务状态</span><strong>${
                statusMeta(task.status).label
              }</strong></div>
              <div class="detail-cell"><span>提交时间</span><strong>${escapeHtml(
                task.completedAt || "刚刚",
              )}</strong></div>
            </div>
            <section class="detail-section"><div class="detail-section-title"><h3>任务说明</h3></div><p class="detail-copy">${escapeHtml(
              task.description || "无",
            )}</p></section>
            ${renderInstructionPhotos(task)}
            <section class="detail-section"><div class="detail-section-title"><h3>完成反馈</h3></div><p class="detail-copy">${escapeHtml(
              task.completionNote || (task.resultScore ? `巡店得分 ${task.resultScore}` : "执行人暂未填写"),
            )}</p></section>
            ${
              completionPhotos.length
                ? `<section class="detail-section"><div class="detail-section-title"><h3>完成反馈图片</h3><span>${
                    completionPhotos.length
                  } 张</span></div><div class="instruction-photo-grid">${completionPhotos
                    .map(
                      (photo, index) =>
                        `<img src="${escapeHtml(
                          photo.thumbnail,
                        )}" alt="完成反馈图片 ${index + 1}" />`,
                    )
                    .join("")}</div></section>`
                : ""
            }
            ${
              task.reviewComment
                ? `<section class="detail-section"><div class="detail-section-title"><h3>审核意见</h3></div><p class="detail-copy">${escapeHtml(
                    task.reviewComment,
                  )}</p></section>`
                : ""
            }
          </div>
          <div class="modal-footer">
            ${
              canReview
                ? `<button class="button button-danger" data-action="review-decision" data-decision="reject" data-task-id="${task.id}">驳回补做</button><button class="button button-success" data-action="review-decision" data-decision="approve" data-task-id="${task.id}">审核通过</button>`
                : `<button class="button button-primary" data-action="close-modal">关闭</button>`
            }
          </div>
        </div>
      </div>
    `;
  }

  function openNewTaskModal() {
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="newTaskTitle">
          <div class="modal-header">
            <div>
              <h2 id="newTaskTitle">新建巡店任务</h2>
              <p>下达任务后，督导可在工作台直接开始现场检查。</p>
            </div>
            <button class="close-button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
          </div>
          <form id="newTaskForm">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field full">
                  <label for="taskStore">巡店门店<em>*</em></label>
                  <select class="form-control" id="taskStore" name="storeId" required>
                    ${state.stores
                      .map(
                        (store) =>
                          `<option value="${store.id}">${escapeHtml(
                            store.name,
                          )} · ${escapeHtml(store.city)}</option>`,
                      )
                      .join("")}
                  </select>
                </div>
                <div class="form-field full">
                  <label for="taskTemplate">巡检模板<em>*</em></label>
                  <select class="form-control" id="taskTemplate" name="templateId" required>
                    ${state.templates
                      .map(
                        (template) =>
                          `<option value="${template.id}">${escapeHtml(
                            template.name,
                          )} · ${getTemplateItems(template).length} 项</option>`,
                      )
                      .join("")}
                  </select>
                </div>
                <div class="form-field">
                  <label for="taskDate">计划日期<em>*</em></label>
                  <input class="form-control" id="taskDate" name="date" type="date" value="2026-11-26" required />
                </div>
                <div class="form-field">
                  <label for="taskInspector">执行督导</label>
                  <select class="form-control" id="taskInspector" name="inspector">
                    <option>黄庆</option>
                  </select>
                </div>
                <div class="form-field">
                  <label for="taskTime">计划时间</label>
                  <input class="form-control" id="taskTime" name="time" type="time" value="14:00" />
                </div>
                <div class="form-field">
                  <label for="taskPriority">优先级</label>
                  <select class="form-control" id="taskPriority" name="priority">
                    <option value="normal">普通</option>
                    <option value="urgent">紧急</option>
                  </select>
                </div>
                <div class="form-field full">
                  <label for="taskNote">任务说明</label>
                  <textarea class="form-control" id="taskNote" name="note" placeholder="补充本次巡店的重点，例如：复查上月消防通道问题…"></textarea>
                  <div class="form-hint">任务将通知执行人员，检查清单可在执行时继续调整。</div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="button button-secondary" data-action="close-modal">取消</button>
              <button type="submit" class="button button-primary">${icon(
                "plus",
                "icon-sm",
              )} 创建任务</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function openNewIssueModal() {
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="newIssueTitle">
          <div class="modal-header">
            <div>
              <h2 id="newIssueTitle">新建整改问题</h2>
              <p>记录现场问题并指定整改责任人，系统将跟踪至关闭。</p>
            </div>
            <button class="close-button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
          </div>
          <form id="newIssueForm">
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-field full">
                  <label for="issueTitle">问题描述<em>*</em></label>
                  <input class="form-control" id="issueTitle" name="title" required placeholder="例如：入口活动立牌遮挡主通道" />
                </div>
                <div class="form-field">
                  <label for="issueStore">所属门店<em>*</em></label>
                  <select class="form-control" id="issueStore" name="storeId" required>
                    ${state.stores
                      .map(
                        (store) =>
                          `<option value="${store.id}">${escapeHtml(
                            store.name,
                          )}</option>`,
                      )
                      .join("")}
                  </select>
                </div>
                <div class="form-field">
                  <label for="issueCategory">问题分类</label>
                  <select class="form-control" id="issueCategory" name="category">
                    <option>门店形象</option>
                    <option>商品陈列</option>
                    <option>服务体验</option>
                    <option>运营安全</option>
                  </select>
                </div>
                <div class="form-field">
                  <label for="issueSeverity">优先级</label>
                  <select class="form-control" id="issueSeverity" name="severity">
                    <option value="normal">中优先级</option>
                    <option value="high">高优先级</option>
                    <option value="low">低优先级</option>
                  </select>
                </div>
                <div class="form-field">
                  <label for="issueDue">整改期限</label>
                  <input class="form-control" id="issueDue" name="due" type="date" value="2026-11-27" />
                </div>
                <div class="form-field full">
                  <label for="issueDescription">详细说明</label>
                  <textarea class="form-control" id="issueDescription" name="description" placeholder="补充问题位置、影响与现场处理建议…"></textarea>
                </div>
                <div class="form-field full">
                  <button type="button" class="button button-secondary button-block" data-action="mock-photo">
                    ${icon("camera", "icon-sm")} 添加现场照片
                  </button>
                  <div class="form-hint">演示版本以模拟照片展示，正式版可接入摄像头与对象存储。</div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="button button-secondary" data-action="close-modal">取消</button>
              <button type="submit" class="button button-primary">创建问题</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function openTemplateModal(templateId) {
    const template = templateById(templateId);
    if (!template) return;
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="templateTitle">
          <div class="modal-header">
            <div>
              <div class="eyebrow">${escapeHtml(template.version)}</div>
              <h2 id="templateTitle">${escapeHtml(template.name)}</h2>
              <p>${escapeHtml(template.description)}</p>
            </div>
            <button class="close-button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
          </div>
          <div class="modal-body">
            ${template.categories
              .map(
                (category, categoryIndex) => `
                  <section class="checklist-category">
                    <div class="checklist-category-header">
                      <h3>${categoryIndex + 1}. ${escapeHtml(category.name)}</h3>
                      <span>${category.items.length} 项检查</span>
                    </div>
                    ${category.items
                      .map(
                        (item, itemIndex) => `
                          <div class="check-item">
                            <div class="check-item-head">
                              <span class="check-number">${String(itemIndex + 1).padStart(
                                2,
                                "0",
                              )}</span>
                              <span class="check-copy"><strong>${escapeHtml(
                                item.title,
                              )}</strong><span>${escapeHtml(item.hint)}</span></span>
                              ${item.severity === "high" ? `<span class="severity high">高风险</span>` : ""}
                            </div>
                          </div>
                        `,
                      )
                      .join("")}
                  </section>
                `,
              )
              .join("")}
          </div>
          <div class="modal-footer">
            <span class="footer-info">共 ${getTemplateItems(template).length} 个检查项 · 评分自动计算</span>
            <button class="button button-secondary" data-action="template-edit">编辑模板</button>
            ${
              state.role === "supervisor"
                ? `<button class="button button-primary" data-action="start-visit" data-template-id="${template.id}">用此标准发起巡店</button>`
                : `<button class="button button-primary" data-action="close-modal">仅督导可发起巡店</button>`
            }
          </div>
        </div>
      </div>
    `;
  }

  function openInspection(taskId) {
    const task = taskById(taskId);
    if (!task || task.status === "completed") {
      openInspectionReport(taskId);
      return;
    }
    const store = storeById(task.storeId);
    const template = templateById(task.templateId);
    const draft = getDraft(taskId);
    const progress = getDraftProgress(taskId);
    const allItems = getTemplateItems(template);
    const failedItems = allItems.filter(
      (item) => draft.ratings[item.id] === "fail",
    );
    const completedFailedPhotos = failedItems.filter(
      (item) => isPhotoReady(draft.itemPhotos?.[item.id]),
    ).length;
    const completeCategories = template.categories.filter((category) =>
      category.items.every((item) => draft.ratings[item.id]),
    );
    const feedbackRequiredCategories = template.categories;
    const feedbackCompletedCategories = feedbackRequiredCategories.filter(
      (category) =>
        String(draft.categoryFeedback?.[category.id] || "").trim(),
    ).length;
    const requiredCategoryPhotos = template.categories.reduce(
      (total, category) => total + (category.photoCount || 0),
      0,
    );
    const capturedCategoryPhotos = template.categories.reduce(
      (total, category) =>
        total +
        Math.min(
          (draft.categoryPhotos?.[category.id] || []).filter(isPhotoReady)
            .length,
          category.photoCount || 0,
        ),
      0,
    );
    const checkedPhotos = [
      ...failedItems.map((item) => draft.itemPhotos?.[item.id]),
      ...template.categories.flatMap(
        (category) => draft.categoryPhotos?.[category.id] || [],
      ),
    ].filter(Boolean);
    const aiPassedPhotos = checkedPhotos.filter(isPhotoReady).length;
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="inspectionTitle">
          <div class="modal-header">
            <div>
              <div class="eyebrow">现场巡检</div>
              <h2 id="inspectionTitle">${escapeHtml(task.title)}</h2>
              <p>${escapeHtml(template.name)} · ${getTemplateItems(template).length} 项检查 · 完成度 <span id="inspectionProgressText">${progress}%</span></p>
            </div>
            <button class="close-button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
          </div>
          <div class="inspection-shell">
            <aside class="inspection-side">
              <div class="inspection-side-title">检查分类</div>
              <div class="inspection-side-list">
                ${template.categories
                  .map((category, index) => {
                    const allRated = category.items.every(
                      (item) => draft.ratings[item.id],
                    );
                    const failed = category.items.filter(
                      (item) => draft.ratings[item.id] === "fail",
                    );
                    const failedPhotosComplete = failed.every(
                      (item) => isPhotoReady(draft.itemPhotos?.[item.id]),
                    );
                    const categoryPhotos =
                      draft.categoryPhotos?.[category.id] || [];
                    const categoryPhotosComplete =
                      Array.from(
                        { length: category.photoCount || 0 },
                        (_, index) => categoryPhotos[index],
                      ).every(
                        (photo) => isPhotoReady(photo),
                      );
                    const feedbackComplete = Boolean(
                      String(
                        draft.categoryFeedback?.[category.id] || "",
                      ).trim(),
                    );
                    const complete =
                      allRated &&
                      failedPhotosComplete &&
                      categoryPhotosComplete &&
                      feedbackComplete;
                    return `
                      <button class="inspection-side-item ${
                        index === 0 ? "active" : ""
                      } ${complete ? "complete" : ""}" data-action="scroll-category" data-category="${category.id}">
                        <span class="category-check">${complete ? "✓" : index + 1}</span>
                        <span>${escapeHtml(category.name)}</span>
                      </button>
                    `;
                  })
                  .join("")}
              </div>
              <div class="inspection-side-progress">
                <strong>整体完成度 <span id="sideProgress">${progress}%</span></strong>
                <div class="progress-line"><span id="sideProgressBar" style="width: ${progress}%"></span></div>
              </div>
            </aside>
            <div class="inspection-main">
              <div class="inspection-store-strip">
                <span class="store-mini-mark">${icon("store", "icon-sm")}</span>
                <span><strong>${escapeHtml(store.name)}</strong><span>${escapeHtml(
                  store.address,
                )} · 负责人 ${escapeHtml(store.manager)}</span></span>
                <span class="badge warning">${escapeHtml(task.dueLabel)}</span>
              </div>
              ${template.categories
                .map(
                  (category) => `
                    <section class="checklist-category" id="category-${category.id}">
                      <div class="checklist-category-header">
                        <h3>${escapeHtml(category.name)}</h3>
                        <span>${category.items.length} 项检查</span>
                      </div>
                      ${category.items
                        .map(
                          (item) => `
                            <div class="check-item" data-check-id="${item.id}">
                              <div class="check-item-head">
                                <span class="check-number">${icon(
                                  category.id === "operation" ||
                                    category.id === "safety"
                                    ? "shield"
                                    : "check",
                                  "icon-sm",
                                )}</span>
                                <span class="check-copy">
                                  <strong>${escapeHtml(item.title)}</strong>
                                  <span>${escapeHtml(item.hint)}</span>
                                </span>
                                ${item.severity === "high" ? `<span class="severity high">高风险</span>` : ""}
                              </div>
                              <div class="rating-pills" role="group" aria-label="${escapeHtml(
                                item.title,
                              )} 检查结果">
                                ${[
                                  ["pass", "符合", "check"],
                                  ["fail", "不符合", "x"],
                                  ["na", "不适用", "minus"],
                                ]
                                  .map(
                                    ([value, label, pillIcon]) => `
                                      <button class="rating-pill ${
                                        draft.ratings[item.id] === value
                                          ? "selected"
                                          : ""
                                      }" data-action="set-rating" data-rating="${value}" data-item-id="${item.id}" data-task-id="${task.id}">
                                        ${icon(pillIcon, "icon-sm")} ${label}
                                      </button>
                                    `,
                                  )
                                  .join("")}
                              </div>
                              <div class="item-fail-feedback ${
                                draft.ratings[item.id] === "fail"
                                  ? ""
                                  : "hidden"
                              }">
                                      <div class="item-fail-head">
                                        <span>${icon(
                                          "alert",
                                          "icon-sm",
                                        )} 不符合项必须拍照并填写反馈</span>
                                        <span class="photo-requirement-count">${
                                          draft.itemPhotos?.[item.id] ? 1 : 0
                                        }/1</span>
                                      </div>
                                      ${renderItemPhotoPreviewMarkup(
                                        draft.itemPhotos?.[item.id],
                                      )}
                                      <div class="item-fail-tools">
                                        ${
                                          state.role === "supervisor"
                                            ? `<button class="button button-secondary button-sm photo-upload-label" data-action="open-camera" data-camera-kind="item" data-task-id="${
                                                task.id
                                              }" data-item-id="${item.id}">
                                                ${icon("camera", "icon-sm")} ${
                                                  draft.itemPhotos?.[item.id]
                                                    ? "重新拍摄"
                                                    : "拍摄现场照片"
                                                }
                                              </button>`
                                            : `<label class="button button-secondary button-sm photo-upload-label" for="photo-${
                                                task.id
                                              }-${item.id}">
                                                ${icon("camera", "icon-sm")} ${
                                                  draft.itemPhotos?.[item.id]
                                                    ? "重新拍摄"
                                                    : "拍摄现场照片"
                                                }
                                              </label>
                                              <input
                                                class="photo-file-input"
                                                id="photo-${task.id}-${item.id}"
                                                type="file"
                                                accept="image/*"
                                                capture="environment"
                                                data-item-photo-input
                                                data-item-id="${item.id}"
                                                data-task-id="${task.id}"
                                              />`
                                        }
                                      </div>
                                      <textarea class="check-note check-note-fail" data-note-item="${
                                        item.id
                                      }" data-task-id="${
                                        task.id
                                      }" placeholder="填写问题与整改反馈（必填）">${escapeHtml(
                                        draft.notes?.[item.id] || "",
                                      )}</textarea>
                              </div>
                            </div>
                          `,
                        )
                        .join("")}
                      <div class="category-evidence required">
                        <div class="category-feedback-head">
                          <span>${icon("camera", "icon-sm")} ${escapeHtml(
                            category.name,
                          )}大项留档照</span>
                          <span>${
                            (draft.categoryPhotos?.[category.id] || []).filter(
                              isPhotoReady,
                            ).length
                          }/${category.photoCount} 张 · AI自检</span>
                        </div>
                        <p class="category-evidence-hint">${escapeHtml(
                          category.photoHint || "按本大项检查内容拍摄现场照片",
                        )}</p>
                        <div class="category-photo-grid">
                          ${Array.from(
                            { length: category.photoCount || 0 },
                            (_, photoIndex) => {
                              const photo =
                                draft.categoryPhotos?.[category.id]?.[
                                  photoIndex
                                ];
                              return renderCategoryPhotoSlot(
                                task,
                                category,
                                photoIndex,
                                photo,
                              );
                            },
                          ).join("")}
                        </div>
                      </div>
                      <div class="category-feedback required">
                        <div class="category-feedback-head">
                          <span>${icon("message", "icon-sm")} ${escapeHtml(
                            category.name,
                          )}大项整体反馈</span>
                          <span>必填 · 结合本大项整体情况</span>
                        </div>
                        <textarea class="check-note category-feedback-input" data-category-feedback="${
                          category.id
                        }" data-task-id="${
                          task.id
                        }" placeholder="请概括本大项整体情况、亮点或后续建议">${escapeHtml(
                          draft.categoryFeedback?.[category.id] || "",
                        )}</textarea>
                      </div>
                    </section>
                  `,
                )
                .join("")}
              <div class="inspection-summary">
                <h3>本次巡检汇总</h3>
                <div class="inspection-summary-grid" style="grid-template-columns:repeat(4,1fr)">
                  <div><strong id="passCount">${
                    Object.values(draft.ratings).filter((value) => value === "pass")
                      .length
                  }</strong><span>符合</span></div>
                  <div><strong id="failCount">${
                    Object.values(draft.ratings).filter((value) => value === "fail")
                      .length
                  }</strong><span>不符合</span></div>
                  <div><strong id="scorePreview">${previewScore(draft, template)}</strong><span>预计得分</span></div>
                  <div><strong id="aiPhotoSummary">${aiPassedPhotos}/${
                    failedItems.length + requiredCategoryPhotos
                  }</strong><span>AI照片通过</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <span class="footer-info" id="inspectionHint">${
              progress === 100
                ? "判定、不符合项照片、大项留档照与大项反馈均已完成，可以提交。"
                : `待检查 ${
                    getTemplateItems(template).length -
                    Object.keys(draft.ratings).length
                  } 项，不符合项照片 ${completedFailedPhotos}/${
                    failedItems.length
                  } 张，大项照片 ${capturedCategoryPhotos}/${
                    requiredCategoryPhotos
                  } 张，大项反馈 ${feedbackCompletedCategories}/${
                    feedbackRequiredCategories.length
                  } 项`
            }</span>
            <button class="button button-secondary" data-action="save-draft" data-task-id="${task.id}">保存草稿</button>
            <button class="button button-primary" data-action="submit-inspection" data-task-id="${task.id}" ${
              progress < 100 ? "disabled style='opacity:.5;cursor:not-allowed'" : ""
            }>提交巡检</button>
          </div>
        </div>
      </div>
    `;
  }

  function previewScore(draft, template) {
    const values = Object.values(draft.ratings);
    const pass = values.filter((value) => value === "pass").length;
    const fail = values.filter((value) => value === "fail").length;
    if (!pass && !fail) return "—";
    return Math.round((pass / (pass + fail)) * 100);
  }

  function refreshInspectionUi(taskId) {
    const task = taskById(taskId);
    if (!task) return;
    const template = templateById(task.templateId);
    const draft = getDraft(taskId);
    const items = getTemplateItems(template);
    const failedItems = items.filter(
      (item) => draft.ratings[item.id] === "fail",
    );
    const progress = getDraftProgress(taskId);
    const passedPhotos = failedItems.filter((item) =>
      isPhotoReady(draft.itemPhotos?.[item.id]),
    ).length;
    const checkedPhotos = [
      ...failedItems.map((item) => draft.itemPhotos?.[item.id]),
      ...template.categories.flatMap(
        (category) => draft.categoryPhotos?.[category.id] || [],
      ),
    ].filter(Boolean);
    const aiPassedPhotos = checkedPhotos.filter(isPhotoReady).length;
    const requiredCategoryPhotos = template.categories.reduce(
      (total, category) => total + (category.photoCount || 0),
      0,
    );
    const capturedCategoryPhotos = template.categories.reduce(
      (total, category) =>
        total +
        (draft.categoryPhotos?.[category.id] || []).filter(isPhotoReady)
          .length,
      0,
    );
    const completedFeedback = template.categories.filter((category) =>
      String(draft.categoryFeedback?.[category.id] || "").trim(),
    ).length;

    const text = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    };
    text("#inspectionProgressText", `${progress}%`);
    text("#sideProgress", `${progress}%`);
    text("#passCount", String(items.filter((item) => draft.ratings[item.id] === "pass").length));
    text(
      "#failCount",
      String(failedItems.length),
    );
    text("#scorePreview", String(previewScore(draft, template)));
    text(
      "#aiPhotoSummary",
      `${aiPassedPhotos}/${failedItems.length + requiredCategoryPhotos}`,
    );
    const sideBar = document.querySelector("#sideProgressBar");
    if (sideBar) sideBar.style.width = `${progress}%`;
    const submit = document.querySelector('[data-action="submit-inspection"]');
    if (submit) {
      submit.disabled = progress < 100;
      submit.style.opacity = progress < 100 ? ".5" : "1";
      submit.style.cursor = progress < 100 ? "not-allowed" : "pointer";
    }
    const hint = document.querySelector("#inspectionHint");
    if (hint) {
      hint.textContent =
        progress === 100
          ? "判定、不符合项照片、大项留档照与大项反馈均已完成，可以提交。"
          : `待检查 ${
              items.length -
              Object.keys(draft.ratings).length
            } 项，不符合项照片 ${passedPhotos}/${failedItems.length} 张，大项照片 ${capturedCategoryPhotos}/${requiredCategoryPhotos} 张，大项反馈 ${completedFeedback}/${template.categories.length} 项`;
    }

    template.categories.forEach((category) => {
      const rated = category.items.every((item) => draft.ratings[item.id]);
      const failed = category.items.filter(
        (item) => draft.ratings[item.id] === "fail",
      );
      const failedPhotos = failed.every((item) =>
        isPhotoReady(draft.itemPhotos?.[item.id]),
      );
      const categoryPhotos = draft.categoryPhotos?.[category.id] || [];
      const photosComplete = Array.from(
        { length: category.photoCount || 0 },
        (_, index) => categoryPhotos[index],
      ).every((photo) => isPhotoReady(photo));
      const feedbackComplete = Boolean(
        String(draft.categoryFeedback?.[category.id] || "").trim(),
      );
      const complete =
        rated && failedPhotos && photosComplete && feedbackComplete;
      const sideItem = document.querySelector(
        `.inspection-side-item[data-category="${category.id}"]`,
      );
      if (sideItem) {
        sideItem.classList.toggle("complete", complete);
        const marker = sideItem.querySelector(".category-check");
        if (marker) {
          marker.textContent = complete
            ? "✓"
            : String(
                template.categories.findIndex(
                  (item) => item.id === category.id,
                ) + 1,
              );
        }
      }
    });
  }

  function openInspectionReport(taskId) {
    const task = taskById(taskId);
    if (!task) return;
    const store = storeById(task.storeId);
    const template = templateById(task.templateId);
    const relatedIssues = state.issues.filter(
      (issue) => issue.storeId === task.storeId,
    );
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-backdrop">
        <div class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="reportTitle">
          <div class="modal-header">
            <div>
              <div class="eyebrow">巡店报告</div>
              <h2 id="reportTitle">${escapeHtml(store.name)} · ${escapeHtml(
                task.title,
              )}</h2>
              <p>${escapeHtml(template.name)} · ${escapeHtml(
                task.inspector,
              )} · ${escapeHtml(task.completedAt || task.dueLabel)}</p>
            </div>
            <button class="close-button" data-action="close-modal" aria-label="关闭">${icon("x")}</button>
          </div>
          <div class="modal-body">
            <div class="inspection-summary" style="background: linear-gradient(125deg, #202832, #2d3a46)">
              <h3>${escapeHtml(store.name)} · 巡检总览</h3>
              <div class="inspection-summary-grid">
                <div><strong>${task.resultScore || 0}</strong><span>巡检得分</span></div>
                <div><strong>${getTemplateItems(template).length}</strong><span>检查项</span></div>
                <div><strong>${relatedIssues.filter((issue) => issue.status !== "closed").length}</strong><span>待整改</span></div>
              </div>
            </div>
            <div class="detail-grid" style="margin-top: 18px">
              <div class="detail-cell"><span>所属区域</span><strong>商丘区域 · ${escapeHtml(
                store.city,
              )}</strong></div>
              <div class="detail-cell"><span>门店人员</span><strong>${escapeHtml(
                store.manager,
              )}</strong></div>
              <div class="detail-cell"><span>巡检模板</span><strong>${escapeHtml(
                template.name,
              )}</strong></div>
              <div class="detail-cell"><span>报告编号</span><strong>RPT-${escapeHtml(
                task.id.replace(/\D/g, ""),
              )}</strong></div>
            </div>
            <section class="detail-section">
              <div class="detail-section-title"><h3>检查项结果</h3><span>${getTemplateItems(
                template,
              ).length} 项</span></div>
              ${template.categories
                .map(
                  (category) => `
                    <div class="checklist-category">
                      <div class="checklist-category-header"><h3>${escapeHtml(
                        category.name,
                      )}</h3><span class="badge success">符合</span></div>
                      ${category.items
                        .map(
                          (item) => `
                            <div class="check-item">
                              <div class="check-item-head">
                                <span class="check-number">✓</span>
                                <span class="check-copy"><strong>${escapeHtml(
                                  item.title,
                                )}</strong><span>${escapeHtml(
                                  item.hint,
                                )}</span></span>
                              </div>
                            </div>
                          `,
                        )
                        .join("")}
                    </div>
                  `,
                )
                .join("")}
            </section>
          </div>
          <div class="modal-footer">
            <span class="footer-info">报告由巡店云自动生成</span>
            <button class="button button-secondary" data-action="download-report" data-task-id="${task.id}">
              ${icon("download", "icon-sm")} 下载报告
            </button>
            <button class="button button-primary" data-action="close-modal">完成</button>
          </div>
        </div>
      </div>
    `;
  }

  function openIssueDrawer(issueId) {
    const issue = issueById(issueId);
    if (!issue) return;
    const store = storeById(issue.storeId);
    const status = statusMeta(issue.status);
    const nextAction = {
      pending: { action: "start-rectification", label: "开始整改" },
      rectifying: { action: "submit-review", label: "提交复核" },
      review: { action: "close-issue", label: "复核通过" },
      closed: { action: "reopen-issue", label: "重新打开" },
    }[issue.status];
    document.getElementById("drawer-root").innerHTML = `
      <div class="drawer-scrim"></div>
      <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="issueDrawerTitle">
        <div class="drawer-header">
          <div>
            <span class="badge ${status.className}">${status.label}</span>
            <h2 id="issueDrawerTitle">${escapeHtml(issue.title)}</h2>
          </div>
          <button class="close-button" data-action="close-drawer" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="drawer-body">
          <div class="detail-grid">
            <div class="detail-cell"><span>问题编号</span><strong>${issue.id}</strong></div>
            <div class="detail-cell"><span>优先级</span><strong>${severityLabel(
              issue.severity,
            )}</strong></div>
            <div class="detail-cell"><span>所属门店</span><strong>${escapeHtml(
              store.name,
            )}</strong></div>
            <div class="detail-cell"><span>整改期限</span><strong style="${
              issue.overdue ? "color:var(--red)" : ""
            }">${escapeHtml(issue.due)}</strong></div>
            <div class="detail-cell"><span>问题分类</span><strong>${escapeHtml(
              issue.category,
            )}</strong></div>
            <div class="detail-cell"><span>整改责任人</span><strong>${escapeHtml(
              issue.assignee,
            )}</strong></div>
          </div>

          <section class="detail-section">
            <div class="detail-section-title"><h3>问题说明</h3><span>${escapeHtml(
              issue.createdAt,
            )}</span></div>
            <p class="detail-copy">${escapeHtml(issue.description)}</p>
          </section>

          <section class="detail-section">
            <div class="detail-section-title"><h3>现场证据</h3><span>2 张照片</span></div>
            <div class="evidence-large">
              <div class="issue-evidence" style="height: 180px; margin: 0">
                <div class="evidence-frame ${
                  issue.category === "运营安全" ? "hallway" : "shelves"
                }"><span class="photo-count">发现问题</span></div>
                <div class="evidence-frame ${
                  issue.category === "运营安全" ? "shelves" : "hallway"
                }"><span class="photo-count">现场全景</span></div>
              </div>
            </div>
          </section>

          <section class="detail-section">
            <div class="detail-section-title"><h3>处理记录</h3><span>${escapeHtml(
              issue.reporter,
            )} 发起</span></div>
            <div class="timeline">
              <div class="timeline-item done"><p>巡店发现问题并创建整改单</p><span>${escapeHtml(
                issue.createdAt,
              )} · ${escapeHtml(issue.reporter)}</span></div>
              ${
                issue.status !== "pending"
                  ? `<div class="timeline-item done"><p>门店人员已开始处理，责任人：${escapeHtml(
                      issue.assignee,
                    )}</p><span>处理中</span></div>`
                  : ""
              }
              ${
                ["review", "closed"].includes(issue.status)
                  ? `<div class="timeline-item done"><p>门店提交整改凭证，等待督导复核</p><span>整改完成 · 已上传 1 张凭证</span></div>`
                  : ""
              }
              ${
                issue.status === "closed"
                  ? `<div class="timeline-item done"><p>督导复核通过，问题已关闭</p><span>闭环完成</span></div>`
                  : ""
              }
            </div>
          </section>
        </div>
        <div class="drawer-footer">
          ${
            issue.status === "pending"
              ? `<button class="button button-secondary" data-action="assign-issue" data-issue-id="${issue.id}">转派</button>`
              : ""
          }
          <button class="button ${
            issue.status === "closed" ? "button-secondary" : "button-primary"
          }" data-action="${nextAction.action}" data-issue-id="${issue.id}">
            ${nextAction.label}
          </button>
        </div>
      </aside>
    `;
  }

  function openStoreDrawer(storeId) {
    const store = storeById(storeId);
    if (!store) return;
    const storeIssues = state.issues.filter(
      (issue) => issue.storeId === store.id && issue.status !== "closed",
    );
    const storeTasks = state.tasks
      .filter((task) => task.storeId === store.id)
      .slice(-3)
      .reverse();
    document.getElementById("drawer-root").innerHTML = `
      <div class="drawer-scrim"></div>
      <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="storeDrawerTitle">
        <div class="drawer-header">
          <div>
            <div class="eyebrow">门店档案 · ${escapeHtml(store.city)}</div>
            <h2 id="storeDrawerTitle">${escapeHtml(store.name)}</h2>
          </div>
          <button class="close-button" data-action="close-drawer" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="drawer-body">
          <div class="mobile-score-card" style="border-radius: 16px">
            <div class="mobile-score-top"><span>最新门店得分</span>${riskBadge(
              store.risk,
            )}</div>
            <div class="mobile-score-value"><strong>${Number.isFinite(store.score) ? store.score : "—"}</strong><span>/ 100</span></div>
            <div class="mobile-score-meta"><span>门店状态<strong>${Number.isFinite(store.score) ? "已巡检" : "待巡检"}</strong></span><span>待整改<strong>${store.issues} 项</strong></span></div>
          </div>
          <div class="detail-grid" style="margin-top: 18px">
            <div class="detail-cell"><span>门店人员</span><strong>${escapeHtml(
              store.manager,
            )}</strong></div>
            <div class="detail-cell"><span>负责督导</span><strong>${escapeHtml(
              store.inspector,
            )}</strong></div>
            <div class="detail-cell"><span>最近巡检</span><strong>${escapeHtml(
              store.lastInspection,
            )}</strong></div>
            <div class="detail-cell"><span>未关闭问题</span><strong>${store.issues} 项</strong></div>
          </div>
          <div class="detail-cell" style="margin-top: 10px"><span>门店地址</span><strong>${escapeHtml(
            store.address,
          )}</strong></div>
          <section class="detail-section">
            <div class="detail-section-title"><h3>待整改问题</h3><span>${storeIssues.length} 项</span></div>
            ${
              storeIssues.length
                ? storeIssues
                    .map(
                      (issue) => `
                        <div class="issue-compact" style="margin-bottom: 8px" data-action="open-issue" data-issue-id="${issue.id}">
                          <span class="issue-accent ${issue.severity}"></span>
                          <span class="issue-compact-copy"><span class="issue-compact-title">${escapeHtml(
                            issue.title,
                          )}</span><span class="issue-compact-meta"><span>${severityLabel(
                            issue.severity,
                          )}</span><span class="due">${escapeHtml(
                            issue.due,
                          )}</span></span></span>
                          ${icon("chevron", "icon-sm")}
                        </div>
                      `,
                    )
                    .join("")
                : `<p class="detail-copy">当前没有待整改问题，门店运营状态良好。</p>`
            }
          </section>
          <section class="detail-section">
            <div class="detail-section-title"><h3>最近巡检</h3><span>${storeTasks.length} 条</span></div>
            <div class="timeline">
              ${storeTasks
                .map(
                  (task) => `
                    <div class="timeline-item ${
                      task.status === "completed" ? "done" : ""
                    }"><p>${escapeHtml(task.title)} · ${
                      task.status === "completed"
                        ? `得分 ${task.resultScore}`
                        : statusMeta(task.status).label
                    }</p><span>${escapeHtml(
                      task.completedAt || task.dueLabel,
                    )} · ${escapeHtml(task.inspector)}</span></div>
                  `,
                )
                .join("")}
            </div>
          </section>
        </div>
        <div class="drawer-footer">
          <button class="button button-secondary" data-action="store-history" data-store-id="${store.id}">查看记录</button>
          ${
            state.role === "supervisor"
              ? `<button class="button button-primary" data-action="start-visit" data-store-id="${store.id}">现场发起巡店</button>`
              : `<button class="button button-primary" data-action="close-drawer">关闭</button>`
          }
        </div>
      </aside>
    `;
  }

  function submitInspection(taskId) {
    const task = taskById(taskId);
    const template = templateById(task.templateId);
    const items = getTemplateItems(template);
    const draft = getDraft(taskId);
    if (items.some((item) => !draft.ratings[item.id])) {
      showToast("请完成全部检查项后再提交", "error");
      return;
    }
    const pass = items.filter((item) => draft.ratings[item.id] === "pass");
    const fail = items.filter((item) => draft.ratings[item.id] === "fail");
    const missingPhoto = fail.find(
      (item) => !isPhotoReady(draft.itemPhotos?.[item.id]),
    );
    if (missingPhoto) {
      showToast(`请为不符合项「${missingPhoto.title}」拍照`, "error");
      return;
    }
    const missingNote = fail.find(
      (item) => !String(draft.notes?.[item.id] || "").trim(),
    );
    if (missingNote) {
      showToast(`请填写不符合项「${missingNote.title}」的问题反馈`, "error");
      return;
    }
    const missingCategoryPhoto = template.categories.find((category) => {
      const photos = draft.categoryPhotos?.[category.id] || [];
      return (
        !Array.from(
          { length: category.photoCount || 0 },
          (_, index) => photos[index],
        ).every((photo) => isPhotoReady(photo))
      );
    });
    if (missingCategoryPhoto) {
      showToast(
        `请按内容要求完成「${missingCategoryPhoto.name}」大项留档照及 AI 自检`,
        "error",
      );
      return;
    }
    const missingFeedbackCategory = template.categories.find(
      (category) =>
        !String(draft.categoryFeedback?.[category.id] || "").trim(),
    );
    if (missingFeedbackCategory) {
      showToast(
        `请填写「${missingFeedbackCategory.name}」大项整体反馈`,
        "error",
      );
      return;
    }
    const score = pass.length + fail.length ? Math.round((pass.length / (pass.length + fail.length)) * 100) : 100;
    task.status = "submitted";
    task.reviewStatus = "pending_review";
    task.progress = 100;
    task.resultScore = score;
    task.completedAt = "2026-11-25";
    const store = storeById(task.storeId);
    task.completionNote = `本次巡店得分 ${score}，等待总经理审核。`;
    const createdIssues = [];
    fail.forEach((item) => {
      const issueId = `IS-${Math.floor(1100 + Math.random() * 800)}`;
      state.issues.unshift({
        id: issueId,
        storeId: store.id,
        title: `【${item.categoryName}】${item.title}`,
        category: item.categoryName,
        severity: item.severity === "high" ? "high" : "normal",
        status: "pending",
        due: item.categoryName === "安全" ? "立即整改" : "2026-11-28",
        overdue: false,
        description: draft.notes[item.id],
        itemPhotoCount: isPhotoReady(draft.itemPhotos?.[item.id]) ? 1 : 0,
        categoryPhotoCount:
          (draft.categoryPhotos?.[item.categoryId] || []).filter(isPhotoReady)
            .length,
        categoryFeedback: draft.categoryFeedback?.[item.categoryId] || "",
        reporter: task.inspector,
        assignee: store.manager,
        createdAt: "2026-11-25",
      });
      createdIssues.push(issueId);
    });
    store.issues = state.issues.filter(
      (issue) => issue.storeId === store.id && issue.status !== "closed",
    ).length;
    delete state.drafts[taskId];
    saveState();
    closeModal();
    closeDrawer();
    renderApp();
    showToast(
      `巡检已提交审核，得分 ${score}${
        fail.length ? `，已生成 ${fail.length} 个整改问题` : ""
      }`,
    );
  }

  function createCsv(rows) {
    return rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\r\n");
  }

  function downloadFile(filename, content, mime = "text/csv;charset=utf-8") {
    const blob = new Blob(["\ufeff", content], { type: mime });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function exportStores() {
    const rows = [
      [
        "门店编号",
        "门店名称",
        "区域",
        "督导",
        "昨日销售额",
        "毛利额",
        "毛利率",
        "新增会员",
        "巡店得分",
        "待整改",
        "风险状态",
      ],
      ...state.stores.map((store) => [
        store.id,
        store.name,
        `${store.city}区域`,
        store.inspector,
        store.sales,
        store.grossProfit,
        store.margin,
        store.newCustomers,
        Number.isFinite(store.score) ? store.score : "",
        store.issues,
        store.risk,
      ]),
    ];
    downloadFile("巴布豆门店运营数据.csv", createCsv(rows));
    showToast("门店数据已导出");
  }

  function exportReport() {
    const rows = [
      [
        "报告名称",
        "区域",
        "统计周期",
        "门店数",
        "销售额",
        "毛利额",
        "综合毛利率",
        "巡店得分",
        "待整改问题",
        "整改闭环率",
      ],
      [
        "巴布豆商丘区域经营报表",
        "商丘区域",
        "2026-11-24",
        state.stores.length,
        totalSales(),
        totalGrossProfit(),
        `${(
          (totalGrossProfit() / totalSales()) *
          100
        ).toFixed(1)}%`,
        averageStoreScore(),
        pendingIssueCount(),
        `${rectificationRate()}%`,
      ],
      [],
      ["门店", "销售额", "毛利额", "毛利率", "新客", "巡店得分", "待整改", "风险"],
      ...state.stores.map((store) => [
        store.name,
        store.sales,
        store.grossProfit,
        `${store.margin}%`,
        store.newCustomers,
        Number.isFinite(store.score) ? store.score : "",
        store.issues,
        store.risk,
      ]),
    ];
    downloadFile("巴布豆商丘区域经营报表.csv", createCsv(rows));
    showToast("运营报表已导出");
  }

  function findGlobalResult(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return null;
    const store = state.stores.find((item) =>
      `${item.name} ${item.manager} ${item.city}`.toLowerCase().includes(normalized),
    );
    if (store) return { type: "store", id: store.id };
    const issue = state.issues.find((item) =>
      `${item.id} ${item.title} ${item.category}`.toLowerCase().includes(normalized),
    );
    if (issue) return { type: "issue", id: issue.id };
    const task = state.tasks.find((item) =>
      `${item.title} ${item.inspector}`.toLowerCase().includes(normalized),
    );
    if (task) return { type: "task", id: task.id };
    return null;
  }

  function refreshTaskResults() {
    const container = document.getElementById("taskResults");
    if (container) container.innerHTML = renderTaskCards();
  }

  function refreshStoreResults() {
    const container = document.getElementById("storeTableBody");
    if (container) container.innerHTML = renderStoreRows(filteredStores());
  }

  function refreshIssueBoard() {
    if (state.page === "issues" && state.role !== "store") renderApp();
  }

  function navigate(page) {
    state.page = page;
    saveState();
    closeDrawer();
    renderApp();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.addEventListener("click", (event) => {
    const roleSelect = event.target.closest("[data-role-select]");
    if (roleSelect) return;

    if (
      event.target.classList.contains("modal-backdrop") ||
      event.target.classList.contains("drawer-scrim")
    ) {
      if (event.target.classList.contains("modal-backdrop")) closeModal();
      else closeDrawer();
      return;
    }

    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;

    if (action === "navigate") {
      navigate(target.dataset.page);
      return;
    }
    if (action === "open-inspection") {
      openInspection(target.dataset.taskId);
      return;
    }
    if (action === "view-inspection") {
      openInspectionReport(target.dataset.taskId);
      return;
    }
    if (action === "execute-task") {
      openExecutionTaskModal(target.dataset.taskId);
      return;
    }
    if (action === "review-task" || action === "task-detail") {
      openTaskReviewModal(target.dataset.taskId);
      return;
    }
    if (action === "review-decision") {
      const task = taskById(target.dataset.taskId);
      if (!task) return;
      const approved = target.dataset.decision === "approve";
      if (approved) {
        task.status = "completed";
        task.reviewStatus = "approved";
        task.reviewComment = "上级审核通过";
        task.reviewedBy = "黄庆";
        task.reviewedAt = "2026-11-25";
        if (task.taskType === "inspection" && task.resultScore) {
          const store = storeById(task.storeId);
          store.score = task.resultScore;
          store.lastInspection = "2026-11-25";
        }
      } else {
        task.status = "in_progress";
        task.reviewStatus = "rejected";
        task.reviewComment = "上级审核驳回，请补充完成结果后重新提交";
      }
      saveState();
      closeModal();
      renderApp();
      showToast(approved ? "任务审核通过" : "任务已驳回执行人");
      return;
    }
    if (action === "start-visit") {
      closeDrawer();
      openStartVisitModal(
        target.dataset.storeId || "",
        target.dataset.templateId || "",
      );
      return;
    }
    if (action === "plan-route") {
      openRoutePlannerModal();
      return;
    }
    if (action === "open-camera") {
      openCameraCapture({
        taskId: target.dataset.taskId,
        kind: target.dataset.cameraKind,
        itemId: target.dataset.itemId || "",
        categoryId: target.dataset.category || "",
        photoIndex: Number(target.dataset.photoIndex || 0),
      });
      return;
    }
    if (action === "close-camera") {
      closeCameraCapture();
      return;
    }
    if (action === "capture-camera") {
      captureCameraPhoto();
      return;
    }
    if (
      action === "route-move-up" ||
      action === "route-move-down" ||
      action === "route-remove"
    ) {
      const storeId = target.dataset.storeId;
      const index = ui.routeDraft.indexOf(storeId);
      if (action === "route-remove") {
        ui.routeDraft = ui.routeDraft.filter((id) => id !== storeId);
      } else {
        const targetIndex =
          action === "route-move-up" ? index - 1 : index + 1;
        if (targetIndex >= 0 && targetIndex < ui.routeDraft.length) {
          [ui.routeDraft[index], ui.routeDraft[targetIndex]] = [
            ui.routeDraft[targetIndex],
            ui.routeDraft[index],
          ];
        }
      }
      refreshRoutePlannerUi();
      return;
    }
    if (action === "save-route") {
      state.route = {
        date: "2026-11-25",
        storeIds: [...ui.routeDraft],
        plannedBy: "黄庆",
        updatedAt: "2026-11-25",
      };
      saveState();
      closeModal();
      renderApp();
      showToast(`今日巡店路线已保存，共 ${ui.routeDraft.length} 家门店`);
      return;
    }
    if (action === "new-task" || action === "new-task-for-store") {
      closeDrawer();
      openStartVisitModal(
        target.dataset.storeId || "",
        target.dataset.templateId || "",
      );
      return;
    }
    if (action === "new-issue") {
      openNewIssueModal();
      return;
    }
    if (action === "assign-task") {
      openAssignTaskModal();
      return;
    }
    if (action === "remove-assignment-photo") {
      ui.assignTaskPhotos.splice(Number(target.dataset.photoIndex), 1);
      const list = document.getElementById("assignmentPhotoList");
      if (list) list.innerHTML = renderAssignmentPhotoList();
      return;
    }
    if (action === "edit-store-setting") {
      openStoreSettingModal(target.dataset.storeId);
      return;
    }
    if (action === "add-store") {
      openNewStoreModal();
      return;
    }
    if (action === "delete-store") {
      openDeleteStoreModal(target.dataset.storeId);
      return;
    }
    if (action === "confirm-delete-store") {
      const storeId = target.dataset.storeId;
      const store = storeById(storeId);
      if (!store) return;
      state.stores = state.stores.filter((item) => item.id !== storeId);
      state.tasks = state.tasks.filter((task) => task.storeId !== storeId);
      state.issues = state.issues.filter((issue) => issue.storeId !== storeId);
      state.accounts = state.accounts.map((account) =>
        account.storeId === storeId
          ? { ...account, storeId: "", store: "未绑定门店" }
          : account,
      );
      if (state.storeId === storeId) {
        state.storeId = state.stores[0]?.id || "";
      }
      saveState();
      closeModal();
      renderApp();
      showToast(`已删除门店「${store.name}」`);
      return;
    }
    if (action === "add-account") {
      openAddAccountModal();
      return;
    }
    if (action === "toggle-account") {
      const account = state.accounts.find(
        (item) => item.id === target.dataset.accountId,
      );
      if (!account) return;
      account.status = account.status === "启用" ? "停用" : "启用";
      saveState();
      target.textContent = account.status === "启用" ? "停用" : "启用";
      const statusBadge = target
        .closest("td")
        ?.previousElementSibling?.querySelector(".badge");
      if (statusBadge) {
        statusBadge.className = `badge ${
          account.status === "启用" ? "success" : "warning"
        }`;
        statusBadge.textContent = account.status;
      }
      showToast(`账号已${account.status === "启用" ? "启用" : "停用"}`);
      return;
    }
    if (action === "close-modal") {
      closeModal();
      return;
    }
    if (action === "close-drawer") {
      closeDrawer();
      return;
    }
    if (action === "filter-tasks") {
      ui.taskFilter = target.dataset.filter;
      document
        .querySelectorAll('[data-action="filter-tasks"]')
        .forEach((button) =>
          button.classList.toggle("active", button === target),
        );
      refreshTaskResults();
      return;
    }
    if (action === "filter-issues") {
      ui.issueFocus = target.dataset.filter;
      document
        .querySelectorAll('[data-action="filter-issues"]')
        .forEach((button) =>
          button.classList.toggle("active", button === target),
        );
      refreshIssueBoardView();
      return;
    }
    if (action === "open-issue") {
      event.stopPropagation();
      closeModal();
      openIssueDrawer(target.dataset.issueId);
      return;
    }
    if (action === "open-store") {
      openStoreDrawer(target.dataset.storeId);
      return;
    }
    if (action === "open-template") {
      openTemplateModal(target.dataset.templateId);
      return;
    }
    if (action === "set-rating") {
      const taskId = target.dataset.taskId;
      const itemId = target.dataset.itemId;
      const rating = target.dataset.rating;
      const draft = getDraft(taskId);
      draft.ratings[itemId] = rating;
      state.drafts[taskId] = draft;
      saveState();
      const checkItem = target.closest(".check-item");
      checkItem
        ?.querySelectorAll(".rating-pill")
        .forEach((button) =>
          button.classList.toggle("selected", button === target),
        );
      const feedback = checkItem?.querySelector(".item-fail-feedback");
      feedback?.classList.toggle("hidden", rating !== "fail");
      refreshInspectionUi(taskId);
      return;
    }
    if (action === "scroll-category") {
      const section = document.getElementById(`category-${target.dataset.category}`);
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
      document
        .querySelectorAll(".inspection-side-item")
        .forEach((item) => item.classList.toggle("active", item === target));
      return;
    }
    if (action === "save-draft") {
      const taskId = target.dataset.taskId;
      const task = taskById(taskId);
      task.status = "in_progress";
      task.progress = getDraftProgress(taskId);
      saveState();
      closeModal();
      renderApp();
      showToast("巡检草稿已保存");
      return;
    }
    if (action === "submit-inspection") {
      submitInspection(target.dataset.taskId);
      return;
    }
    if (action === "start-rectification" || action === "submit-review" || action === "close-issue" || action === "reopen-issue") {
      const issue = issueById(target.dataset.issueId);
      if (!issue) return;
      const nextStatus = {
        "start-rectification": "rectifying",
        "submit-review": "review",
        "close-issue": "closed",
        "reopen-issue": "pending",
      }[action];
      issue.status = nextStatus;
      const store = storeById(issue.storeId);
      store.issues = state.issues.filter(
        (item) => item.storeId === store.id && item.status !== "closed",
      ).length;
      saveState();
      openIssueDrawer(issue.id);
      renderApp();
      showToast(
        {
          rectifying: "已开始整改",
          review: "整改凭证已提交，等待督导复核",
          closed: "问题已复核通过并关闭",
          pending: "问题已重新打开",
        }[nextStatus],
      );
      return;
    }
    if (action === "assign-issue") {
      showToast("已通知对应门店人员处理该问题");
      return;
    }
    if (action === "filter-approvals") {
      ui.approvalFilter = target.dataset.filter;
      renderApp();
      return;
    }
    if (action === "approve-account" || action === "reject-account") {
      const approval = state.approvals.find(
        (item) => item.id === target.dataset.approvalId,
      );
      if (!approval) return;
      approval.status =
        action === "approve-account" ? "approved" : "rejected";
      saveState();
      renderApp();
      showToast(
        action === "approve-account"
          ? `已通过 ${approval.name} 的 ${approval.requestedRole} 申请`
          : `已拒绝 ${approval.name} 的进入申请`,
      );
      return;
    }
    if (action === "export-stores") {
      exportStores();
      return;
    }
    if (action === "export-report" || action === "weekly-report") {
      exportReport();
      return;
    }
    if (action === "refresh-data") {
      renderApp();
      showToast("数据已刷新");
      return;
    }
    if (action === "check-update") {
      checkForAppUpdate(true);
      return;
    }
    if (action === "notifications") {
      showToast("2 项任务即将到期，1 项高风险整改待复核");
      return;
    }
    if (action === "open-help") {
      document.getElementById("modal-root").innerHTML = `
        <div class="modal-backdrop">
          <div class="modal" role="dialog" aria-modal="true">
            <div class="modal-header">
              <div><h2>巡店云使用指南</h2><p>三端协同，一次配置，全程闭环。</p></div>
              <button class="close-button" data-action="close-modal">${icon("x")}</button>
            </div>
            <div class="modal-body">
              <div class="insight-list">
                <div class="insight-item"><span class="insight-number">1</span><p><strong>总部端</strong>创建任务、配置模板，查看区域数据与风险趋势。</p></div>
                <div class="insight-item"><span class="insight-number">2</span><p><strong>督导端</strong>按计划到店，逐项评分，不符合项自动生成整改单。</p></div>
                <div class="insight-item"><span class="insight-number">3</span><p><strong>门店端</strong>按所属门店接收任务，不区分店长和导购，完成后提交上级审核。</p></div>
              </div>
            </div>
            <div class="modal-footer"><button class="button button-primary" data-action="close-modal">知道了</button></div>
          </div>
        </div>
      `;
      return;
    }
    if (action === "mobile-tab") {
      ui.mobileTab = target.dataset.mobileTab;
      renderApp();
      return;
    }
    if (action === "mobile-submit-issue") {
      const issue = mobileIssuesForStore()[0];
      if (issue) openIssueDrawer(issue.id);
      else showToast("当前没有待整改问题");
      return;
    }
    if (action === "mobile-message") {
      showToast("异常报备入口已打开，可直接联系负责督导");
      return;
    }
    if (action === "mock-photo") {
      target.innerHTML = `${icon("check-circle", "icon-sm")} 已添加 1 张现场照片`;
      showToast("已模拟添加现场照片");
      return;
    }
    if (action === "template-edit" || action === "new-template") {
      showToast("模板编辑器即将开放，当前可复制已有模板");
      return;
    }
    if (action === "template-help") {
      showToast("巡检模板支持分类、检查项、风险等级和自动评分");
      return;
    }
    if (action === "download-report") {
      const task = taskById(target.dataset.taskId);
      const store = storeById(task.storeId);
      downloadFile(
        `${store.name}-巡店报告.txt`,
        `${store.name}巡店报告\n任务：${task.title}\n督导：${task.inspector}\n得分：${task.resultScore}\n提交时间：${task.completedAt || task.dueLabel}\n\n由巡店云自动生成`,
        "text/plain;charset=utf-8",
      );
      showToast("巡店报告已下载");
      return;
    }
    if (action === "store-history") {
      navigate("tasks");
      return;
    }
  });

  document.addEventListener("change", async (event) => {
    if (event.target.matches("[data-assignment-photo-input]")) {
      const files = Array.from(event.target.files || []).slice(
        0,
        Math.max(0, 3 - ui.assignTaskPhotos.length),
      );
      for (const file of files) {
        const analysis = await analyzePhoto(file);
        if (analysis.thumbnail) ui.assignTaskPhotos.push(analysis);
      }
      const list = document.getElementById("assignmentPhotoList");
      if (list) list.innerHTML = renderAssignmentPhotoList();
      event.target.value = "";
      return;
    }
    if (event.target.matches("[data-route-store-checkbox]")) {
      const storeId = event.target.value;
      if (event.target.checked) {
        if (!ui.routeDraft.includes(storeId)) ui.routeDraft.push(storeId);
      } else {
        ui.routeDraft = ui.routeDraft.filter((id) => id !== storeId);
      }
      refreshRoutePlannerUi();
      return;
    }
    if (event.target.matches("[data-execution-photo-input]")) {
      const task = taskById(event.target.dataset.taskId);
      if (!task) return;
      task.completionPhotos ||= task.completionPhoto
        ? [task.completionPhoto]
        : [];
      const files = Array.from(event.target.files || []).slice(
        0,
        Math.max(0, 3 - task.completionPhotos.length),
      );
      let aiWarning = "";
      for (const file of files) {
        const analysis = await analyzePhoto(file);
        if (analysis.thumbnail) {
          task.completionPhotos.push(analysis);
          if (analysis.aiStatus !== "pass" && !aiWarning) {
            aiWarning = analysis.aiMessage;
          }
        }
      }
      saveState();
      const photoBlock = document.getElementById("executionPhotoBlock");
      if (photoBlock) {
        photoBlock.outerHTML = renderExecutionPhotoBlock(task);
      }
      event.target.value = "";
      showToast(
        aiWarning
          ? `图片已添加，AI 提示：${aiWarning}`
          : "完成反馈图片已添加",
        aiWarning ? "error" : "success",
      );
      return;
    }
    if (event.target.matches("[data-category-photo-input]")) {
      const file = event.target.files?.[0];
      if (!file) return;
      const taskId = event.target.dataset.taskId;
      const categoryId = event.target.dataset.category;
      const photoIndex = Number(event.target.dataset.photoIndex || 0);
      const analysis = await analyzePhoto(file);
      if (analysis.aiStatus === "fail") {
        showToast(`AI自检未通过：${analysis.aiMessage}`, "error");
        event.target.value = "";
        return;
      }
      const draft = getDraft(taskId);
      applyCategoryPhotoResult(taskId, categoryId, photoIndex, analysis);
      showToast(`大项照片已通过 AI 自检：${analysis.aiMessage}`);
      return;
    }
    if (event.target.matches("[data-item-photo-input]")) {
      const file = event.target.files?.[0];
      if (!file) return;
      const taskId = event.target.dataset.taskId;
      const itemId = event.target.dataset.itemId;
      const analysis = await analyzePhoto(file);
      if (analysis.aiStatus === "fail") {
        showToast(`AI自检未通过：${analysis.aiMessage}`, "error");
        event.target.value = "";
        return;
      }
      const draft = getDraft(taskId);
      applyItemPhotoResult(taskId, itemId, analysis);
      showToast(`不符合项照片已通过 AI 自检：${analysis.aiMessage}`);
      return;
    }
    if (event.target.matches("[data-role-select]")) {
      state.role = event.target.value;
      if (state.role === "store") {
        ui.mobileTab = "home";
      } else {
        state.page = "overview";
        ui.mobileTab = "home";
      }
      saveState();
      closeModal();
      closeDrawer();
      renderApp();
      showToast(`已切换到${roleLabels[state.role]}`);
      return;
    }
    if (event.target.matches("[data-action='report-period']")) {
      ui.reportPeriod = event.target.value;
      showToast("统计周期已更新");
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.id === "taskSearch") {
      ui.taskQuery = event.target.value;
      refreshTaskResults();
    }
    if (event.target.id === "storeSearch") {
      ui.storeQuery = event.target.value;
      refreshStoreResults();
    }
    if (event.target.id === "issueSearch") {
      ui.issueQuery = event.target.value;
      refreshIssueBoardView();
    }
    if (event.target.matches("[data-note-item]")) {
      const taskId = event.target.dataset.taskId;
      const itemId = event.target.dataset.noteItem;
      const draft = getDraft(taskId);
      draft.notes ||= {};
      draft.notes[itemId] = event.target.value;
      state.drafts[taskId] = draft;
      saveState();
      refreshInspectionUi(taskId);
    }
    if (event.target.matches("[data-task-completion-note]")) {
      const task = taskById(event.target.dataset.taskId);
      if (!task) return;
      task.completionNote = event.target.value;
      saveState();
    }
    if (event.target.matches("[data-category-feedback]")) {
      const taskId = event.target.dataset.taskId;
      const categoryId = event.target.dataset.categoryFeedback;
      const draft = getDraft(taskId);
      draft.categoryFeedback ||= {};
      draft.categoryFeedback[categoryId] = event.target.value;
      state.drafts[taskId] = draft;
      saveState();
      refreshInspectionUi(taskId);
    }
  });

  function openTaskByContext(taskId) {
    const task = taskById(taskId);
    if (!task) return;
    if (state.role === "hq" && task.status === "submitted") {
      openTaskReviewModal(task.id);
      return;
    }
    if (
      state.role === "supervisor" &&
      task.assigneeRole === "supervisor" &&
      !["submitted", "completed"].includes(task.status)
    ) {
      if (task.taskType === "inspection") openInspection(task.id);
      else openExecutionTaskModal(task.id);
      return;
    }
    if (
      state.role === "store" &&
      task.assigneeRole === "store" &&
      task.storeId === state.storeId &&
      ["pending", "in_progress", "rejected"].includes(task.status)
    ) {
      openExecutionTaskModal(task.id);
      return;
    }
    openTaskReviewModal(task.id);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeDrawer();
    }
    if (
      event.key === "Enter" &&
      event.target.id === "globalSearch"
    ) {
      const result = findGlobalResult(event.target.value);
      if (!result) {
        showToast("未找到匹配内容，请换个关键词试试", "error");
        return;
      }
      if (result.type === "store") openStoreDrawer(result.id);
      if (result.type === "issue") openIssueDrawer(result.id);
      if (result.type === "task") openTaskByContext(result.id);
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id === "newStoreForm") {
      event.preventDefault();
      const data = new FormData(event.target);
      const name = String(data.get("name")).trim();
      state.stores.push({
        id: `store-${Date.now()}`,
        name,
        short: name.slice(-3, -1) || name.slice(-1),
        city: data.get("city"),
        address: data.get("address"),
        manager: "门店人员",
        managerInitials: "门",
        inspector: data.get("inspector") || "黄庆",
        score: null,
        lastInspection: "未巡检",
        issues: 0,
        risk: "待巡检",
        trend: 0,
        sales: 0,
        grossProfit: 0,
        margin: 0,
        newCustomers: 0,
        momChange: 0,
        status: data.get("status"),
        businessHours: data.get("businessHours"),
        contact: data.get("contact") || "门店人员",
        phone: data.get("phone") || "",
      });
      saveState();
      closeModal();
      renderApp();
      showToast("门店已新增");
      return;
    }
    if (event.target.id === "executionTaskForm") {
      event.preventDefault();
      const data = new FormData(event.target);
      const task = taskById(data.get("taskId"));
      if (!task) return;
      const note = String(data.get("completionNote") || "").trim();
      if (!note) {
        showToast("请填写任务完成反馈", "error");
        return;
      }
      const completionPhotos =
        task.completionPhotos ||
        (task.completionPhoto ? [task.completionPhoto] : []);
      if (task.assigneeRole === "store" && !completionPhotos.length) {
        showToast("门店运营任务需上传至少一张完成反馈图片", "error");
        return;
      }
      task.completionNote = note;
      task.status = "submitted";
      task.reviewStatus = "pending_review";
      task.progress = 100;
      task.completedAt = "2026-11-25";
      saveState();
      closeModal();
      renderApp();
      showToast("任务已提交，等待总经理审核");
      return;
    }
    if (event.target.id === "storeSettingForm") {
      event.preventDefault();
      const data = new FormData(event.target);
      const store = storeById(data.get("storeId"));
      if (!store) return;
      store.name = String(data.get("name")).trim();
      store.status = data.get("status");
      store.businessHours = data.get("businessHours");
      store.contact = data.get("contact");
      store.phone = data.get("phone");
      store.address = data.get("address");
      saveState();
      closeModal();
      renderApp();
      showToast("门店设置已保存");
      return;
    }
    if (event.target.id === "accountForm") {
      event.preventDefault();
      const data = new FormData(event.target);
      const role = data.get("role");
      const selectedStore = storeById(data.get("storeId"));
      state.accounts.unshift({
        id: `ACC-${Date.now()}`,
        name: String(data.get("name")).trim(),
        phone: String(data.get("phone")).trim(),
        role,
        store:
          role === "门店人员"
            ? selectedStore?.name || "未绑定门店"
            : role === "督导"
              ? "商丘区域"
              : "全区域",
        storeId: role === "门店人员" ? selectedStore?.id || "" : "",
        status: data.get("status"),
      });
      saveState();
      closeModal();
      renderApp();
      showToast("人员账号已新增");
      return;
    }
    if (event.target.id === "assignTaskForm") {
      event.preventDefault();
      const data = new FormData(event.target);
      const taskType = data.get("taskType");
      const assigneeRole =
        taskType === "operation" ? "store" : "supervisor";
      const selectedStore = storeById(data.get("storeId"));
      const [year, month, day] = String(data.get("due")).split("-");
      state.tasks.unshift({
        id: `task-assigned-${Date.now()}`,
        storeId: data.get("storeId"),
        title: String(data.get("title")).trim(),
        templateId: taskType === "inspection" ? data.get("templateId") : null,
        taskType,
        assigneeRole,
        status: "pending",
        reviewStatus: "not_submitted",
        progress: 0,
        date: String(Number(day)),
        month: `${Number(month)}月`,
        dueLabel: `${Number(month)}月 ${Number(day)}日`,
        inspector:
          assigneeRole === "store"
            ? "门店人员"
            : data.get("supervisor") || "黄庆",
        createdBy: "总经理",
        description: data.get("description"),
        instructionPhotos: [...ui.assignTaskPhotos],
      });
      saveState();
      closeModal();
      renderApp();
      showToast(
        `任务已下发至${
          assigneeRole === "store" ? selectedStore?.name : data.get("supervisor")
        }`,
      );
      return;
    }
    if (event.target.id === "startVisitForm") {
      event.preventDefault();
      const data = new FormData(event.target);
      const [year, month, day] = String(data.get("date")).split("-");
      const storeId = data.get("storeId");
      const templateId = data.get("templateId");
      const taskId = `task-live-${Date.now()}`;
      state.tasks.unshift({
        id: taskId,
        storeId,
        title: templateById(templateId).name,
        templateId,
        date: String(Number(day)),
        month: `${Number(month)}月`,
        dueLabel: `现场发起 · ${data.get("time") || "15:30"}`,
        status: "in_progress",
        progress: 0,
        inspector: "黄庆",
        note: data.get("note"),
        initiatedBy: "督导现场",
      });
      saveState();
      closeDrawer();
      showToast("巡店已发起，开始现场检查");
      openInspection(taskId);
      return;
    }
    if (event.target.id === "newTaskForm") {
      event.preventDefault();
      const data = new FormData(event.target);
      const [year, month, day] = String(data.get("date")).split("-");
      const storeId = data.get("storeId");
      const templateId = data.get("templateId");
      const isUrgent = data.get("priority") === "urgent";
      state.tasks.unshift({
        id: `task-${Date.now()}`,
        storeId,
        title: templateById(templateId).name,
        templateId,
        date: String(Number(day)),
        month: `${Number(month)}月`,
        dueLabel: `${Number(month)}月 ${Number(day)}日 ${data.get("time") || "14:00"}`,
        status: isUrgent ? "urgent" : "pending",
        progress: 0,
        inspector: data.get("inspector"),
        note: data.get("note"),
      });
      saveState();
      closeModal();
      navigate("tasks");
      showToast("巡店任务已创建并通知执行督导");
      return;
    }
    if (event.target.id === "newIssueForm") {
      event.preventDefault();
      const data = new FormData(event.target);
      const store = storeById(data.get("storeId"));
      const [year, month, day] = String(data.get("due")).split("-");
      state.issues.unshift({
        id: `IS-${Math.floor(1100 + Math.random() * 800)}`,
        storeId: store.id,
        title: data.get("title"),
        category: data.get("category"),
        severity: data.get("severity"),
        status: "pending",
        due: `${Number(month)}月 ${Number(day)}日`,
        overdue: false,
        description:
          data.get("description") ||
          "现场巡检发现该问题，请门店负责人按运营标准及时整改。",
        reporter: "黄庆",
        assignee: store.manager,
        createdAt: "刚刚",
      });
      store.issues = state.issues.filter(
        (issue) => issue.storeId === store.id && issue.status !== "closed",
      ).length;
      saveState();
      closeModal();
      navigate("issues");
      showToast("整改问题已创建并指派对应门店人员");
    }
  });

  function updateNetworkState() {
    const badge = document.getElementById("network-badge");
    if (badge) badge.hidden = navigator.onLine;
    document.body.classList.toggle("is-offline", !navigator.onLine);
  }
  window.addEventListener("online", () => {
    updateNetworkState();
    showToast("网络已恢复，可获取最新版本与内容");
  });
  window.addEventListener("offline", () => {
    updateNetworkState();
    showToast("当前处于离线状态，操作会保存在本机", "error");
  });
  updateNetworkState();

  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => {
      const hadController = Boolean(navigator.serviceWorker.controller);
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!hadController || refreshing) return;
        refreshing = true;
        showToast("应用已更新，正在刷新");
        window.setTimeout(() => location.reload(), 500);
      });
      navigator.serviceWorker
        .register("./sw.js", { updateViaCache: "none" })
        .then((registration) => {
          registration.addEventListener("updatefound", () => {
            const worker = registration.installing;
            if (!worker) return;
            worker.addEventListener("statechange", () => {
              if (
                worker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                showToast("检测到新版本，正在应用更新");
                worker.postMessage({ type: "SKIP_WAITING" });
              }
            });
          });
          window.setInterval(() => registration.update(), 60_000);
        })
        .catch(() => {
          // Direct file preview and restricted environments can skip PWA caching.
        });
    });
  }

  renderApp();
})();
