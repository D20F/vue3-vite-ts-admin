import { createRouter, createWebHashHistory, Router } from 'vue-router'
import Layout from '@/layout'
import { RouterTy } from '@/types/router'

export const constantRoutes: RouterTy = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/Login.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index'),
                //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
                meta: { title: 'Dashboard', elSvgIcon: 'Fold' }
            }
        ]
    },
    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: 'Example', icon: 'example' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/table/index'),
                meta: { title: 'Table', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () => import('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'tree' }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Form',
                component: () => import('@/views/form/index'),
                meta: { title: 'Form', icon: 'table' }
            }
        ]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index'),
                name: 'Menu2',
                meta: { title: 'menu2' }
            }
        ]
    },
    {
        path: '/external-link',
        component: Layout,
        children: [
            {
                component: () => { },
                path: 'https://github.com/jzfai/vue3-admin-ts.git',
                meta: { title: 'External Link', icon: 'link' }
            }
        ]
    },
    {
        path: '/error-log',
        component: Layout,
        children: [
            {
                path: 'log',
                component: () => import('@/views/error-log/index'),
                name: 'ErrorLog',
                meta: { title: 'Error Log', icon: 'bug' }
            }
        ]
    },
    {
        path: '/writing-demo',
        component: Layout,
        meta: { title: 'Writing Demo', icon: 'eye-open' },
        alwaysShow: true,
        children: [
            {
                path: 'hook',
                component: () => import('@/views/example/hook/Hook.vue'),
                name: 'Hook',
                meta: { title: 'Hook-Demo' }
            },
            {
                path: 'vuex-use',
                component: () => import('@/views/example/vuex-use/VuexUse.vue'),
                name: 'VuexUse',
                meta: { title: 'Vuex-Demo' }
            },
            {
                path: 'mock-test',
                component: () => import('@/views/example/mock-test/MockTest.vue'),
                name: 'MockTest',
                meta: { title: 'Mock-Demo' }
            },
            {
                path: 'svg-icon',
                component: () => import('@/views/example/svg-icon/SvgIcon.vue'),
                name: 'SvgIcon',
                meta: { title: 'Svg-Demo' }
            },
            {
                path: 'parent-children',
                component: () => import('@/views/example/parent-children/Parent.vue'),
                name: 'Parent',
                meta: { title: 'Parent-Children' }
            }
        ]
    }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: RouterTy = [
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/assignAuthority',
        alwaysShow: true, // will always show the root menu
        name: 'Permission',
        meta: {
            title: 'Permission',
            icon: 'lock',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [
            {
                path: 'page',
                component: () => import('@/views/permission/page'),
                name: 'PagePermission',
                meta: {
                    title: 'Page Permission',
                    // roles: ['admin'] // or you can only set roles in sub nav
                }
            },
            // {
            //     path: 'assignAuthority',
            //     component: () => import('@/views/permission/assignAuthority/index'),
            //     name: 'assignAuthority',
            //     meta: {
            //         title: 'assignAuthority'
            //         //roles: ['admin'] // or you can only set roles in sub nav
            //     }
            // },
            {
                path: 'manageUsers',
                component: () => import('@/views/permission/manageUsers/index'),
                name: 'manageUsers',
                meta: {
                    title: 'manageUsers'
                    //roles: ['admin'] // or you can only set roles in sub nav
                }
            },
            {
                path: 'userGroup',
                component: () => import('@/views/permission/userGroup/index'),
                name: 'userGroup',
                meta: {
                    title: 'userGroup'
                    //roles: ['admin'] // or you can only set roles in sub nav
                }
            },

            { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
        ]
    }
]

const router: Router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes
})

// export function resetRouter() {
//   const newRouter = createRouter({
//     history: createWebHashHistory(),
//     scrollBehavior: () => ({ top: 0 }),
//     routes: constantRoutes
//   })
// }

export default router
