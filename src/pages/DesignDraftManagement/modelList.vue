<script lang="ts" setup>
import { ref } from 'vue';
import { FileDate, Role } from '../../type';
import { useEmployeeStore } from '../../stores/EmployeeStore';
import { getModelList } from '../../apis/DesignDraftManagement';
import { Download, UploadFilled } from '@element-plus/icons-vue';
import { ElMessage, UploadRawFile } from 'element-plus';

const token = localStorage.token;
const { employee } = useEmployeeStore();
const tableData = ref<FileDate[]>();
const getTable = () => {
  getModelList().then(({ data }) => {
    tableData.value = data;
  });
};
getTable();
const fileTypeSet = new Set(['image/jpeg', 'image/jpg']);
const beforeUpload = (file: UploadRawFile) => {
  if (fileTypeSet.has(file.type)) {
    if (file.size <= 500000) {
      console.log(file);
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '文件过大，请重新选择',
      });
      return false;
    }
  } else {
    ElMessage({
      type: 'error',
      message: '仅支持jpg文件',
    });
    return false;
  }
};
const onSuccess = () => {
  getTable();
};
const copyAddress = (url: string) => {
  navigator.clipboard.writeText(url);
  ElMessage({
    type: 'success',
    message: '已复制到剪切板',
  });
};
</script>
<template>
  <el-card
    v-if="employee.empRole === Role.DESIGNER || employee.empRole === Role.ADMIN"
    style="margin-bottom: 20px"
  >
    <div style="display: flex; justify-content: center">
      <el-upload
        :before-upload="beforeUpload"
        :headers="{ Authorization: `bearer ${token}` }"
        :on-success="onSuccess"
        action="http://127.0.0.1:8080/api/company/oss/upload"
        drag
        multiple
      >
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          将glb文件拖进来或<em>点击</em>上传（文件最大为300MB）
        </div>
      </el-upload>
    </div>
  </el-card>
  <el-card>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="文件名" prop="name" />
      <el-table-column label="修改时间" prop="lastModified" />
      <el-table-column label="文件大小">
        <template #default="scope">
          {{ scope.row.size / 1000 }}&nbsp;KB
        </template>
      </el-table-column>
      <el-table-column label="地址(点击复制)">
        <template #default="scope">
          <el-link :underline="false" @click.stop="copyAddress(scope.row.url)">
            {{ scope.row.url }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <a :href="scope.row.url">
            <el-button :icon="Download" type="primary"></el-button>
          </a>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped></style>
