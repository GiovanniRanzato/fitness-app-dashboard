<script setup lang="ts">
import { ref } from "vue"
import { useUsersStore } from "../stores/users"
import BaseTableBtnEdit from "../components/base/BaseTableBtnEdit.vue"
import BaseTableBtnDelete from "../components/base/BaseTableBtnDelete.vue"
const usersStore = useUsersStore()
const page =ref(1)
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
      <tr v-for="item in usersStore.getUsers" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.email }}</td>
        <td><v-chip size="small" :color="usersStore.getColor(item.role)" class="mt-1">{{ usersStore.getRole(item.role)
        }}</v-chip></td>
        <td class="text-right"><v-col cols="auto">
            <BaseTableBtnEdit />
            <BaseTableBtnDelete />
        </v-col></td>
      </tr>
    </tbody>
  </v-table>
  <v-divider class="mb-6"></v-divider>
  <v-pagination
    v-model="page"
    :length="4"
    active-color="blue"
    rounded="circle"
  ></v-pagination>
</template>