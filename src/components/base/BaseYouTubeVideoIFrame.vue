<script setup lang="ts">

const props = defineProps({
    mediaUrl: {
        type: String,
        required: true
    }
})
const loadURL = () => {
    const youtubeEmbedTemplate = "https://www.youtube.com/embed/";
    const url = props.mediaUrl.split(
        /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/
    );

    const YId =
        undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0];
    console.log("YId", YId);
    if (YId === url[0]) {
        console.log("not a youtube link");
    } else {
        console.log("it's  a youtube video");
    }
    const topOfQueue = youtubeEmbedTemplate.concat(YId);

    return topOfQueue;

}
</script>
<template>
    <iframe width="100%" height="300" :src="loadURL()" frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</template>