<!-- Gallery component -->

<template>
    <!-- Carousel start -->
    <v-carousel :value="value" :cycle="false" @input="1">

        <!--Carousel items loop start-->
        <v-carousel-item v-for="(image,i) in images" :key="i" :src="image.image" :ref="i" >

            <!-- Delete button start -->
            <v-btn fab dark color="red darken-1" class="v-btn--absolute" @click="deleteImage($event)">
                <v-icon class="white--text">delete</v-icon>
            </v-btn>
            <!--Delete button end-->

            <!-- Date start -->
            <span class="date white--text">{{ image.date }}</span>
            <!-- Date end -->

        </v-carousel-item>
        <!--Carousel items loop end-->

    </v-carousel>
    <!-- Carousel end -->
</template>

<script>
    export default {
        name: "Gallery",
        // Get properties from App component
        props: ['images', 'value'],
        methods: {
            // Delete image from gallery method
            deleteImage(e) {
                let parentBtn = e.target.closest("button");
                let value = parentBtn.getAttribute("ref");
                // Delete from localStorage
                this.$store.commit('REMOVE_IMAGE', value);
            }
        },
    }
</script>

<style scoped>
    .date {
        position: absolute;
        bottom: 15px;
        right: 15px;
        z-index: 2;
    }
</style>