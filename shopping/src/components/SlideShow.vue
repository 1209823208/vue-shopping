<template>
  <div class="slideShow" @mouseover="clearInv" @mouseout="runInv">
    <a>
      <img class="pic" :src="slideList[currentIndex].img">
    </a>
    <div class="link-number">
      <div class="clearfix">
        <a class="fl">ssss</a>
        <ul class="fr">
          <li @click="changeCurrentIndex('pre')"><</li>
          <li :class="{on:index ===currentIndex}" @click="changeCurrentIndex(index)" v-for="(item,index) in slideList">
            {{index + 1}}
          </li>
          <li @click="changeCurrentIndex('last')">></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      slideList: {
        type: Array,
        default: []
      },
      inv: {
        type: Number,
        default: 1000
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      changeCurrentIndex(index) {
        if (index === 'pre') {
          if (this.currentIndex === 0) {
            this.currentIndex = this.slideList.length - 1
          } else {
            this.currentIndex -= 1;
          }

        } else if (index === 'last') {
          if (this.currentIndex === this.slideList.length - 1) {
            this.currentIndex = 0
          } else {
            this.currentIndex += 1;
          }

        } else {
          this.currentIndex = index;
        }
      },
      runInv() {
        this.invId = setInterval(() => {
          this.changeCurrentIndex('last');
        }, this.inv)
      },
      clearInv() {
        clearInterval(this.invId)
      }

    },
    mounted() {
      this.runInv();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .slideShow {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .slideShow .pic {
    height: 100%;
  }

  .link-number {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    padding: 10px;
    background: #1A1A1A;
    z-index: 1;
    color: #fff;
  }

  .link-number a {
    color: #fff;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .link-number li {
    cursor: hand;
  }

  .link-number li.on {
    text-decoration: underline;
  }

</style>
