import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js';

/**
 * @description: RSA加密
 * @param {string} str: 明文
 * @return {string}: 密文
 */
function encryptKey(str: string): string {
  const publicKey = localStorage.publicKey;
  // 实例化JSEncrypt
  const jse = new JSEncrypt();
  jse.setPublicKey(publicKey);
  // 加密
  return jse.encrypt(str) as string;
}

/**
 * @description: 随机秘钥生成函数
 * @param {number} num:生成秘钥的位数
 * @return {string} :返回随机秘钥
 */
function generateKey(num: number): string {
  const library =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < num; i++) {
    const randomPoz = Math.floor(Math.random() * library.length);
    key += library.substring(randomPoz, randomPoz + 1);
  }
  return key;
}

/**
 * @description: AES加密
 * @param {string} data: 明文
 * @param {string} keyStr: 秘钥
 * @return {string} :密文
 */
function encryptStr(data: string, keyStr: string): string {
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const str = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 * @description: RSA/AES混合加密
 * @param {any} rawData: 明文
 * @return {} :返回一个Encrypt对象，encryptStr属性值为AES加密的密文，encryptKey属性值为AES秘钥RSA加密后的密文
 */
export function encrypt(rawData: any) {
  const data = JSON.stringify(rawData);
  const key = generateKey(16);
  console.log(key);
  return {
    encryptStr: encryptStr(data, key),
    encryptKey: encryptKey(key),
  };
}
