<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import {
  getEmployeeList,
  searchEmployee,
  updateEmployee,
} from '../../apis/EmployeeManagement';
import { Employee, QueryData, Role } from '../../type';
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
  searchEmployee(JSON.parse(JSON.stringify(queryData))).then(({ data }) => {
    tableData.value = data;
  });
};
const dialogVisible = ref(false);
const form = ref<Employee>();
const editEmp = (row: Employee) => {
  form.value = row;
  dialogVisible.value = true;
};
const isDisabled = (empRole: Role) =>
  employee.empRole !== Role.ADMIN && empRole === Role.ADMIN;
const handelConfirm = () => {
  if (form.value) {
    updateEmployee(form.value).then(({ data }) => {
      tableData.value = data;
    });
  } else {
    console.log('err');
  }
  dialogVisible.value = false;
};
</script>
<template>
  <el-card style="margin-bottom: 20px">
    <el-form>
      <el-form-item style="width: 400px">
        <el-input
          v-model="queryData.data"
          placeholder="请输入搜索字段"
          class="input-with-select"
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
    </el-form>
  </el-card>
  <el-card>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="empId" label="员工ID" />
      <el-table-column prop="empUsername" label="员工工号" />
      <el-table-column prop="empName" label="员工姓名" />
      <el-table-column prop="empRole" label="员工角色" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="editEmp(scope.row)"> 编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    title="Shipping address"
    :show-close="false"
    width="600px"
  >
    <div style="width: 500px; margin: 0 auto">
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="员工ID：">
          <el-input v-model="form.empId" disabled />
        </el-form-item>
        <el-form-item label="员工工号：">
          <el-input v-model="form.empUsername" disabled />
        </el-form-item>
        <el-form-item label="员工姓名：">
          <el-input v-model="form.empName" />
        </el-form-item>
        <el-form-item label="员工角色：">
          <el-select
            v-model="form.empRole"
            :disabled="isDisabled(form.empRole)"
            placeholder="选择员工角色"
            style="width: 100%"
          >
            <el-option
              label="管理"
              :value="Role.ADMIN"
              :disabled="employee.empRole !== Role.ADMIN"
            />
            <el-option label="人事" :value="Role.PERSONNEL" />
            <el-option label="施工" :value="Role.BUILDER" />
            <el-option label="设计" :value="Role.DESIGNER" />
            <el-option label="客服" :value="Role.SERVICE" />
            <el-option label="无" :value="Role.POWERLESS" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handelConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
