import { createVNode, render } from 'vue'
import Dialog from './customizeDialog.vue'
import { get } from 'lodash'
const containers = {}
let seed = 1
 
const parseOptions = (options = {}) => {
  const title = get(options, 'title', '')
  const width = get(options, 'size.width', '40%')
  const height = get(options, 'size.height', null)
  const top = get(options, 'position.top', null)
  const bottom = get(options, 'position.bottom', null)
  const buttonsShow = get(options, 'buttons.show', true)
  const submitButtonShow = get(options, 'buttons.submit.show', true)
  const submitButtonLabel = get(options, 'buttons.submit.label', '确定')
  const submitIcon = get(options, 'buttons.submit.icon', 'el:el-icon-check')
  const cancelButtonShow = get(options, 'buttons.cancel.show', true)
  const cancelButtonLabel = get(options, 'buttons.cancel.label', '取消')
  const cancelIcon = get(options, 'buttons.cancel.icon', 'el:el-icon-close')
  const disabled = get(options, 'disabled', false)
  const beforeResolve = get(options, 'beforeResolve', null)
  const data = get(options, 'data', {})
  const customButtons = get(options, 'custom.buttons', null)
  const customClass = get(options, 'customClass')
  const beforeClose = get(options, 'beforeClose', null)
  return {
    title,
    width,
    height,
    top,
    bottom,
    buttonsShow,
    submitButtonShow,
    submitButtonLabel,
    submitIcon,
    cancelButtonShow,
    cancelButtonLabel,
    cancelIcon,
    disabled,
    beforeResolve,
    data,
    customButtons,
    customClass,
    beforeClose
  }
}
 
const getFather = () => {
  const fullScreen = document.querySelector(':not(:root):fullscreen')
  if (fullScreen) {
    return fullScreen
  }
  return document.querySelector('body')
}
 
/**
 * 显示一个为增删改查专门设计的弹窗组件
 * @param {*} component 表单组件
 * @param {*} options 配置
 * @returns Promise
 * @description 更多使用介绍，请移步 ./README.md
 */
export default function useDialog(component, options = {}) {
  const { beforeResolve, ...propsOptions } = parseOptions(options)
  return new Promise((resolve, reject) => {
    const id = 'dialog_' + seed++
    const container = document.createElement('div')
    containers[id] = container
    container.className = `container_${id}`
    const father = getFather()
    father.appendChild(container)
    const clearContainer = () => {
      render(null, container)
      delete containers[id]
    }
    const onCancel = () => {
      clearContainer()
      reject()
    }
    const onSubmit = async (formData, { close, showLoading, hideLoading }) => {
      if (beforeResolve && typeof beforeResolve === 'function') {
        showLoading()
 
        try {
          const res = await beforeResolve(formData)
          close()
          clearContainer()
          resolve(res)
        } catch (err) {
          console.error(err)
          hideLoading()
        }
      } else {
        close()
        clearContainer()
        resolve(formData)
      }
    }
    const onCustomSubmit = async () => {
      close()
      // resolve()
    }
    const vm = createVNode(Dialog, {
      customizeComp: component,
      ...propsOptions,
      onCancel,
      onSubmit,
      onCustomSubmit
    })
    render(vm, container)
  })
}