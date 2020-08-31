<template>
  <div class="book-container">
    <div ref="bookarea" id="bookarea"></div>
    <div class="book-controls">
      <button @click="expose">Expose</button>
      <button @click="next">Next</button>
    </div>
  </div>
</template>

<script>
const appName = 'epub-anki-electron';

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
    createBook (filename, fileData) {
      if (this.book) {
        this.book.destroy();
      }
      this.book = ePub();
      this.book.open(fileData, "binary");
      this.rendition = this.book.renderTo("bookarea", {
        width: this.$refs.bookarea.clientWidth + "px",
        height: this.$refs.bookarea.clientHeight + "px",
        spread: "always"
      });
      this.displayed = this.rendition.display();
    },
    resizeBook() {
      console.log('resizeBook');
      if (this.rendition) {
        const height = this.$refs.bookarea.clientHeight + "px";
        const width = this.$refs.bookarea.clientWidth + "px";
        this.rendition.resize(width, height);
      }
    }
  },
  mounted() {
    window.ipcRenderer.on('open-file-reply', (event, data) => {
      // console.log('open-file-reply', event, data);
      // console.log('clientWidth', this.$refs.bookarea.clientWidth);
      this.$nextTick(this.createBook.bind(null, data.filename, data.fileData));
      // this.createBook(data.filename, data.fileData);
    }),
    window.addEventListener('resize', this.resizeBook)
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.resizeBook)
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .book-container{
    height: 100%;
    display: flex;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  #bookarea{
    width: 100%;
    height: 100%;
  }
  .book-controls{
    background-color: red;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
</style>
