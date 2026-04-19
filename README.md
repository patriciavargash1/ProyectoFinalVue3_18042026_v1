# 🏦 Sistema de Gestión de Créditos y Pagos

Aplicación web desarrollada con **Vue 3** y **TypeScript** para gestionar usuarios, créditos y pagos. Utiliza **Vite** como bundler y **json-server** como backend de desarrollo.

## 📋 Características

- ✅ **Autenticación de usuarios** - Login y registro
- ✅ **Gestión de usuarios** - Crear, editar, eliminar y listar usuarios
- ✅ **Gestión de créditos** - Crear, editar y listar créditos con saldo actualizable
- ✅ **Gestión de pagos** - Registrar, editar y eliminar pagos con actualización automática de saldo
- ✅ **Filtros y búsquedas** - Por nombre de usuario, estado de cancelación, método de pago
- ✅ **Navegación reactiva** - Menú dinámico que muestra el usuario logueado
- ✅ **Protección de rutas** - Rutas protegidas que requieren autenticación

## 🛠️ Tecnologías

- **Frontend:** Vue 3, Vue Router, TypeScript, Axios, Sass, Bootstrap 5
- **Backend (Desarrollo):** json-server, json-server-auth
- **Herramientas:** Vite, npm-run-all

## 📦 Requisitos Previos

- Node.js v20.19.0 o superior (o v22.12.0+)
- npm (incluido con Node.js)

## 🚀 Instalación

1. **Clonar el proyecto desde GitHub**
```bash
git clone https://github.com/patriciavargash1/ProyectoFinalVue3_18042026_v1.git
cd ProyectoFinalVue3_18042026_v1
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Verificar configuración de entorno**
El archivo `.env` está preconfigurado:
```
VITE_API_URL=http://localhost:3000
VITE_TIMEOUT=3000
```

## 🏃 Ejecución

### ⭐ Opción Recomendada: Ejecutar Backend y Frontend

**Terminal 1 - Frontend (Puerto 5173):**
```bash
npm run dev
```

**Terminal 2 - Backend (Puerto 3000):**
```bash
npx json-server db.json --port 3000
```

Luego accede en el navegador a: `http://localhost:5173`

### Alternativa: Solo json-server
```bash
npx json-server db.json --port 3000
```

## 🎬 Demo Funcional

### Paso 1: Acceder a la Aplicación
1. Abre `http://localhost:5173` en tu navegador
2. Deberías ver la página de inicio (Home)

### Paso 2: Login
1. Haz clic en **"Iniciar sesión"** (arriba a la derecha)
2. Usa las credenciales de prueba:
   - **Email:** `juan@correo.com`
   - **Contraseña:** `123456`
3. ✅ Deberías ver el nombre "Juan Pedro" en el menú superior
4. Serás redirigido automáticamente a la página de inicio

### Paso 3: Gestión de Usuarios
1. Haz clic en **"Usuarios"** en el menú
2. **Listar usuarios:**
   - Verás Juan Pedro, Patricia y Alejandra
   - Prueba la búsqueda escribiendo un nombre
3. **Crear nuevo usuario:**
   - Haz clic en **"Nuevo"**
   - Completa: Nombre, Email, Contraseña
   - Haz clic en **"Guardar"**
4. **Editar usuario:**
   - Haz clic en **"editar"** en cualquier fila
   - Modifica los datos
   - Haz clic en **"Guardar"**
5. **Eliminar usuario:**
   - Haz clic en **"eliminar"**
   - Confirma la acción

### Paso 4: Gestión de Créditos
1. Haz clic en **"Creditos"** en el menú
2. **Listar créditos:**
   - Verás 5 créditos disponibles
   - Observa el **"Saldo Crédito"**
3. **Filtrar por estado:**
   - Selecciona **"Sí cancelado"** en el dropdown
   - Haz clic en **"Filtrar"**
   - Verás solo créditos cancelados (si hay)
4. **Buscar por asesor:**
   - Escribe un nombre en "Buscar por asesor de credito"
   - Haz clic en **"Buscar"**
5. **Crear crédito:**
   - Haz clic en **"Nuevo"**
   - Selecciona Asesor, ingresa Monto, Descripción, Tasa de Interés
   - Haz clic en **"Guardar"**
6. **Ver pagos del crédito:**
   - Haz clic en **"Ver Pagos"** en la columna de Acciones
   - Se abrirá una página con los pagos del crédito

### Paso 5: Gestión de Pagos (Funcionalidad Especial)
1. Haz clic en **"Pagos"** en el menú
2. **Listar pagos:**
   - Verás 2 pagos existentes
   - Observa que el **Saldo** del crédito 101 fue reducido
3. **Filtrar por método:**
   - Selecciona **"Transferencia"** en el dropdown
   - Haz clic en **"Filtrar"**
4. **Buscar por ID de crédito:**
   - Escribe "101" en "Buscar por ID de crédito"
   - Haz clic en **"Buscar"**
5. **Crear pago (DEMO DE SALDO AUTOMÁTICO):**
   - Haz clic en **"Nuevo"**
   - **Crédito:** 101 (Saldo actual: ~6199)
   - **Monto Cuota:** 500
   - **Método:** Transferencia
   - **Comprobante:** TEST-001
   - Haz clic en **"Guardar"**
   - ✅ **Resultado esperado:** El saldo del crédito 101 baja a 5699
6. **Editar pago (RECALCULACIÓN):**
   - Haz clic en **"editar"** en un pago
   - Cambia el **Monto Cuota** a 600
   - Haz clic en **"Guardar"**
   - ✅ **Resultado esperado:** El saldo se recalcula considerando el cambio
7. **Eliminar pago (RESTAURACIÓN):**
   - Haz clic en **"eliminar"** en un pago
   - Confirma
   - ✅ **Resultado esperado:** El saldo del crédito vuelve a aumentar

### Paso 6: Ver Créditos por Usuario
1. Haz clic en **"Usuarios"** en el menú
2. En cualquier usuario, haz clic en **"Ver Créditos"**
3. Verás solo los créditos asociados a ese usuario

### Paso 7: Logout
1. En el menú superior derecha, haz clic en **"Cerrar sesión"**
2. Serás redirigido a la página de login
3. ✅ El nombre del usuario desaparecerá del menú

### Paso 8: Registrarse
1. En la página de login, haz clic en **"Registrarme"**
2. Completa: Nombre, Email, Contraseña, Confirmar Contraseña
3. Haz clic en **"Guardar"**
4. ✅ Deberías ser redirigido a la página de inicio como usuario logueado

## 🔑 Puntos Clave de la Demo

### 🎯 Funcionalidad Crítica - Actualización de Saldo
Este es el corazón del proyecto. Cada operación de pago actualiza automáticamente:

| Operación | Acción | Saldo |
|-----------|--------|-------|
| **Crear Pago** | `POST /pagos` | `saldo = saldo - monto_cuota` |
| **Editar Pago** | `PATCH /pagos/:id` | `saldo = saldo + montoAnterior - montoNuevo` |
| **Eliminar Pago** | `DELETE /pagos/:id` | `saldo = saldo + monto_cuota` |
| **Saldo = 0 o menos** | Automático | `cancelado = true` |

### 📊 Datos Consistentes
- Busca siempre en DevTools (F12) → Application → LocalStorage
- Verifica que `token` y `userName` se actualicen al login
- Recarga la página (Ctrl+F5) para verificar persistencia



## 👤 Usuarios de Prueba

| Email | Contraseña | Nombre |
|-------|-----------|--------|
| juan@correo.com | 123456 | Juan Pedro |
| patricia@email.com | 123456 | Patricia |
| ale@email.com | 123456 | Alejandra |

## 📂 Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── BaseModal.vue
│   ├── Menu.vue
│   ├── TheWelcome.vue
│   └── icons/
├── views/                   # Vistas principales
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   ├── Homeview.vue
│   ├── user/
│   │   ├── UserList.vue     # Listar usuarios
│   │   ├── UserNew.vue      # Crear usuario
│   │   ├── UserEdit.vue     # Editar usuario
│   │   ├── UserNote.vue     # Ver créditos del usuario
│   │   └── UserCredito.vue
│   ├── credito/
│   │   ├── CreditoList.vue  # Listar créditos
│   │   ├── CreditoNew.vue   # Crear crédito
│   │   ├── CreditoEdit.vue  # Editar crédito
│   │   └── CreditoPago.vue  # Ver pagos del crédito
│   └── pago/
│       ├── PagoList.vue     # Listar pagos
│       ├── PagoNew.vue      # Crear pago
│       └── PagoEdit.vue     # Editar pago
├── services/                # Servicios y API
│   ├── api.js               # Configuración Axios
│   ├── authService.js       # Funciones de autenticación
│   ├── appMemory.js         # Estado global reactivo
│   ├── creditoService.js    # Funciones de créditos
│   └── userService.js       # Funciones de usuarios
├── router/
│   └── index.ts             # Configuración de rutas
├── assets/
│   ├── base.css
│   └── main.css
├── App.vue
└── main.ts

db.json                       # Base de datos json-server
routes.json                   # Config rutas json-server
```

## 🔄 Flujo Principal

### 1. Autenticación
```
Login → Validar credenciales → Guardar token → Mostrar usuario en menú
```

### 2. Gestión de Usuarios
- **Listar:** GET `/users`
- **Crear:** POST `/users`
- **Editar:** PATCH `/users/:id`
- **Eliminar:** DELETE `/users/:id`

### 3. Gestión de Créditos
- **Listar:** GET `/creditos?_expand=user`
- **Crear:** POST `/creditos`
- **Editar:** PATCH `/creditos/:id`
- **Eliminar:** DELETE `/creditos/:id`

### 4. Gestión de Pagos (Lógica Especial)
- **Crear Pago:** 
  1. POST `/pagos` 
  2. Obtener crédito: GET `/creditos/:creditoId`
  3. **Lógica:** `nuevoSaldo = saldo - monto_cuota`
  4. PATCH `/creditos/:creditoId` con nuevo saldo
  
- **Editar Pago:**
  1. PATCH `/pagos/:id`
  2. **Cálculo:** `nuevoSaldo = saldo + montoAnterior - montoNuevo`
  3. PATCH `/creditos/:creditoId` actualiza saldo

- **Eliminar Pago:**
  1. **Restaura saldo:** `nuevoSaldo = saldo + monto_cuota`
  2. DELETE `/pagos/:id`
  3. PATCH `/creditos/:creditoId` restaura saldo

## 💾 Modelos de Datos

### Usuario
```javascript
{
  id: number,
  email: string,
  password: string,
  name: string
}
```

### Crédito
```javascript
{
  id: number,
  userId: number,           // Relación con usuario
  monto_prestado: number,
  descripcion: string,
  tasa_interes: number,
  saldo: number,            // Se actualiza con pagos
  cancelado: boolean        // true cuando saldo <= 0
}
```

### Pago
```javascript
{
  id: number,
  creditoId: number,        // Relación con crédito
  monto_cuota: number,
  fecha: string,            // Formato: YYYY-MM-DD
  metodo: "Transferencia" | "QR",
  comprobante: string
}
```

## 🎯 Funcionalidades Especiales

### Búsqueda y Filtros
- **Usuarios:** Búsqueda por nombre
- **Créditos:** Búsqueda por nombre de asesor, filtro por estado (cancelado/activo)
- **Pagos:** Búsqueda por ID de crédito, filtro por método (Transferencia/QR)

### Actualización Automática de Saldo
Todas las operaciones con pagos actualizan el saldo del crédito:
- Crear pago → resta
- Editar pago → recalcula
- Eliminar pago → restaura

### Estado Reactivo
Usa `appMemory` para mantener el estado global:
- `userName` - Nombre del usuario logueado
- `userId` - ID del usuario logueado
- Los cambios se reflejan inmediatamente en el menú

## 🔐 Protección de Rutas

Rutas protegidas (requieren token):
- `/usuarios`
- `/creditos`
- `/creditos/:id/pagos`
- `/usuario/:id/creditos`
- `/pagos`

Rutas públicas:
- `/` (Home)
- `/login`
- `/register`
- `/about`

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor Vite en puerto 5173

# Construcción
npm run build        # Build con type-check
npm run build-only   # Build sin type-check
npm run preview      # Previsualiza build

# Utilidades
npm run type-check   # Verifica tipos TypeScript
```

## 🚨 Puertos

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

## 🐛 Solución de Problemas

### Error "Credenciales incorrectas"
- Verifica que json-server esté corriendo en puerto 3000
- Comprueba que .env tenga `VITE_API_URL=http://localhost:3000`
- Recarga la página (Ctrl+F5)

## 📚 Recursos Útiles

- [Documentación Vue 3](https://vuejs.org)
- [Documentación Vite](https://vitejs.dev)
- [json-server](https://github.com/typicode/json-server)
- [Axios](https://axios-http.com)

## 👨‍💻 Notas de Desarrollo

- Usar `vue-tsc --build` para verificar tipos antes de commits
- Los cambios en db.json requieren reiniciar json-server
- Los filtros son reactivos (client-side)
- Las búsquedas son case-insensitive

---

**Última actualización:** Abril 2026  
**Versión del Proyecto:** 0.0.0  
**Propósito:** Educativo - Diplomado Fullstack

