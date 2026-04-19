<script setup>
    import {isLogin} from '@/services/authService';
    import appMemory from '@/services/appMemory';
    import { useRouter } from 'vue-router';
    import { ref, onMounted, watch } from 'vue';

    const router = useRouter();
    const userName = ref('');

    const updateUserName = () => {
        userName.value = appMemory.get('userName') || '';
    };

    onMounted(() => {
        updateUserName();
        appMemory.subscribe('userName', updateUserName);
    });

    watch(() => localStorage.getItem('userName'), () => {
        updateUserName();
    });

    const logout = () => {
        localStorage.clear();
        appMemory.set('userName', '', false);
        userName.value = '';
        router.push('/');
    };
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" >
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">BANCO VUE</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <li class="nav-item">
                        <router-link to="/usuarios" class="nav-link">Usuarios</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/creditos" class="nav-link">Creditos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/pagos" class="nav-link">Pagos</router-link>
                    </li>
                </ul>

              <div>
                <div class="nav-item" v-if="isLogin()">
                  {{ userName }}
                  <router-link to="/" class="nav-link" @click="logout()">Cerrar sesión</router-link>
                </div>
                <div class="nav-item" v-else>
                  <router-link to="/login" class="nav-link" >Iniciar sesión</router-link>
                </div>
              </div>

            </div>


        </div>
    </nav>
</template>