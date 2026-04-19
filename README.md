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

1. **Descargar/Clonar el proyecto**
```bash
cd proyecto_final
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Verificar configuración de entorno**
El archivo `.env` está preconfigurado:
```
VITE_API_URL=http://localhost:3000
VITE_TIMEOUT=3001
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

### No muestra usuario logueado en menú
- Abre DevTools → Application → LocalStorage
- Verifica que exista key `token`
- Recarga la página

### Puerto 3000 en uso
```bash
npx json-server db.json --port 3001
# Actualiza .env: VITE_API_URL=http://localhost:3001
```

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

