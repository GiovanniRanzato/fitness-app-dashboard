<script setup lang="ts">
import { defineProps, ref, onMounted, onBeforeUnmount } from 'vue';

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
const iframeHeight = ref(300);
const iframeElement = ref<HTMLIFrameElement | null>(null);

const updateIframeHeight = () => {
    if (iframeElement.value ) 
        iframeHeight.value = (iframeElement.value.offsetWidth * 9) / 16
}

onMounted(() => {
  updateIframeHeight();
  window.addEventListener('resize', updateIframeHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIframeHeight);
});
</script>
<template>
    <iframe 
        ref="iframeElement"
        width="100%" 
        :height="iframeHeight + 'px'"
        :src="loadURL()" 
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
</template>