<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../apis/auth'
const router = useRouter()
const error = ref('')
const data = reactive({
  username: '',
  password: ''
})

const handleLogin = async() => {
  error.value = '' // Clear previous errors
  try {
    const formData = await login(data)
    console.log('Login response:', data.result)
    if (formData.result) {
      localStorage.setItem('authToken', formData.result.token)
      console.log('Token saved to localStorage', localStorage.getItem('authToken'))
      router.push('/dashboard')
    } else {
      error.value = formData.message || 'Invalid credentials or token not found'
    }
  } catch (err) {
    error.value = err.message || 'An error occurred. Please try again.'
    console.error('Login error:', err)
  }
}
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" v-model="data.username" type="text" placeholder="Enter username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="data.password" type="password" placeholder="Enter password" required>
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
