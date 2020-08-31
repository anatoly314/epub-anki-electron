<template>
  <div class="book-container">
    <div>
      2
      <button @click="uploadDialogFile">Upload Dialog</button>
      <button @click="expose">Expose</button>
      <button @click="test">Test</button>
      <div style="margin-top: auto; margin-bottom: auto; margin-left: 10px;"> <!-- https://stackoverflow.com/a/54677618/947111 -->
        <button @click="$refs.inputUpload.click()">Upload Subtitles</button>
        <input v-show="false" ref="inputUpload" type="file" @change="createBook">
      </div>
      <button @click="next">Next</button>
    </div>
    <div ref="bookarea" id="bookarea"></div>
  </div>
</template>

<script>
// import { ipcRenrerer } from 'electron';
const appName = 'epub-anki-electron';
import fs from 'fs';
import { ipcRenderer } from 'electron';

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
    test () {
      // ipcRenrerer.send('item:add');
    },
    expose () {
      console.log('rendition', this.rendition);
      console.log('book', this.book);
      console.log('displayed', this.displayed);
    },
    next() {
      this.rendition.next();
    },
    uploadDialogFile () {
      ipcRenderer.send('open-file-dialog');
      ipcRenderer.on('open-file-dialog-reply', (event, result) => {
        console.log('open-file-dialog-reply', event, result);
        // eslint-disable-next-line no-undef
        // const fileLocation = path.join(__static, 'myText.txt');
        const fileContents = fs.readFileSync(result.file, 'binary');
        this.createBookTest(fileContents, result.file);
        // console.log('file contents', fileContents);
      })
    },

    createBookTest (file, filename) {
      this.book = ePub();
      this.book.open(file, "binary");
      this.rendition = this.book.renderTo("bookarea", {
        width: '100%',
        height: 800,
        spread: "always"
      });
      this.displayed = this.rendition.display();
    },

    async createBook (event) {
      console.log(this.$refs.bookarea.clientWidth);
      console.log(this.$refs.bookarea.clientHeight);
      const file = await this.uploadFile(event);
      this.book = ePub();
      this.book.open(file, "binary");
      this.rendition = this.book.renderTo("bookarea", {width: 600, height: 800});
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
    },
    loadBook (path) {
      const myNotification = new Notification('Title', {
        body: 'Lorem Ipsum Dolor Sit Amet'
      })
      const safePathToBookbook = `${appName}-safe-file-protocol://${path}`;
      console.log(safePathToBookbook, myNotification);
    }
  },
  mounted() {
    // window.ipcRenderer.on('open-file-dialog-reply', (event, data) => {
    //   console.log(event, data);
    //   this.loadBook(data.file);
    // })
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
  }
  #bookarea{
    width: 100%;
  }
</style>
