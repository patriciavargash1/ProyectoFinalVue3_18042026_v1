
<template>
    <div class="container">
  
      <h2>Iniciar sesión</h2>
  
      <form @submit.prevent="handleLogin">
  
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email">
          <span v-if="errors.email" class="error">
            {{ errors.email }}
          </span>
        </div>
  
        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password">
          <span v-if="errors.password" class="error">
            {{ errors.password }}
          </span>
        </div>
  
        <button :disabled="loading">
          {{ loading ? 'Cargando...' : 'Ingresar' }}
        </button>
  
        <p v-if="errorGeneral" class="error">
          {{ errorGeneral }}
        </p>
  
      </form>

      <br>
      <br>
      <p class="text-center">
        <router-link to="/register" class="nav-link" >Registrarme</router-link>
      </p>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import api from '@/services/api'
  import appMemory from '@/services/appMemory';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const email = ref('');
  const password = ref('');
  const loading = ref(false);
  
  const errors = ref({
    email: '',
    password: ''
  });
  
  const errorGeneral = ref('');
  
  // ==========================
  // VALIDACIONES
  // ==========================
  const validate = () => {
  
    let isValid = true;
  
    errors.value.email = '';
    errors.value.password = '';
  
    // Email requerido
    if (!email.value) {
      errors.value.email = 'El email es obligatorio';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      errors.value.email = 'Formato de email inválido';
      isValid = false;
    }
  
    // Password requerido
    if (!password.value) {
      errors.value.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (password.value.length < 6) {
      errors.value.password = 'Mínimo 6 caracteres';
      isValid = false;
    }
  
    return isValid;
  };
  
  // ==========================
  // LOGIN
  // ==========================
  const handleLogin = async () => {
  
    errorGeneral.value = '';
  
    if (!validate()) return;
  
    try {
  
      loading.value = true;
  
      const users = await api.get('/users', { params: { email: email.value } });
      const user = users.data[0];

      if (user && user.password === password.value) {
        console.log('Login exitoso');
        localStorage.setItem('token', 'fake-token'); // fake token

        appMemory.set('userName', user.name, true);
        appMemory.set('userId', user.id, true);
        // redirigir
        router.push('/');
      } else {
        throw new Error('Credenciales incorrectas');
      }

    } catch (error) {
      errorGeneral.value = error.response?.data?.message || error.message || 'Credenciales incorrectas';
  
    } finally {
      loading.value = false;
    }
  
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
    padding: 8px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background: #42b883;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:disabled {
    background: gray;
  }
  
  .error {
    color: red;
    font-size: 12px;
  }
  </style>