import musicSdk from '@/utils/musicSdk'
import { updateSetting } from './common'
import settingState from '@/store/setting/state'
import { destroyUserApi, setUserApi } from './userApi'
import apiSourceInfo from '@/utils/musicSdk/api-source-info'
import { state as userApiState } from '@/store/userApi'


export const setApiSource = (apiId: string) => {
  if (global.lx.apiInitPromise[1]) {
    global.lx.apiInitPromise[0] = new Promise(resolve => {
      global.lx.apiInitPromise[1] = false
      global.lx.apiInitPromise[2] = (result: boolean) => {
        global.lx.apiInitPromise[1] = true
        resolve(result)
      }
    })
  }

  // 立即同步更新配置状态，确保 Native 端的 init 事件回调对比 targetId 时单源一致
  if (apiId != settingState.setting['common.apiSource']) {
    updateSetting({ 'common.apiSource': apiId })
    requestAnimationFrame(() => {
      global.state_event.apiSourceUpdated(apiId)
    })
  }

  if (/^user_api/.test(apiId)) {
    setUserApi(apiId).catch(err => {
      if (!global.lx.apiInitPromise[1]) global.lx.apiInitPromise[2](false)
      console.log('setUserApi error:', err)
      let fallbackApi = userApiState.list.find(api => api.id !== apiId)
      if (fallbackApi && fallbackApi.id != settingState.setting['common.apiSource']) {
        setApiSource(fallbackApi.id)
      }
    })
  } else {
    // @ts-expect-error
    global.lx.qualityList = musicSdk.supportQuality[apiId] ?? {}
    destroyUserApi()
    if (!global.lx.apiInitPromise[1]) global.lx.apiInitPromise[2](true)
  }
}

