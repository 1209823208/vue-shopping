<template>
  <div class="MulChoose">
    <ul>
      <li v-for="(item,index) in VersionList">
        <div class="text-style" :class="{ active: checkActive(index)}" @click="toggleSelection(index)">{{item.text}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    props: {
      VersionList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentVersion: this.VersionList.length > 0 ? [0] : []
      }
    },
    watch: {
      currentVersion: {
        handler: function (currentVersion) {
          this.$emit('on-change', currentVersion);
        },
        deep: true
      }
    },
    methods: {
      changeCurrentVersion(arr_index) {
        let flag = false;
        for (let i in this.currentVersion) {
          let val = this.currentVersion[i];
          if (arr_index === val) {
            this.currentVersion.splice(i, 1);
            flag = true;
            break;
          }
        }
        if (!flag) {
          this.currentVersion.push(arr_index);
        }
      },
      toggleSelection (index) {
        if (this.currentVersion.indexOf(index) === -1) {
          this.currentVersion.push(index)
        }
        else {
          this.currentVersion = _.remove(this.currentVersion, (idx) => {
            return idx !== index
          })
        }
      },
      checkActive(index){
        return this.currentVersion.indexOf(index) !== -1
      }
    },
    mounted() {
//      console.log(this.VersionList);
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

  .text-style {
    border: 1px solid #E3E3E3;
    width: 50px;
    height: 30px;
    float: right;
    box-sizing: border-box;
    text-align: center;
    line-height: 26px;
  }

  .text-style.active {
    background: #6EBE91;
    color: #fff;
  }
</style>















