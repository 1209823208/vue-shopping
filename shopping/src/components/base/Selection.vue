<template>
  <div class="Selection">
    <select v-model="currentSelected">
      <option v-for="item in selectList" :value="item.val">{{item.text}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    props: {
      selectList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentSelected: this.selectList.length > 0 ? this.selectList[0].val : ''
      }
    },
    watch: {
      currentSelected: {
        handler: function (currentSelected) {
          this.$emit('on-change', currentSelected);
        },
        deep: true
      }
    },
    methods: {},
    mounted() {
//      console.log(this.selectList);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }


</style>















