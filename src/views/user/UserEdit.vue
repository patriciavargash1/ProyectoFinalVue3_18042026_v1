<script setup>
    import api from '@/services/api.js'
    const props = defineProps({
        item: Object
    });
    const emit = defineEmits(['onSave']);
    const save = async ()=>{
        console.log(props.item);
        const rest = await api.patch(`/users/${props.item.id}`,{
            name: props.item.name,
            email: props.item.email,
        });
        emit('onSave', rest.data);
    };
</script>

<template>
    <form @submit.prevent="save()">

        <label for="name" class="form-label">Nombre</label>
        <input v-model="item.name" class="form-control" id="name" type="text" placeholder="Nombre" required>

        <label for="email" class="form-label">Email</label>
        <input v-model="item.email" class="form-control" id="email" type="email" placeholder="Email" required>

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