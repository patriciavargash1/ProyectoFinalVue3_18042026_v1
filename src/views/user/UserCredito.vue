<script setup>
    import { ref, onMounted } from 'vue';
    import api from '@/services/api';
    const items = ref([]);

    const props = defineProps({
        id: String
    });

    const load = async () => {
        const res = await api.get(`/creditos?_expand=user&userId=${props.id}`);
        items.value = res.data;
    };
    onMounted(async () => {
        await load();
    });
</script>
<template>
    <div>
        Lista de créditos
        <br><br>
    </div>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Monto del crédito</th>
                <th scope="col">Descripción</th>
                <th scope="col">Tasa de interes</th>
                <th scope="col">Asesor</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items">
                <td>{{ item.id }}</td>
                <td>{{ item.monto_prestado }}</td>
                <td>{{ item.descripcion }}</td>
                <td>{{ item.tasa_interes}}</td>
                <td>{{ item?.user?.name }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<style>

</style>