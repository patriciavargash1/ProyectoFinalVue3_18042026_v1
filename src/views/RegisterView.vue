
<template>
    <div class="container">
  
      <h2>Crear cuenta</h2>
  
      <form @submit.prevent="handleRegister">
  
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="name" type="text">
          <span v-if="errors.name" class="error">
            {{ errors.name }}
          </span>
        </div>

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
  
        <div class="form-group">
          <label>Confirmar Password</label>
          <input v-model="confirmPassword" type="password">
          <span v-if="errors.confirmPassword" class="error">
            {{ errors.confirmPassword }}
          </span>
        </div>
  
        <button :disabled="loading">
          {{ loading ? 'Registrando...' : 'Registrarse' }}
        </button>
  
        <p v-if="errorGeneral" class="error">
          {{ errorGeneral }}
        </p>
  
      </form>
      <br>
      <br>
      <p class="text-center">
        <router-link to="/login" class="nav-link" >Iniciar sesión</router-link>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { register } from '@/services/authService';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const loading = ref(false);
  
  const errors = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const errorGeneral = ref('');
  
  // ==========================
  // VALIDACIONES
  // ==========================
  const validate = () => {
  
    let isValid = true;
  
    errors.value.name = '';
    errors.value.email = '';
    errors.value.password = '';
    errors.value.confirmPassword = '';

    if (!name.value) {
      errors.value.name = 'El nombre es obligatorio';
      isValid = false;
    }

    if (!email.value) {
      errors.value.email = 'El email es obligatorio';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      errors.value.email = 'Email inválido';
      isValid = false;
    }
  
    if (!password.value) {
      errors.value.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (password.value.length < 6) {
      errors.value.password = 'Mínimo 6 caracteres';
      isValid = false;
    }
  
    if (confirmPassword.value !== password.value) {
      errors.value.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }
  
    return isValid;
  };
  
  // ==========================
  // REGISTER
  // ==========================
  const handleRegister = async () => {
  
    errorGeneral.value = '';
  
    if (!validate()) return;
  
    try {
  
      loading.value = true;
  
      const user = await register(name.value, email.value, password.value);
  
      console.log('Usuario registrado:', user);
  
      // Redirigir
      router.push('/');
  
    } catch (error) {
  
      errorGeneral.value = 'Error al registrar (usuario puede existir)';
  
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