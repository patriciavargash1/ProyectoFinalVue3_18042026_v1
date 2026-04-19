<template>

    <form @submit.prevent="save()">

        <label class="form-label">Asesor</label>
        <select v-model="userId" class="form-select" required>
            <option :value="user.id" v-for="user in userList">{{user.name}}</option>
        </select>


        <label class="form-label">Monto Prestado</label>
        <input v-model="monto" type="text" class="form-control" required>

        <label class="form-label">Descripción</label>
        <input v-model="descripcion" type="text" class="form-control" required>
        <label class="form-label">Tasa Interés</label>
        <input v-model="tasa_interes" type="text" class="form-control" required>

        <div class="actions">
            <button type="submit" class="btn btn-primary btn-sm">
                Guardar
            </button>
        </div>

        <p v-if="errorGeneral" class="error">
            {{ errorGeneral }}
        </p>

    </form>

</template>

<script setup>
    import {ref, onMounted} from 'vue';
    import api from '@/services/api';

    const emit = defineEmits(['onSave']);

    const userId = ref('');
    const monto = ref('');
    const descripcion = ref('');
    const tasa_interes = ref('');

    const save = async () => {
        const res = await api.post(`/creditos`, {
            userId: userId.value,
            monto_prestado: monto.value,
            descripcion: descripcion.value,
            tasa_interes: tasa_interes.value,
            saldo: monto.value,
            cancelado: false    
          });
        emit('onSave', res.data);
    };

    const userList = ref([]);

    const loadUsers = async () => {
        const res = await api.get(`/users`);
        userList.value = res.data;
    };

    onMounted(async () => {
        await loadUsers();
    });

</script>

<style scoped>
    .actions {
        margin: 20px 0;
    }
</style>