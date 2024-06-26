<template>
  <Header title="面板">
    <template v-slot:icon>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    </template>
    <template v-slot:right-box>
      <div class="flex gap-2 border rounded py-1 px-2 bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input type="text" class="focus:outline-none focus:bg-white w-full bg-transparent" placeholder="Search by Address" v-model="search_message" />
        <svg v-show="show_clear_icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
    </template>
  </Header>
  <div class="flex justify-center flex-col gap-4 items-center py-8">
    <Card :width="680">
      <div class="flex flex-col gap-4">
        <!-- 地址 -->
        <div class="flex justify-between items-center text-gray-800 border-b py-2">
          <div class="flex gap-2">
            <a title="点我查看" class="cursor-pointer hover:text-blue-400" :href="`#/mind/${mind.address}`" target="_blank">{{ mind.address }}</a>
            <svg @click="oncopy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
            </svg>
            <!-- <svg @click="onqrcode" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
            </svg> -->
          </div>
          <div>
            <button v-if="show_save_btn" class="hover:text-blue-400 flex gap-1" @click="onsaveremote">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clip-rule="evenodd" />
              </svg>
              保存到云端</button>
            <button v-if="show_sale_btn" class="hover:text-blue-400  flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clip-rule="evenodd" />
              </svg>
              设置付费阅读
            </button>
          </div>
        </div>
        <!-- 标题 -->
        <h1 class="text-xl">{{ mind.title }}</h1>
        <div class="flex flex-wrap gap-4 items-start">
          <Block v-for="item in mind.children" :key="item.id" :block="item" :need_children="false"></Block>
        </div>
        <!-- 时间信息 -->
      </div>
    </Card>
    <Card :width="680">
      <div class="flex justify-between text-sm text-gray-800 my-1">
        <p>今日点击量 / 总量：1937 / 4593</p>
        <SwitchButton @c_swicth="onswitchviews"></SwitchButton>
      </div>
      <div id="views" style="width: 100%; height: 200px;"></div>
    </Card>
    <Card :width="680">
      <div class="flex justify-between text-sm text-gray-800 my-1">
        <p>今日点赞 / 总量：1937 / 4593</p>
        <div>周 ｜ 月 ｜ 年</div>
      </div>
      <div id="like" style="width: 100%; height: 200px;"></div>
    </Card>
    <Card :width="680">
      <div class="flex justify-between text-sm text-gray-800 my-1">
        <p>今日收藏量 / 总量：1937 / 4593</p>
        <div>周 ｜ 月 ｜ 年</div>
      </div>
      <div id="collection" style="width: 100%; height: 200px;"></div>
    </Card>
    <Card :width="680">
      <div class="flex justify-between text-sm text-gray-800 my-1">
        <p>今日新用户 / 总量：1937 / 4593</p>
        <div>周 ｜ 月 ｜ 年</div>
      </div>
      <div id="user" style="width: 100%; height: 200px;"></div>
    </Card>
    <Card :width="680">
      <div class="flex justify-between text-sm text-gray-800 my-1">
        <p>创建时间<br />{{ mind.create_time }}</p>
        <p>最后更新时间<br />{{ mind.update_time }}</p>
        <p>上传时间<br />{{ mind.update_time }}</p>
      </div>
    </Card>
  </div>
  <Save2RemoteDialog v-if="show_pay" @c_close="ondiaclose" />
  <Dialog v-if="show_qrcode" title="分享本页地址">
    <img :src="QRcode" width="200" height="200" />
  </Dialog>
</template>
<script setup>
import Header from '@/components/Header.vue'
import Card from '@/components/Card.vue'
import { computed, getCurrentInstance, onBeforeMount, onMounted, ref } from 'vue';
import utils from '@/utils/utils';
import MindStore from '@/stores/MindStore';
import Block from '@/components/Block.vue'
import Save2RemoteDialog from '@/components/Save2RemoteDialog.vue'
import SwitchButton from '@/components/SwitchButton.vue'
import Dialog from '@/components/Dialog.vue'
import * as echarts from 'echarts'
import router from '@/router'
import { MESSAGE_TYPE } from '@/stores/constant';
import { toDataURL } from 'qrcode';

const { proxy } = getCurrentInstance()
const mind = ref({})
const id   = utils.get_url_end_node()
// 先获取云端的，毕竟云端才有所有面板数据，否则拿本地的。
onBeforeMount(async () => {
  const key      = utils.is_private_key(id) ? id : ''
  const address  = utils.is_public_key(id) ? id : ''
  let   info     = await MindStore().request_mind(key, address)
  if (!info) {
    info = MindStore().load_mind(id)
    if (!info)
      return router.push({ name: 'not found' })
  }
  init_mind(info)
  mind.value = info
})

const init_mind = info => {
  info.children.forEach(b => {
    b.visible  = true
    b.editable = false
    b.expand   = false
  })
}

const search_message = ref('')
const show_clear_icon = computed(() => search_message.value.length > 0)

let chart_views
onMounted(() => {
  chart_views = echarts.init(document.getElementById('views'))
  const rows = ['06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16']
  const data = [1,2,3,4,5,6,7]
  const options = generate_chart_options(rows, data)
  chart_views.setOption(options)

  var myChart = echarts.init(document.getElementById('like'))
  const rows2 = ['06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16']
  const data2 = [1,2,3,4,5,6,7]
  const options2 = generate_chart_options(rows2, data2)
  myChart.setOption(options2)

  var myChart = echarts.init(document.getElementById('collection'))
  const rows3 = ['06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16']
  const data3 = [1,2,3,4,5,6,7]
  const options3 = generate_chart_options(rows3, data3)
  myChart.setOption(options3)

  var myChart = echarts.init(document.getElementById('user'))
  const rows4 = ['06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16']
  const data4 = [1,2,3,4,5,6,7]
  const options4 = generate_chart_options(rows4, data4)
  myChart.setOption(options4)
})

const generate_chart_options = (rows, data) => {
  const options = {
    grid: {
      left: '0%',
      right: '4%',
      bottom: '0%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: rows
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        data: data,
        itemStyle: {
          color: 'green'
        }
      }
    ]
  }
  return options
}

const config = [
  {
    label: '周',
    rows : ['06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16']
  },
  {
    label: '月',
    rows : ['06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16', '06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16']
  },
  {
    label: '年',
    rows : ['06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16', '06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16', '06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16', '06.10', '06.11', '06.12', '06.13', '06.14', '06.15', '06.16']
  }
]

const onswitchviews = index => {
  const rows = config[index].rows
  const data = new Array(rows.length).fill(0).map(a => Math.floor(Math.random() * 1000))
  const options = generate_chart_options(rows, data)
  chart_views.setOption(options)
}

const show_save_btn = computed(() => {
  if (!utils.is_private_key(id))
    return false
  if (mind.value.update_time != null)
    return false
  return true
})

const show_sale_btn = computed(() => {
  if (!utils.is_private_key(id))
    return false
  if (mind.value.update_time == null)
    return false
  return true
})

const show_pay = ref(false)
const ondiaclose = () => {
  show_pay.value = false
}
const onsaveremote = () => {
  show_pay.value = true
}

const oncopy = () => {
  navigator.clipboard.writeText(mind.value.address)
    .then(() => proxy.$message('已将地址复制到剪切板', MESSAGE_TYPE.SUCCESS))
    .catch(() => proxy.$message('复制失败，请重试', MESSAGE_TYPE.ERROR))
}

const QRcode = ref('')
const show_qrcode = ref(false)
const onqrcode = async () => {
  const message = `${location.origin}/#/dashboard/${mind.value.address}`
  QRcode.value = await toDataURL(message)
  show_qrcode.value = true
}
</script>