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
            required: false
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: String || Number,
            required: false,
            default: 'default'
        }
    })
    function getNameInitials(){
        const name = props.name ?? '??'
        const lastName = props.lastName ?? name.slice(1)
        return name[0]+lastName[0]
    }
</script>
<template>
    <v-avatar v-if="props.avatar" :size="props.size">
      <v-img
        :src="props.avatar"
        :alt="getNameInitials()"
      ></v-img>
    </v-avatar>
    <v-avatar :color="props.color" :size="props.size" v-else>
      <span class="text-h5">{{getNameInitials()}}</span>
    </v-avatar>
</template>