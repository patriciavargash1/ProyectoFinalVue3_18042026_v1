<script setup>
import BaseModal from '@/components/BaseModal.vue';
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import UserNew from './UserNew.vue';
import UserEdit from './UserEdit.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const newModal = ref(false);
const editModal = ref(false);

const items = ref([]);

const load = async () => {
    const res = await api.get("/users");
    items.value = res.data;
};

const itemSelected = ref(null);

const showEditModal=(item)=>{
    itemSelected.value = {...item};
    editModal.value = true;
};

const onNew = (item) =>{
  newModal.value = false;
  load();
};

const onEdit = (item) => {
  editModal.value = false;
  load();
};

const deleteItem = async (item) =>{
    if(confirm("¿Está seguro de eliminar este ítem?")){
        const res = await api.delete(`/users/${item.id}`);
        await load();
        alert('Ítem eliminado correctamente.');
    }
};

const showCreditos = (item) =>{
    router.push({ name: 'usuarioCreditos', params: { id: item.id } })
};

onMounted(async () => {
    await load();
});

</script>

<template>

    <BaseModal v-model="newModal">
        <h4>Nuevo Usuario</h4>
        <UserNew
                @onSave="onNew($event)"
        ></UserNew>
    </BaseModal>

    <BaseModal v-model="editModal">
        <h4>Editar Usuario</h4>
        <UserEdit
            :item="itemSelected"
            @onSave="onEdit($event)"
        ></UserEdit>
    </BaseModal>


    <div>
        Lista de usuarios
        <br><br>
        <button @click="newModal = true" class="btn btn-primary btn-sm" >Nuevo</button>
        <br>
    </div>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="showEditModal(item)">editar</button>
                        <button class="btn btn-danger btn-sm" @click="deleteItem(item)">eliminar</button>
                        <button class="btn btn-info btn-sm" @click="showCreditos(item)">Ver Créditos</button>
                        <router-link :to="`/usuario/${item.id}/creditos`">Ver Créditos</router-link> 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    button{
        margin-right: 10px;
    }
</style>