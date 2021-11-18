/*page common ts*/
import { RouteRecordRaw } from 'vue-router'

/*此处扩展的类型*/
interface RouteItemTy {
  hidden?: boolean          // 是否隐藏                     
  alwaysShow?: boolean      // 是否直接显示                 
  name?: string             // 组件名                       
  fullPath?: string         // 完整路径                     
  path?: string             // 路径                         
  meta?: {   
    title: string           // 标题                         
    icon?: string           // 图标名                       
    affix?: boolean         // 词缀 默认为false             
    activeMenu?: string     // 默认激活菜单index 默认为空    
    breadcrumb?: boolean    // 默认为 true                 
    roles?: Array<string>   // 角色                         
    button?: Array<string>  // 按钮                         
    elSvgIcon?: string      // svgIcon        
  }
  children?: RouterTy       // 子级
  redirect?: string         // 重定向路径                          
}

type RouterRowTy = RouteRecordRaw & RouteItemTy
type RouterTy = Array<RouterRowTy>
