<template>
  <div class="flex items-center justify-between mb-3 h-full min-h-[100px] header-form">
    <span class="text-2xl font-bold h-full flex items-center">
      Danh sách sản phẩm
    </span>
    <button class="btn btn-primary" @click="createItem">
      Thêm mới
    </button>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Tên</th>
        <th scope="col">Mô tả</th>
        <th scope="col">Chức năng</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in formData" :key="item.id">
        <th scope="row">{{ index + 1 }}</th>
        <td><a href="#" class="link-primary" @click.prevent="handleDetail(item.id)">{{ item.name }}</a></td>
        <td>{{ item.decription }}</td>
        <td>
          <button class="btn btn-primary" @click="editItem(item.id)"><i class="bi bi-gear-fill"></i> Sửa</button>
          <button class="btn btn-danger" @click="deleteItem(item.id)"><i class="bi bi-trash"></i> Xóa</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { deleteItemProduct, getItemProducts } from '../../../apis/item/product';
import { useRouter } from 'vue-router';
const formData = ref([]);
const router = useRouter();
const fetchData = async () => {
  try {
    const response = await getItemProducts();
    formData.value = response.result || [];
    console.log('Data fetched:', response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const createItem = () => {
  router.push({ name: 'productCreate' });
};
onMounted(fetchData);
const editItem = (id) => {
  router.push({ name: 'productEdit', params: { id } });
};
const deleteItem = async (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
    try {
      await deleteItemProduct(id);
      await fetchData();
      alert('Xóa mục thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa mục:', error);
      alert('Lỗi khi xóa mục!');
    }
  }
};
const handleDetail = (id) => {
  router.push({ name: 'productDetail', params: { id } });
};
</script>
<style scoped>
/* Style the header container to maximize height and space items */
.header-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  /* Minimum height to ensure visibility */
}

.text-2xl {
  font-size: 1.5rem;
  /* Tailwind default for text-2xl */
}

.font-bold {
  font-weight: 700;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  /* Stretch to full height of the container */
  display: flex;
  align-items: center;
  /* Center content vertically within the button */
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Ensure form-control inputs take full width */
.form-control {
  width: 100%;
  box-sizing: border-box;
}
</style>
