<script setup lang="ts">
import { computed } from "vue"
import { useUsersStore } from "../../stores/users"
import { useAuthStore } from '../../stores/auth'
import BaseTableBtnEdit from "../../components/base/BaseTableBtnEdit.vue"
import BaseTableBtnDelete from "../../components/base/BaseTableBtnDelete.vue"
import BaseAlertInfo from "../../components/base/BaseAlertInfo.vue"
import router from "../../router/index"

const usersStore = useUsersStore()
const authStore = useAuthStore()

usersStore.retrieveUsers()
const users = computed(() => usersStore.getUsers)
const metadata = usersStore.getMetadata

const editUser = (userId: Number) => { 
  router.push({ name: 'users-edit', params: { id: userId.toString() } })
}
const deleteUser = (userId: Number) =>{ 
  usersStore.deleteUser(userId)
}

const onPageChange = () => {
  usersStore.retrieveUsers()
}
</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Cognome</th>
        <th>Email</th>
        <th>Ruolo</th>
        <th class="text-right"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in users" :key="item.id" >
        <td>{{ item.name }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.email }}</td>
        <td><v-chip size="small" :color="usersStore.getColor(item.role)" class="mt-1">{{ usersStore.getRole(item.role)
        }}</v-chip></td>
        <td class="text-right"><v-col cols="auto">
            <BaseTableBtnEdit v-if="authStore.canUpdateUsers" @click="()=> editUser(item.id)"/>
            <BaseTableBtnDelete v-if="authStore.canDeleteUsers" :onConfirmDelete="() => deleteUser(item.id)" />
        </v-col></td>
      </tr>
    </tbody>
  </v-table>
  <v-divider class="mb-6"></v-divider>
  <v-pagination
    v-if="metadata.pageTotal > 1"
    v-model="metadata.pageNumber"
    :length="metadata.pageTotal"
    active-color="blue"
    rounded="circle"
    @click="onPageChange"
  ></v-pagination>
  <BaseAlertInfo v-if="!users || users.length == 0">Nessun record presente</BaseAlertInfo>
</template>