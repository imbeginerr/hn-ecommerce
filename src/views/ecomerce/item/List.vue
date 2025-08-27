<script setup>
import { ref, onMounted } from 'vue';
import { getItemProducts, createItemProduct, deleteItemProduct } from '#/apis/item/product';

// Dữ liệu cho bảng
const Items = ref([]);
const loading = ref(false);

// Dữ liệu cho form
const formData = ref({
  name: '',
  decription: ''
});

// Lấy danh sách item khi component được mounted
const fetchItems = async () => {
  try {
    loading.value = true;
    const response = await getItemProducts();
    Items.value = response.result; // Giả định API trả về mảng trong response.data
  } catch (error) {
    console.error('Lỗi khi lấy danh sách item:', error);
  } finally {
    loading.value = false;
  }
};

// Thêm item mới
const addItem = async () => {
  try {
    await createItemProduct(formData.value);
    // Reset form sau khi thêm thành công
    formData.value = { name: '', email: '', decription: '' };
    // Tải lại danh sách item
    await fetchItems();
    alert('Thêm item thành công!');
  } catch (error) {
    console.error('Lỗi khi thêm item:', error);
    alert('Lỗi khi thêm item!');
  }
};

// Xóa item
const deleteItem = async (id) => {

  try {
    await deleteItemProduct(id);
    // Tải lại danh sách item
    await fetchItems();
    alert('Xóa item thành công!');
  } catch (error) {
    console.error('Lỗi khi xóa item:', error);
    alert('Lỗi khi xóa item!');
  }
};

// Gọi API khi component được mounted
onMounted(fetchItems);
</script>

<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>Quản lý cửa hàng</h1>
    </div>

    <!-- Form thêm item -->
    <div class="form-container">
      <h2>Thêm item mới</h2>
      <form @submit.prevent="addItem" class="Item-form">
        <div class="form-group">
          <label for="name">Tên:</label>
          <input v-model="formData.name" type="text" id="name" placeholder="Nhập tên" required />
        </div>

        <div class="form-group">
          <label for="decription">Mô tả:</label>
          <input v-model="formData.decription" type="decription" id="decription" placeholder="Nhập mô tả" required />
        </div>
        <button type="submit" class="submit-btn">Thêm item</button>
      </form>
    </div>

    <!-- Bảng hiển thị danh sách item -->
    <div class="table-container">
      <h2>Danh sách item</h2>
      <div v-if="loading" class="loading">Đang tải...</div>
      <table v-else class="Item-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Mô tả</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="Item in Items" :key="Item.id">
            <td>{{ Item.name }}</td>
            <td>{{ Item.decription }}</td>
            <td>
              <button class="delete-btn" @click="deleteItem(Item.id)">Xóa</button>
            </td>
          </tr>
          <tr v-if="Items.length === 0">
            <td colspan="4">Không có item nào.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  max-width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-container {
  margin-bottom: 40px;
}

.Item-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.submit-btn {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #218838;
}

.table-container {
  margin-top: 20px;
}

.Item-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.Item-table th,
.Item-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.Item-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.delete-btn {
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c82333;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
}
</style>