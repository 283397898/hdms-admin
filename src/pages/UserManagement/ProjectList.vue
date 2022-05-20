<script lang="ts" name="projectList" setup>
import { computed, reactive, ref } from 'vue';
import { Delete, Edit, Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Project, QueryData, Structure } from '../../type';
import {
  deleteProject,
  getProjectList,
  searchProject,
  updateProject,
} from '../../apis/UserManagement';

const tableData = ref<Project[]>();
getProjectList().then(({ data }) => {
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
    searchProject(JSON.parse(JSON.stringify(queryData))).then(({ data }) => {
      tableData.value = data;
    });
  }
};

const dialogVisible = ref<boolean>(false);
const form = ref<Project>();
const structure = ref<string>();

const editEmp = (row: Project) => {
  form.value = row;
  structure.value = JSON.stringify(row.structure, null, 4);
  dialogVisible.value = true;
};

const handelEditConfirm = () => {
  if (form.value) {
    updateProject(form.value).then(({ data }) => {
      tableData.value = data;
    });
  }
  dialogVisible.value = false;
};
const openMessageBox = (employee: Project) => {
  ElMessageBox.confirm('是否删除此条数据？', '警告！', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消操作',
    type: 'warning',
  })
    .then(() => {
      deleteProject(employee).then(({ data }) => {
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
const showStructure = (structure: Structure) => {
  const keys = Object.getOwnPropertyNames(structure);
  return keys.reduce((structureStr, key) => {
    structureStr += `${key}:${structure[key as keyof Structure]}, `;
    return structureStr;
  }, '');
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
  phone: [
    {
      validator: validatePhone,
      trigger: 'blur',
    },
  ],
  nickname: [
    {
      validator: validateNickname,
      trigger: 'blur',
    },
  ],
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
              <el-option label="进度" value="progress" />
              <el-option label="地址" value="address" />
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
      <el-table-column label="项目ID" prop="projectId" />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="面积/m^2" prop="area" />
      <el-table-column label="结构">
        <template #default="scope">
          <span>{{ showStructure(scope.row.structure) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="address" />
      <el-table-column label="进度" prop="progress" />
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
        :rules="rules"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="用户ID：">
          <el-input v-model="form.projectId" disabled />
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="面积/m^2：" prop="area">
          <el-input v-model="form.area" />
        </el-form-item>
        <el-form-item label="结构：" prop="structure">
          <el-input v-model="structure" autosize type="textarea" />
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="进度：" prop="progress">
          <el-input v-model="form.progress" />
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
