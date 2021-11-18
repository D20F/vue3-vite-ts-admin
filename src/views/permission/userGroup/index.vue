<template>
    <div>
        <el-button
            type="primary"
            size="medium"
            v-permission="'group_add'"
            @click=";(dialogFormVisible = true), (form.mode = 'add')"
        >
            新增用户组
        </el-button>

        <el-table :data="tableData" v-loading="tableDataLoading" style="width: 100%">
            <el-table-column prop="roleName" label="名称" width="180"></el-table-column>
            <el-table-column prop="roleDescribe" label="备注" width="180"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="mini" v-permission="'group_edit'" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" v-permission="'group_del'" @click="handleDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            v-model:current-page="pagination.page"
            @current-change="currentChange"
            :hide-on-single-page="true"
        ></el-pagination>

        <!-- <el-dialog title="权限配置" v-model:visible="dialogFormVisible" @close="dialogClose">
      <el-button type="primary" @click="setCheckedKeys(getTreeKey())" size="mini" round>全选</el-button>
      <el-button type="success" @click="setCheckedKeys([])" size="mini" round>清空</el-button>

      <el-input style="margin: 10px 0" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree
        :data="tree"
        show-checkbox
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :filter-node-method="filterNode"
        :default-checked-keys="defaultSelect"
        check-strictly
      >
      </el-tree>
      <el-form :model="form">
        <el-form-item label="名称" label-width="40px">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="40px">
          <el-input v-model="form.roleDescribe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </template>
        </el-dialog>-->
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

interface tableItem {
    [key: string]: any
}
interface treeItem {
    [key: string]: any
}
interface formItem {
    roleName: string
    roleDescribe: string
    mode: string
    id: string
}

const tableData = ref<tableItem[]>([])
const tree = ref<treeItem[]>([])
const dialogFormVisible = ref(false)
const tableDataLoading = ref(false)
const filterText = ref('')
const defaultSelect = ref<number[]>([])
const form = reactive<formItem>({
    roleName: '',
    roleDescribe: '',
    mode: '',
    id: ''
})
const defaultProps = reactive({
    children: 'children',
    label: 'name'
})
const pagination = reactive({
    total: 0,
    page: 1,
    pageSize: 10
})

const handleEdit = <T extends tableItem>(v: T) => {
    console.log(v)
}
const handleDelete = <T extends tableItem>(v: T) => {
    console.log(v)
}

const currentChange = (v: any) => {
    pagination.page = v
    console.log(v)
}

const dialogClose = () => {
    let form_in: any = form
    for (let key in form_in) {
        form_in[key] = ''
    }
}
</script>
