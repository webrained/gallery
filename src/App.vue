<!-- App component -->

<template>
  <div id="app" class="container">

      <!-- Container start -->
      <v-container grid-list-xl>

          <!-- Gallery block start -->
            <v-layout class="white" row wrap style="min-height: 400px">

                <!-- Gallery header start -->
                <v-flex xs12 class="header align-center justify-space-between">
                    <strong class="pl-2">Image gallery</strong>

                    <!-- File upload start -->
                    <v-form ref="form" enctype="multipart/form-data" @submit.prevent lazy-validation
                            class="d-flex justify-center">
                        <v-btn fab dark color="indigo accent-2" @click="pickFile">
                            <v-icon class="white--text">add</v-icon>
                        </v-btn>
                        <input
                                type="file"
                                style="display: none"
                                ref="file"
                                id="image-upload"
                                @change="onFilePicked($event)"
                                required
                        >
                    </v-form>
                    <!-- File upload end -->

                </v-flex>
                <!-- Gallery header end -->

                <v-flex xs12 class="content">
                    <v-layout row wrap>

                        <!-- Gallery item start -->
                        <v-flex xs12 sm6 md4 lg3 v-for="(image, i) in images" :key="i" @click="showGallery(i)">
                            <gallery-item :url="image.image" :date="image.date"></gallery-item>
                        </v-flex>
                        <!-- Gallery item start -->

                        <!-- Empty gallery start -->
                        <v-flex v-if="images.length == 0">
                            <h1 class="text-xs-center red--text">Your Gallery is empty</h1>
                        </v-flex>
                        <!-- Empty gallery start -->

                    </v-layout>
                </v-flex>
            </v-layout>
          <!-- Gallery block end -->

      </v-container>
      <!-- Container end -->

      <!-- Modal Gallery component inside start -->
      <v-dialog v-model="dialog" lazy origin hide-overlay max-width="600px">
          <gallery :images="images" :value="index"></gallery>
      </v-dialog>
      <!-- Modal Gallery component inside end -->

  </div>
</template>

<script>

    // import Image and Gallery components
    import Image from './components/Image'
    import Gallery from './components/Gallery'

    export default {
        // Components
        components: {
            "gallery-item" : Image,
            Gallery
        },
        mounted() {
            // Getting images from localStorage
            this.images = this.$store.state.images;
        },
        data() {
            return {
                myFile: null,
                images: [],
                dialog: false,
                index: null
            }
        },
        methods: {
            // File upload start
            pickFile() {
                this.$refs.file.click()
            },
            onFilePicked(e) {
                let myFile = e.target.files || e.dataTransfer.files;
                this.myFile = myFile;
                this.createImage( myFile[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    let obj = {
                        image:  e.target.result,
                        date:   new Date().toLocaleString()
                };
                    this.$store.commit('ADD_IMAGE', obj);
                };
                reader.readAsDataURL(file);
            },
            // Open modal
            showGallery(value) {
                this.index = value;
                this.dialog = true;
            },

        },
        updated() {
            // Checking if gallery is empty
            if(this.images.length == 0) {
                this.dialog = false;
            }
            // Setting dynamic indexes
            let item  = document.getElementsByClassName('v-jumbotron');
            for (let i = 0, len = item.length; i < len; i++) {
                console.log("i: ", i);
                item[i].setAttribute("id", i);
            }
            let btn  = document.getElementsByClassName('darken-1');
            for (let j = 0, len = btn.length; j < len; j++) {
                console.log("j: ", j);
                btn[j].setAttribute("ref", j);
            }
        }
    }
</script>

<style lang="scss">
  body{
    background-color: #DEEDF6;
    font-family: 'Quicksand', sans-serif;
    .container {
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }

    .container-fluid {
      width: 100%;
    }

    @media (min-width: 576px) {
      .container {
        width: 540px;
      }
    }
    @media (min-width: 768px) {
      .container {
        width: 720px;
      }
    }
    @media (min-width: 992px) {
      .container {
        width: 960px;
      }
    }
    @media (min-width: 1200px) {
      .container {
        width: 1140px;
      }
    }
    .text-center {
      text-align: center;
    }

    .d-flex {
      display: flex;
    }

    #app {
        height: 90vh;
        margin-top: 60px;
            .header {
                display: flex;
                height: 100px;
                > strong {
                    font-size: 24px;
                }
            }
        .v-dialog {
            position: relative;
            .v-btn--absolute {
                right: 10px;
                top: 10px;
            }
        }
        }
  .v-jumbotron__image {
      height: 100%;
  }
  }

</style>
