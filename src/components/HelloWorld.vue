<template>
  <div>
    <button @click="expose">Expose</button>
    <div style="margin-top: auto; margin-bottom: auto; margin-left: 10px;"> <!-- https://stackoverflow.com/a/54677618/947111 -->
      <button @click="$refs.inputUpload.click()">Upload Subtitles</button>
      <input v-show="false" ref="inputUpload" type="file" @change="createBook">
    </div>
    <button @click="next">Next</button>
    <div id="book-area"></div>
  </div>
</template>

<script>
import ePub from 'epubjs';
export default {
  name: 'HelloWorld',
  data() {
    return {
      rendition: null,
      book: null,
      displayed: null
    }
  },
  methods: {
    expose () {
      console.log('rendition', this.rendition);
      console.log('book', this.book);
      console.log('displayed', this.displayed);
    },
    next() {
      this.rendition.next();
    },
    async createBook (event) {
      const file = await this.uploadFile(event);
      this.book = ePub();
      this.book.open(file, "binary");
      this.rendition = this.book.renderTo("book-area", {width: 600, height: 800});
      this.displayed = this.rendition.display();
    },
    uploadFile (event) {
      return new Promise((resolve, reject) => {
        const files = event.target.files || event.dataTransfer.files;
        if (!files.length) {
          return;
        }
        const file = files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          const base64 = result.split(",")[1];
          const string = atob(base64);
          return resolve(string);
        };

        reader.onerror = (error) => {
          return reject(error);
        }

        reader.readAsDataURL(file);
      })
    }
  },
  mounted() {

  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
