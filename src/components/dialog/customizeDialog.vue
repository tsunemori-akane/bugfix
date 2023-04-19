<template>
    <el-dialog
      v-model="visible"
      title="提示"
      :width="width"
      :top="top"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="beforeClose"
      :custom-class="`dialog ${customClass}`"
      destroy-on-close
    >
      <template #default>
        <div
          class="dialog__content"
          :style="{ height: contentHeight, maxHeight: contentMaxHeight }"
        >
          <component
            :is="customizeComp"
            ref="formComponentRef"
            :disabled="disabled"
            :data="data"
            @cancel="onCancelCalled"
            @submit="onSubmitCalled"
          />
        </div>
      </template>
   
      <template v-if="buttonsShow" #footer>
        <div>
          <el-button
            v-if="submitButtonShow"
            type="primary"
            v-bind="{ icon: parseElIcon(submitIcon).name }"
            :loading="loading"
            @click="onSubmitClick"
          >
            <svg-icon
              v-if="parseSvgIcon(submitIcon).show"
              :icon-class="parseSvgIcon(submitIcon).name"
            />
            {{ submitButtonLabel }}
          </el-button>
          <template v-if="customButtons">
            <template v-for="(customButton, index) in customButtons" :key="index">
              <el-button
                v-bind="customButton"
                :icon="parseElIcon(customButton.icon).name"
                :type="customButton.primary ?? 'primary'"
                @click="onCustomButtonClick(customButton)"
              >
                <svg-icon
                  v-if="parseSvgIcon(customButton.icon).show"
                  :icon-class="parseSvgIcon(customButton.icon).name"
                />
                {{ customButton.label }}</el-button
              >
            </template>
          </template>
          <el-button
            v-if="cancelButtonShow"
            v-bind="{ icon: parseElIcon(cancelIcon).name }"
            @click="close()"
          >
            <svg-icon
              v-if="parseSvgIcon(cancelIcon).show"
              :icon-class="parseSvgIcon(cancelIcon).name"
            />
            {{ cancelButtonLabel }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </template>

<script setup lang="ts">
import { ref, computed } from 'vue'
 
const props = defineProps({
  customizeComp: {
    type: [Object, String],
    default: () => 'div'
  },
  width: {
    type: String
  },
  top: {
    type: String
  },
  bottom: {
    type: String
  },
  height: {
    type: String
  },
  buttonsShow: {
    type: Boolean
  },
  submitButtonShow: {
    type: Boolean
  },
  submitButtonLabel: {
    type: String
  },
  submitIcon: {
    type: String
  },
  cancelButtonShow: {
    type: Boolean
  },
  cancelButtonLabel: {
    type: String
  },
  cancelIcon: {
    type: String
  },
  disabled: {
    type: Boolean
  },
  data: {
    type: Object
  },
  customButtons: {
    type: Array
  },
  customClass: {
    type: String
  },
  beforeClose: {
    type: Function,
    default: null
  }
})
const FOOTER_HEIGHT = '70px'
 
// 显示双绑
const visible = ref(true)
const emits = defineEmits(['cancel', 'submit', 'customSubmit'])
const loading = ref(false)
 
const contentHeight = computed(() => {
  if (props.height != null) {
    return props.height
  }
  if (props.top == null) {
    return 'auto'
  }
  if (props.bottom != null) {
    return `calc(100vh - ${props.top} - ${props.bottom} - ${FOOTER_HEIGHT} - 40px)`
  }
  return 'auto'
})
 
const contentMaxHeight = computed(() => {
  if (props.height == null || props.top == null || props.bottom == null) {
    return `calc(80vh - 110px)`
  }
  return `calc(100vh - ${props.top} - ${props.bottom} - ${FOOTER_HEIGHT})`
})
 
const formComponentRef = ref(null)
 
const close = async (bySubmit = false) => {
  if (!bySubmit) {
    await props.beforeClose?.(props.data, () => getValue())
    emits('cancel')
  }
  visible.value = false
}
 
const parseSvgIcon = (str) => {
  const [type, name] = (str ?? '').split(':')
  const isSvg = type === 'svg'
  return { show: isSvg, name: isSvg ? name : null }
}
 
const parseElIcon = (str) => {
  const [type, name] = (str ?? '').split(':')
  return { show: type === 'el', name }
}
 
const validate = async () => {
  if (formComponentRef.value.validate) {
    await formComponentRef.value.validate()
  }
}
 
const getValue = async () => {
  let formData = null
  if (
    formComponentRef.value.getValue &&
    typeof formComponentRef.value.getValue === 'function'
  ) {
    formData = await formComponentRef.value.getValue()
  }
  return formData
}
const closeBySubmit = () => {
  close(true)
}
const showLoading = () => {
  loading.value = true
}
 
const hideLoading = () => {
  loading.value = false
}
const onSubmitClick = async () => {
  await validate()
  const formData = await getValue()
  emits('submit', formData, { close: closeBySubmit, showLoading, hideLoading })
}
 
const onCustomButtonClick = async (customButton) => {
  const onButtonClick = customButton.onButtonClick
  if (!onButtonClick || typeof onButtonClick !== 'function') {
    console.error(
      '[Dialog] you should set a "onButtonClick" function for customButton'
    )
    return
  }
  await onButtonClick({ validate, getValue, close })
}
 
const onCancelCalled = () => {
  close()
}
 
const onSubmitCalled = () => {
  onSubmitClick()
}
 
const beforeClose = async (done) => {
  await props.beforeClose?.(props.data, () => getValue())
  emits('cancel')
  done()
}
</script>