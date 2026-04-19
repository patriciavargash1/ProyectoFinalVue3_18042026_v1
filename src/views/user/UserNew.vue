
<template>

        <form @submit.prevent="handleRegister">

                <label class="form-label">Nombre</label>
                <input v-model="name" type="text" class="form-control" >
                <span v-if="errors.name" class="error">
            {{ errors.name }}
          </span>

                <label class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" >
                <span v-if="errors.email" class="error">
            {{ errors.email }}
          </span>

                <label class="form-label">Password</label>
                <input v-model="password" type="text" class="form-control" >
                <span v-if="errors.password" class="error">
            {{ errors.password }}
          </span>
            <div class="actions">
            <button type="submit" class="btn btn-primary btn-sm" >
                Guardar
            </button>
            </div>

            <p v-if="errorGeneral" class="error">
                {{ errorGeneral }}
            </p>

        </form>

</template>

<script setup>
    import { ref } from 'vue';
    import { register } from '@/services/authService';
    const emit = defineEmits(['onSave']);

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

            emit('onSave', user);


        } catch (error) {

            errorGeneral.value = 'Error al registrar (usuario puede existir)';

        } finally {
            loading.value = false;
        }

    };
</script>

<style scoped>
    .actions {
        margin: 20px 0;
    }
</style>