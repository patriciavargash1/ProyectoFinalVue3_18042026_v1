<script setup>
    import { ref, onMounted } from 'vue';
    import api from '@/services/api';
    const items = ref([]);

    const props = defineProps({
        id: String
    });

    const load = async () => {
        const res = await api.get(`/pagos?_expand=credito&creditoId=${props.id}`);
        items.value = res.data;
    };

    
    onMounted(async () => {
        await load();
    });
</script>
<template>
    <div>
        Lista de pagos
        <br><br>
    </div>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Monto de la cuota</th>
                <th scope="col">Fecha de pago</th>
                <th scope="col">Metodo</th>
                <th scope="col">Comprobante</th>
                <th scope="col">ID Credito</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items">
                <td>{{ item.id }}</td>
                <td>{{ item.monto_cuota }}</td>
                <td>{{ item.fecha }}</td>
                <td>{{ item.metodo }}</td>
                <td>{{ item.comprobante }}</td>
                <td>{{ item.creditoId }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<style>

</style>