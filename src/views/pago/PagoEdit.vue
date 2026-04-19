<script setup>
    import {ref, onMounted} from 'vue';
    import api from '@/services/api.js'

    const props = defineProps({
        item: Object
    });
    const emit = defineEmits(['onSave']);
    const save = async ()=>{
        // Obtener el pago actual para el monto anterior
        const pagoActualRes = await api.get(`/pagos/${props.item.id}`);
        const pagoActual = pagoActualRes.data;

        // Actualizar pago primero
        const rest = await api.patch(`/pagos/${props.item.id}`,{
            creditoId: props.item.creditoId,
            monto_cuota: props.item.monto_cuota,
            metodo: props.item.metodo,
            comprobante: props.item.comprobante,
        });

        // Obtener el crédito
        const creditoRes = await api.get(`/creditos/${props.item.creditoId}`);
        const credito = creditoRes.data;

        // Calcular nuevo saldo: sumar el monto anterior y restar el nuevo
        const nuevoSaldo = (credito.saldo || 0) + parseFloat(pagoActual.monto_cuota) - parseFloat(props.item.monto_cuota);

        // Actualizar crédito
        await api.patch(`/creditos/${props.item.creditoId}`, {
            saldo: nuevoSaldo,
            cancelado: nuevoSaldo <= 0
        });

        emit('onSave', rest.data);
    };
    const creditoList = ref([]);

    const loadCreditos = async () => {
        const res = await api.get(`/creditos`);
        creditoList.value = res.data;
    };

    onMounted(async () => {
        await loadCreditos();
    });
</script>

<template>
    <form @submit.prevent="save()">

        <label class="form-label">Credito</label>
        <select v-model="item.creditoId" class="form-select" required>
            <option :value="credito.id" v-for="credito in creditoList">{{credito.id}} - {{credito.descripcion}}</option>
        </select>


        <label class="form-label">Monto Cuota</label>
        <input v-model="item.monto_cuota" type="text" class="form-control" required>
  
        <label class="form-label">Metodo Pago</label>
        <select v-model="item.metodo" class="form-select" required>
            <option value="Transferencia">Transferencia</option>
            <option value="QR">QR</option>
        </select>
        <label class="form-label">Comprobante</label>
        <input v-model="item.comprobante" type="text" class="form-control" required>
        
   

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