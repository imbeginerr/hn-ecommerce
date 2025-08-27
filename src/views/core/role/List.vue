<script setup>
import { ref, onMounted } from 'vue';
import { getCoreRoles, createCoreRole, deleteCoreRole } from '#/apis/core/role';

// Dữ liệu cho bảng
const roles = ref([]);
const loading = ref(false);

// Dữ liệu cho form
const formData = ref({
  name: '',
  decription: '',
  permissions: []
});

// Lấy danh sách quyền khi component được mounted
const fetchRoles = async () => {
  try {
    loading.value = true;
    const response = await getCoreRoles();
    roles.value = response.result; // Giả định API trả về mảng trong response.data
  } catch (error) {
    console.error('Lỗi khi lấy danh sách quyền:', error);
  } finally {
    loading.value = false;
  }
};

// Thêm quyền mới
const addrole = async () => {
  try {
    await createCoreRole(formData.value);
    // Reset form sau khi thêm thành công
    formData.value = { name: '', decription: '' };
    // Tải lại danh sách quyền
    await fetchRoles();
    alert('Thêm quyền thành công!');
  } catch (error) {
    console.error('Lỗi khi thêm quyền:', error);
    alert('Lỗi khi thêm quyền!');
  }
};

// Xóa quyền
const deleteRole = async (id) => {

  try {
    await deleteCoreRole(id);
    // Tải lại danh sách quyền
    await fetchRoles();
    alert('Xóa quyền thành công!');
  } catch (error) {
    console.error('Lỗi khi xóa quyền:', error);
    alert('Lỗi khi xóa quyền!');
  }
};

// Gọi API khi component được mounted
onMounted(fetchRoles);
</script>

<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>Quản lý cửa hàng</h1>
    </div>

    <!-- Form thêm quyền -->
    <div class="form-container">
      <h2>Thêm quyền mới</h2>
      <form @submit.prevent="addrole" class="role-form">
        <div class="form-group">
          <label for="name">Tên:</label>
          <input v-model="formData.name" type="text" id="name" placeholder="Nhập tên" required />
        </div>

        <div class="form-group">
          <label for="decription">Mô tả:</label>
          <input v-model="formData.decription" type="decription" id="decription" placeholder="Nhập mô tả" required />
        </div>
        <button type="submit" class="submit-btn">Thêm quyền</button>
      </form>
    </div>

    <!-- Bảng hiển thị danh sách quyền -->
    <div class="table-container">
      <h2>Danh sách quyền</h2>
      <div v-if="loading" class="loading">Đang tải...</div>
      <table v-else class="role-table">
        <thead>
          <tr>
            <th>Mô tả</th>
            <th>Tên</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td>{{ role.description }}</td>
            <td>{{ role.name }}</td>
            <td>
              <button class="delete-btn" @click="deleteRole(role.id)">Xóa</button>
            </td>
          </tr>
          <tr v-if="roles.length === 0">
            <td colspan="4">Không có quyền nào.</td>
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

.role-form {
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

.role-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.role-table th,
.role-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.role-table th {
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