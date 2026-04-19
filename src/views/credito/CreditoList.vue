<script setup>
    import BaseModal from '@/components/BaseModal.vue';
    import {ref, onMounted, computed} from 'vue';
    import api from '@/services/api';
    import CreditoNew from './CreditoNew.vue';
    import CreditoEdit from './CreditoEdit.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const newModal = ref(false);
    const editModal = ref(false);

    const items = ref([]);
    const textToSearch = ref('');
    const filterOptions = [
        {label: 'Sí cancelado', value: true},
        {label: 'No cancelado', value: false},
    ];
    const filterOptionSelected = ref('');

    const itemsWithDefaults = computed(() => {
        return items.value.map(item => ({
            ...item,
            saldo: item.saldo ?? item.monto_prestado ?? 0,
            cancelado: item.cancelado ?? false,
        }));
    });

    const filteredItems = computed(() => {
        let result = itemsWithDefaults.value;

        if (filterOptionSelected.value !== '') {
            result = result.filter(item => item.cancelado === filterOptionSelected.value);
        }

        const query = textToSearch.value.trim().toLowerCase();
        if (!query) return result;

        return result.filter(item => item?.user?.name?.toLowerCase().includes(query));
    });

    const load = async () => {
        const res = await api.get(`/creditos?_expand=user`);
        items.value = res.data;
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
            const res = await api.delete(`/creditos/${item.id}`);
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
    const showPagos = (item) =>{
        router.push({ name: 'creditoPagos', params: { id: item.id } })
    };
    onMounted(async () => {
        await load();
    });

</script>

<template>

    <BaseModal v-model="newModal">
        <h4>Nuevo Crédito</h4>
        <CreditoNew
                @onSave="onNew($event)"
        ></CreditoNew>
    </BaseModal>

    <BaseModal v-model="editModal">
        <h4>Editar Crédito</h4>
        <CreditoEdit
                :item="itemSelected"
                @onSave="onEdit($event)"
        ></CreditoEdit>
    </BaseModal>


    <div>
        Lista de creditos
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
                        placeholder="Buscar por asesor de credito"
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
                    <option value="">Filtrar por cancelado</option>
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
                <th scope="col">Monto del crédito</th>
                <th scope="col">Descripción</th>
                <th scope="col">Tasa de interes</th>
                <th scope="col">Saldo Crédito</th>
                <th scope="col">Cancelado</th>
                <th scope="col">Asesor</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.monto_prestado }}</td>
                <td>{{ item.descripcion }}</td>
                <td>{{ item.tasa_interes}}</td>
                <td>{{ item.saldo }}</td>
                <td>{{ item.cancelado ? 'Sí' : 'No' }}</td>
                <td>{{ item?.user?.name }}</td>
                <td>
                    <button class="btn btn-primary btn-sm" @click="showEditModal(item)">editar</button>
                    <button class="btn btn-danger btn-sm" @click="deleteItem(item)">eliminar</button>
                    <button class="btn btn-info btn-sm" @click="showPagos(item)">Ver Pagos</button>
                </td>
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