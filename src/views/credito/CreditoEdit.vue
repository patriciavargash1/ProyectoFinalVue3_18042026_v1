<script setup>
    import {ref, onMounted} from 'vue';
    import api from '@/services/api.js'

    const props = defineProps({
        item: Object
    });
    const emit = defineEmits(['onSave']);
    const save = async ()=>{
        const rest = await api.patch(`/creditos/${props.item.id}`,{
            userId: props.item.userId,
            monto_prestado: props.item.monto_prestado,
            descripcion: props.item.descripcion,
            tasa_interes: props.item.tasa_interes,
            saldo: props.item.monto_prestado,
        });
        emit('onSave', rest.data);
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

<template>
    <form @submit.prevent="save()">

        <label class="form-label">Asesor</label>
        <select v-model="item.userId" class="form-select" required>
            <option :value="user.id" v-for="user in userList">{{user.name}}</option>
        </select>

        <label class="form-label">Monto Prestado</label>
        <input v-model="item.monto_prestado" type="text" class="form-control" required>

        <label class="form-label">Descripción</label>
        <input v-model="item.descripcion" type="text" class="form-control" required>
        <label class="form-label">Tasa de Interés</label>
        <input v-model="item.tasa_interes" type="text" class="form-control" required>
     

        <div class="actions">
        <button type="submit" class="btn btn-primary btn-sm" >Guardar</button>
        </div>

    </form>
</template>

<style>

    .actions {
        margin: 20px 0;
    }

</style>