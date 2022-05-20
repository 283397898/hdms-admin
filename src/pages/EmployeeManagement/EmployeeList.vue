<script lang="ts" setup name="employeeList">
import { reactive, ref } from 'vue';
import { Delete, Edit, Plus, Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  deleteEmployee,
  getEmployeeList,
  postEmployee,
  searchEmployee,
  updateEmployee,
} from '../../apis/EmployeeManagement';
import { Employee, Label, QueryData, Role } from '../../type';
import { useEmployeeStore } from '../../stores/EmployeeStore';

const { employee } = useEmployeeStore();
const tableData = ref<Employee[]>();
getEmployeeList().then(({ data }) => {
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
    searchEmployee(JSON.parse(JSON.stringify(queryData))).then(({ data }) => {
      tableData.value = data;
    });
  }
};

const dialogVisible = ref<boolean>(false);
const form = ref<Employee>();
const isEdit = ref<boolean>(true);
const editEmp = (row: Employee) => {
  isEdit.value = true;
  form.value = row;
  dialogVisible.value = true;
};
const addEmp = () => {
  isEdit.value = false;
  dialogVisible.value = true;
  form.value = {
    empUsername: '',
    empName: '',
    empRole: Role.POWERLESS,
  };
};
const isDisabled = (empRole: Role) =>
  employee.empRole !== Role.ADMIN && empRole === Role.ADMIN;
const handelEditConfirm = () => {
  if (form.value) {
    updateEmployee(form.value).then(({ data }) => {
      tableData.value = data;
    });
  }
  dialogVisible.value = false;
};
const handelAddConfirm = () => {
  if (form.value) {
    postEmployee([form.value]).then(({ data }) => {
      tableData.value = data;
    });
  }
  dialogVisible.value = false;
};
const roleLabel: Label<Role>[] = [
  { label: '管理员', value: Role.ADMIN },
  { label: '人事', value: Role.PERSONNEL },
  { label: '施工', value: Role.BUILDER },
  { label: '设计', value: Role.DESIGNER },
  { label: '客服', value: Role.SERVICE },
  { label: '无权限', value: Role.POWERLESS },
];
const showLabel = (empRole: Role) => {
  let label;
  roleLabel.forEach((role) => {
    if (role.value === empRole) {
      label = role.label;
    }
  });
  return label;
};
const openMessageBox = (employee: Employee) => {
  ElMessageBox.confirm('是否删除此条数据？', '警告！', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消操作',
    type: 'warning',
  })
    .then(() => {
      deleteEmployee(employee).then(({ data }) => {
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
const validateEmpUsername = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('不可为空'));
  } else if (value.length !== 11) {
    callback(new Error('工号应为11位'));
  } else {
    callback();
  }
};
const validateEmpName = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('不可为空'));
  } else {
    callback();
  }
};

const rules = reactive({
  empUsername: [{ validator: validateEmpUsername, trigger: 'blur' }],
  empName: [{ validator: validateEmpName, trigger: 'blur' }],
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
              <el-option label="员工工号" value="empUsername" />
              <el-option label="员工姓名" value="empName" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" @click="handelSearch" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Plus" type="primary" @click="addEmp">
          添加员工
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="员工ID" prop="empId" />
      <el-table-column label="员工工号" prop="empUsername" />
      <el-table-column label="员工姓名" prop="empName" />
      <el-table-column label="员工角色">
        <template #default="scope">
          <el-tag>{{ showLabel(scope.row.empRole) }}</el-tag>
        </template>
      </el-table-column>
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
    :title="isEdit ? '修改人员信息' : '添加人员信息'"
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
        <el-form-item v-if="isEdit" label="员工ID：">
          <el-input v-model="form.empId" disabled />
        </el-form-item>
        <el-form-item label="员工工号：" prop="empUsername">
          <el-input v-model="form.empUsername" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="员工姓名：" prop="empName">
          <el-input v-model="form.empName" />
        </el-form-item>
        <el-form-item label="员工角色：">
          <el-select
            v-model="form.empRole"
            :disabled="isDisabled(form.empRole)"
            placeholder="选择员工角色"
            style="width: 100%"
          >
            <template v-for="item in roleLabel" :key="item.value">
              <el-option :label="item.label" :value="item.value" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-if="isEdit" type="primary" @click="handelEditConfirm">
          确认修改
        </el-button>
        <el-button v-else type="primary" @click="handelAddConfirm">
          确认添加
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
