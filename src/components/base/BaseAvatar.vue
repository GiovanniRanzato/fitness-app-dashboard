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
        console.log()
        const firstLetter = props.name[0] ?? '?'
        const secondLetter = props.lastName ? props.lastName[0] : (props.name.slice(1) ? props.name.slice(1) : ' ')
        return firstLetter+secondLetter
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