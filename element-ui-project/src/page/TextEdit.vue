<template>
  <div>
    <div class="edit_container">
      <quill-editor v-model="content"
                    class="editer"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @focus="onEditorFocus($event)">
      </quill-editor>
    </div>
    <div class="submit_btn">
      <el-button type="primary" @click="onSubmit()">提交</el-button>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'

  export default {
    data() {
      return {
        content: '<h2>I am Example</h2>',
        editorOption: {}
      }
    },
    components: {
      quillEditor
    },
    methods: {
      onSubmit() {
        console.log('content', this.content);
      },
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorChange({quill, html, text}) {
        console.log('editor change!', quill, html, text)
        this.content = html
      }
    },
  }
</script>
<style scoped>
  .edit_container {
    padding: 40px;
    margin-bottom: 40px;
  }

  .editer {
    height: 350px;
  }

  .submit_btn {
    text-align: center;
  }
</style>
