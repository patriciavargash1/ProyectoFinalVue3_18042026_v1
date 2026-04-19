<template>

    <form @submit.prevent="save()">

        <label class="form-label">Credito</label>
        <select v-model="creditoId" class="form-select" required>
            <option :value="credito.id" v-for="credito in creditoList">{{credito.id}} - {{credito.descripcion}}</option>
        </select>


        <label class="form-label">Monto Cuota</label>
        <input v-model="monto" type="text" class="form-control" required>

        <label class="form-label">Metodo Pago</label>
        <select v-model="metodo" class="form-select" required>
            <option value="Transferencia">Transferencia</option>
            <option value="QR">QR</option>
        </select>
        <label class="form-label">Comprobante</label>
        <input v-model="comprobante" type="text" class="form-control" required>
        
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

    const creditoId = ref('');
    const monto = ref('');
    const metodo = ref('');
    const comprobante = ref('');
    const met = metodo.value = 'Transferencia'? 'TRN' : 'QR';

    const save = async () => {
        const res = await api.post(`/pagos`, {
            creditoId: creditoId.value,
            monto_cuota: monto.value,
            metodo: metodo.value,
            comprobante: met + "-" +comprobante.value,
            fecha: new Date().toISOString().split('T')[0]
        });

        // Actualizar saldo del crédito
        const creditoRes = await api.get(`/creditos/${creditoId.value}`);
        const credito = creditoRes.data;
        const nuevoSaldo = (credito.saldo || 0) - parseFloat(monto.value);
        await api.patch(`/creditos/${creditoId.value}`, {
            saldo: nuevoSaldo,
            cancelado: nuevoSaldo <= 0
        });

        emit('onSave', res.data);
    };

    const creditoList = ref([]);

    const loadCreditos = async () => {
        const res = await api.get(`/creditos?cancelado=false&saldo_gt=0`);
        creditoList.value = res.data;
    };

    onMounted(async () => {
        await loadCreditos();
    });

</script>

<style scoped>
    .actions {
        margin: 20px 0;
    }
</style>