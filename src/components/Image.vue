<!-- Single Image component -->

<template>

    <!-- Image Card start -->
    <v-card>
        <!-- Binding url from props -->
        <img :src="url" width="100%" height="275px">
    </v-card>
    <!-- Image Card end -->

</template>

<script>
    export default {
        // Get properties from App component
        props: ['url', 'date']
    }
</script>
