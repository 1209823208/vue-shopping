<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            {{errorText}}
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>
</template>
<style>

</style>
<script>
  export default {
    data() {
      return {

      }
    },
    computed:{
      mdShow(){
        return this.$store.state.errorArr.mdShow;
      },
      errorText(){
        return this.$store.state.errorArr.errorText;
      }
    },
    methods: {
      closeModal() {
        let arr = {
          mdShow: false,
          errorText: '',
        };
        this.$store.commit('getErrorArr', arr);
      }
    }
  }
</script>
