<template>
  <BackgroundMask @bgclick="emits('c_close')">
    <div class="fixed right-10 top-1/2 max-h-96 overflow-y-scroll bg-white border shadow rounded-lg p-4 w-60" style="transform: translateY(-50%);">
      <ul class="flex flex-col gap-4">
        <li class="border-b">
          <h3>插入链接</h3>
          <input type="text" placeholder="enter your url" class="block w-full focus:outline-none mt-1" v-model="block.addition.link"/>
        </li>
      </ul>
    </div>
  </BackgroundMask>
</template>

<script setup>
import BackgroundMask from '@/components/BackgroundMask.vue'
import MindStore from '@/stores/MindStore';
import { ref, watch } from 'vue';

const props = defineProps({
  id: {
    type   : String,
    default: ''
  }
})

const block = ref(null)

watch(
  () => props.id,
  id => {
    const b     = MindStore().get_block(id)
    if (!b) return
    block.value = b
  },
  { immediate: true }
)

const emits = defineEmits(['c_close'])
</script>