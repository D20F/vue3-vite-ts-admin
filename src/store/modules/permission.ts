import { constantRoutes, asyncRoutes } from '@/router'
import settings from '@/settings'
import { PermissionTy } from '@/types/store'
import { RouteItemTy, RouterRowTy, RouterTy } from '@/types/router'
import { ObjTy } from '@/types/common'



/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: Array<string>, route: RouteItemTy) {
    if (route.meta && route.meta.roles) {
        return roles.some((role) => route.meta?.roles?.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: RouterTy, roles: Array<string>) {
    const res: RouterTy = []
    routes.forEach((route) => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state: PermissionTy = {
    isGetUserInfo: false, // get userInfo
    routes: [], //将过滤后的异步路由和静态路由集合
    addRoutes: [] //过滤后的异步路由
}

const actions = {
    generateRoutes({ commit }: ObjTy, roles: Array<string>) {
        return new Promise(async (resolve) => {
            let accessedRoutes
            if (settings.permissionMode === 'roles') {
                //filter by role
                if (roles.includes('admin')) {
                    accessedRoutes = asyncRoutes || []
                } else {

                    // 这里修改不用asyncRoutes 应该await来获取后台的路径  然后用 roles 角色来过滤
                    // 这里是用维护一个路由表按照角色来筛选
                    // 还是维护多个角色表 按照里面路由来呢


                    console.log(asyncRoutes)

                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                }
            }
            commit('M_routes', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

const mutations = {
    M_routes: (state: PermissionTy, routes: RouterTy) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    },
    M_isGetUserInfo: (state: PermissionTy, data: boolean) => {
        state.isGetUserInfo = data
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
