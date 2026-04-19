<script setup>
    import BaseModal from '@/components/BaseModal.vue';
    import {ref, onMounted, computed} from 'vue';
    import api from '@/services/api';
    import PagoNew from './PagoNew.vue';
    import PagoEdit from './PagoEdit.vue';

    const newModal = ref(false);
    const editModal = ref(false);

    const items = ref([]);
    const textToSearch = ref('');
    const filterOptions = [
        {label: 'Transferencia', value: 'Transferencia'},
        {label: 'QR', value: 'QR'},
    ];
    const filterOptionSelected = ref('');

    const itemsWithDefaults = computed(() => {
        return items.value.map(item => ({
            ...item,
            creditoId: item.creditoId ?? null,
        }));
    });

    const filteredItems = computed(() => {
        let result = itemsWithDefaults.value;

        if (filterOptionSelected.value !== '') {
            result = result.filter(item => item.metodo === filterOptionSelected.value);
        }

        const query = textToSearch.value.trim();
        if (!query) return result;

        return result.filter(item => item?.creditoId?.toString().includes(query));
    });

    const load = async () => {
        const res = await api.get(`/pagos?_expand=credito`);
        items.value = res.data;
        console.log(items);
    };

    const itemSelected = ref(null);

    const showEditModal = (item) => {
        itemSelected.value = {...item};
        editModal.value = true;
    };

    const onNew = (item) => {
        newModal.value = false;
        load();
    };

    const onEdit = (item) => {
        editModal.value = false;
        load();
    };

    const deleteItem = async (item) => {
        if (confirm("¿Está seguro de eliminar este ítem?")) {
            // Obtener el crédito
            const creditoRes = await api.get(`/creditos/${item.creditoId}`);
            const credito = creditoRes.data;

            // Sumar el monto_cuota al saldo
            const nuevoSaldo = (credito.saldo || 0) + parseFloat(item.monto_cuota);

            // Actualizar crédito
            await api.patch(`/creditos/${item.creditoId}`, {
                saldo: nuevoSaldo,
                cancelado: nuevoSaldo <= 0
            });

            // Eliminar pago
            const res = await api.delete(`/pagos/${item.id}`);
            
            await load();
            alert('Ítem eliminado correctamente.');
        }
    };

    const search = async () => {
        await load();
    };

    const filter = async () => {
        await load();
    };

    onMounted(async () => {
        await load();
    });

</script>

<template>

    <BaseModal v-model="newModal">
        <h4>Nuevo Pago</h4>
        <PagoNew
                @onSave="onNew($event)"
        ></PagoNew>
    </BaseModal>

    <BaseModal v-model="editModal">
        <h4>Editar Pago</h4>
        <PagoEdit
                :item="itemSelected"
                @onSave="onEdit($event)"
        ></PagoEdit>
    </BaseModal>


    <div>
        Lista de pagos
        <br><br>
        <button @click="newModal = true" class="btn btn-primary btn-sm">Nuevo</button>
        <br>
    </div>
    <div style="margin: 20px 0">
        <form @submit.prevent="search()">
            <div class="input-group">
                <input
                        type="search"
                        v-model="textToSearch"
                        placeholder="Buscar por ID de crédito"
                        class="form-control"
                >
                <button type="submit" class="btn btn-primary btn-sm">Buscar</button>
            </div>
        </form>
    </div>
    <div style="margin: 20px 0">
        <form @submit.prevent="filter()">
            <div class="input-group">
                <select v-model="filterOptionSelected" class="form-control" >
                    <option value="">Filtrar por metodo de pago</option>
                    <option :value="option.value" v-for="option in filterOptions">{{option.label}}</option>
                </select>
                <button type="submit" class="btn btn-primary btn-sm">Filtrar</button>
            </div>
        </form>
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
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.monto_cuota }}</td>
                <td>{{ item.fecha }}</td>
                <td>{{ item.metodo}}</td>
                <td>{{ item.comprobante }}</td>
                <td>{{ item?.creditoId }}</td>
                <td>
                    <button class="btn btn-primary btn-sm" @click="showEditModal(item)">editar</button>
                    <button class="btn btn-danger btn-sm" @click="deleteItem(item)">eliminar</button>
                </td>
            </tr>
            <tr v-if="filteredItems.length === 0">
                <td colspan="7" class="text-center">No se encontró ningún pago para ese ID de crédito.</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    button {
        margin-right: 10px;
    }
</style>