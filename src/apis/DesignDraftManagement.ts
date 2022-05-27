import { GET } from '../axios/request';
import { FileDate } from '../type';

export async function getImageList() {
  return GET<FileDate[]>('oss/image');
}
export async function getModelList() {
  return GET<FileDate[]>('oss/model');
}
