<script setup lang="ts">
    const props = defineProps({
        avatar: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    })
    function getNameInitials(){
        return props.name[0]+props.lastName[0]
    }
</script>
<template>
    <v-avatar v-if="props.avatar">
      <v-img
        :src="props.avatar"
        :alt="getNameInitials()"
      ></v-img>
    </v-avatar>
    <v-avatar :color="props.color" v-else>
      <span class="text-h5">{{getNameInitials()}}</span>
    </v-avatar>
</template>