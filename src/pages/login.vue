<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import cover from '../assets/img/cover.jpg';
import { loginBoxStyle } from '../css';
import textBgi from '../assets/img/txtbgi.webp';
import { encrypt } from '../tools/security';
import { getPublicKey, postLogin } from '../apis/login';
import { useEmployeeStore } from '../stores/EmployeeStore';

interface Form {
  empUsername: string | null;
  empPassword: string | null;
}

const { setEmployee } = useEmployeeStore();
const router = useRouter();
getPublicKey().then((r) => {
  localStorage.publicKey = r;
});
const form = reactive<Form>({
  empUsername: null,
  empPassword: null,
});
const login = () => {
  console.log(11);
  postLogin(encrypt(JSON.stringify(form))).then(({ data }) => {
    console.log(data);
    localStorage.token = data.token;
    setEmployee(data.employee);
    router.push({ name: 'home' });
  });
};
</script>

<template>
  <div
    class="tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-50"
  >
    <div>
      <div
        class="` tw-flex tw-justify-center tw-items-center tw-font-extrabold tw-font-serif `"
      >
        <span
          :style="`background-image: url(${textBgi});`"
          class="tw-bg-clip-text tw-text-transparent tw-tracking-widest tw-text-5xl tw-h-32"
        >
          家装管理系统
        </span>
      </div>
      <div :class="loginBoxStyle">
        <div
          class="tw-w-96 tw-h-96 md:tw-bg-gray-200 tw-flex tw-justify-center tw-items-center"
        >
          <div class="tw-w-80">
            <div style="margin-bottom: 20px">请登录</div>
            <el-form :model="form">
              <el-form-item>
                <el-input
                  v-model="form.empUsername"
                  clearable
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="form.empPassword"
                  clearable
                  placeholder="请输入密码"
                  show-password
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <button
                  class="tw-w-80 tw-text-white tw-rounded login-button"
                  @click="login"
                >
                  登录
                </button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="tw-w-0 tw-h-0 md:tw-w-96 md:tw-h-96">
          <img :src="cover" alt="洒洒水啦" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-button {
  background-image: linear-gradient(
    to right,
    rgb(52, 211, 153),
    rgb(96, 165, 250),
    rgb(167, 139, 250)
  );
  background-size: 200%;
  background-position: left;
  transition: all 500ms;
}

.login-button:hover {
  background-position: right;
}
</style>
