<script setup lang="ts" name="userList">
import { reactive, ref } from 'vue';
import { Delete, Edit, Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { User, QueryData } from '../../type';
import {
  deleteUser,
  getUserList,
  searchUser,
  updateUser,
} from '../../apis/UserManagement';

const tableData = ref<User[]>();
getUserList().then(({ data }) => {
  tableData.value = data;
});
const queryData = reactive<QueryData>({
  type: '',
  data: '',
});
const handelSearch = () => {
  if (queryData.type === '') {
    ElMessage({
      type: 'warning',
      message: '请选择搜索类型！',
    });
  } else if (queryData.data === '') {
    ElMessage({
      type: 'warning',
      message: '请输入搜索内容！',
    });
  } else {
    searchUser(JSON.parse(JSON.stringify(queryData))).then(({ data }) => {
      tableData.value = data;
    });
  }
};

const dialogVisible = ref<boolean>(false);
const form = ref<User>();
const editEmp = (row: User) => {
  form.value = row;
  dialogVisible.value = true;
};

const handelEditConfirm = () => {
  if (form.value) {
    updateUser(form.value).then(({ data }) => {
      tableData.value = data;
    });
  }
  dialogVisible.value = false;
};
const openMessageBox = (employee: User) => {
  ElMessageBox.confirm('是否删除此条数据？', '警告！', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消操作',
    type: 'warning',
  })
    .then(() => {
      deleteUser(employee).then(({ data }) => {
        tableData.value = data;
        ElMessage({
          type: 'success',
          message: '删除成功！',
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作！',
      });
    });
};
const validatePhone = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('不可为空'));
  } else if (value.length !== 11) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
};
const validateNickname = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('不可为空'));
  } else {
    callback();
  }
};

const rules = reactive({
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  nickname: [{ validator: validateNickname, trigger: 'blur' }],
});
</script>

<template>
  <el-card style="margin-bottom: 20px">
    <el-form inline>
      <el-form-item style="width: 400px">
        <el-input
          v-model="queryData.data"
          class="input-with-select"
          placeholder="请输入搜索字段"
        >
          <template #prepend>
            <el-select
              v-model="queryData.type"
              placeholder="类型"
              style="width: 110px"
            >
              <el-option label="用户名" value="username" />
              <el-option label="手机号码" value="phone" />
              <el-option label="昵称" value="nickname" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" @click="handelSearch" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="用户ID" prop="userId" />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="手机号码" prop="phone" />
      <el-table-column label="用户昵称" prop="nickname" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button-group class="ml-4">
            <el-button
              :icon="Edit"
              type="primary"
              @click="editEmp(scope.row)"
            />
            <el-button
              :icon="Delete"
              type="danger"
              @click="openMessageBox(scope.row)"
            />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    :show-close="false"
    title="修改人员信息"
    width="600px"
    @close="form.value = undefined"
  >
    <div style="width: 500px; margin: 0 auto">
      <el-form
        :model="form"
        label-position="left"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="用户ID：">
          <el-input v-model="form.userId" disabled />
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="昵称：" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handelEditConfirm">
          确认修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
  overflow: hidden;
}
</style>
