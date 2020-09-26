<template>
  <div class="markdown-container">
    Markdown
    <editor :options="options"/>

  </div>
</template>

<script>

import { Editor } from '@toast-ui/vue-editor';
import hljs from 'highlight.js';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';


export default {
  name: 'Markdown',
  data() {
    return {
      options: {
        hooks: {
          addImageBlobHook(blob, callback) {
            callback("11", "alt text");
            return false;
          }
        },
        useDefaultHTMLSanitizer: false,
        plugins: [
            [codeSyntaxHighlight, { hljs }]
        ]
      }
    }
  },
  mounted() {
  },
  components: {
    Editor
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
