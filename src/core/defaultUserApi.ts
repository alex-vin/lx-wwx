import { changqingScript } from '@/resources/userApi/changqing'
import { huanyinScript } from '@/resources/userApi/huanyin'

export interface DefaultUserApi {
  id: string
  name: string
  description: string
  version: string
  author: string
  homepage: string
  onlineUrl: string
  allowShowUpdateAlert: boolean
  script: string
}

export const DEFAULT_USER_APIS: DefaultUserApi[] = [
  {
    id: 'user_api_changqing',
    name: '长青SVIP音源',
    description: '关注微信公众号: 元力菌 (支持酷狗/QQ/网易/酷我/咪咕)',
    version: '1.3.0',
    author: 'SVIP',
    homepage: 'https://ghproxy.net/raw.githubusercontent.com/pdone/lx-music-source/main/changqing/latest.js',
    onlineUrl: 'https://ghproxy.net/raw.githubusercontent.com/pdone/lx-music-source/main/changqing/latest.js',
    allowShowUpdateAlert: true,
    script: changqingScript,
  },
  {
    id: 'user_api_huanyin',
    name: '幻音音源',
    description: '支持 QQ音乐/酷我/网易云/咪咕多平台解析',
    version: 'v3',
    author: '竹佀',
    homepage: 'https://ghproxy.net/raw.githubusercontent.com/pdone/lx-music-source/main/huanyin/latest.js',
    onlineUrl: 'https://ghproxy.net/raw.githubusercontent.com/pdone/lx-music-source/main/huanyin/latest.js',
    allowShowUpdateAlert: true,
    script: huanyinScript,
  },
]
