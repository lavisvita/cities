<template>
  <div class="">
    <h2>Cities Distance</h2>
      <input-group :item="item" v-for="item in fieldsGroup"
                   v-bind:key="item.id"
                   @show-distance="getDistance"
      />

    <button @click="addFieldsGroup()">Add fields</button>
  </div>
</template>


<script>
import yaMaps from '../plugins/yaMaps'
import inputGroup from './InputGroup'
import moment from 'moment'

export default {
  name: 'start',
  components: {
    inputGroup,
    yaMaps
  },
  data () {
    return {
      id: 0,
      fieldsGroup: []
    }
  },
  methods: {
    async getDistance(ind, cities) {
      try{
        this.$children[ind].buttonBlock = true
        const date = moment().format('MM/DD в hh:mm');
        let result = [];
        for(let item of cities) {
          let pos = await this.$helpers.getDist(item)
          result.push(pos)
        }
        let dis = await window.ymaps.route(result, {mapStateAutoApply: false});
        console.log(dis);
        if(dis) {
          this.$children[ind].buttonBlock = false
          this.$children[ind].info.push({
            cities: cities,
            time: date,
            distance: dis.getHumanLength()
          });
        }
        if( this.$error ) {
          this.$children[ind].info.push({
            error: this.error
          });
        }

      } catch(e){

      }

    },
    addFieldsGroup() {
      if(this.id < 10) {
        this.fieldsGroup.push({
            id:this.id++
        })
      }
    }
  },

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
a {
  color: #42b983;
}
</style>
