<template>
  <div class="h-full">
    <!-- Header with text and button spaced apart -->
    <div class="flex items-center justify-between mb-3 h-full min-h-[100px] header-form">
      <span class="text-2xl font-bold h-full flex items-center">
        {{ isEdit === true ? 'Chỉnh sửa sản phẩm' : 'Thêm mới sản phẩm' }}
      </span>
      <!-- <span v-else class="text-2xl font-bold h-full flex items-center">
        Chi tiết sản phẩm
      </span> -->
      <button class="btn btn-primary" @click="saveData">
        Lưu
      </button>
    </div>

    <form class="mb-3">
      <div class="mb-3">
        <label class="form-label">Tên sản phẩm</label>
        <input v-model="formData.name" type="text" class="form-control" />
        <!-- <span class="form-control" v-else>{{ formData.name }}</span> -->
      </div>
      <div class="mb-3">
        <label class="form-label">Mô tả</label>
        <textarea v-model="formData.decription" class="form-control" rows="3"></textarea>
        <!-- <span class="form-control" v-else>{{ formData.decription }}</span> -->
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getItemProductById, createItemProduct, updateItemProduct } from '#/apis/item/product'; // Adjust import path

const route = useRouter();
const formData = ref({
  name: '',
  decription: ''
});

const props = defineProps({
  id: {
    type: String,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});
const fetchData = async (id) => {
  try {
    const response = await getItemProductById(id);
    formData.value = response.result || { name: '', decription: '' };
    console.log('Data fetched:', response);
    console.log('Route params:', route);

  } catch (error) {
    console.error('Error fetching data:', error);
    formData.value = { name: '', decription: '' };
  }
};

const saveData = async () => {
  try {
    if (props.id) {
      await updateItemProduct(props.id, formData.value);
      alert('Cập nhật sản phẩm thành công!');
    } else {
      const response = await createItemProduct(formData.value);
      alert('Thêm mới sản phẩm thành công!');
      if (response?.id) {
        router.push({ name: 'productEdit', params: { id: response.id } }); // Navigate to edit page
      }
    }
  } catch (error) {
    console.error('Error saving data:', error);
    alert('Lỗi khi lưu sản phẩm!');
  }
};

onMounted(() => {
  if (props.id) {
    console.log('Fetching data for ID:', props.id);
    fetchData(props.id);
  }
});
</script>

<style scoped>
/* Style the header container to maximize height and space items */
.header-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
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