<template>
  <div>
    <h2 class="title">Cities Distance</h2>
    <div class="container">
      <span @click="addFieldsGroup()" class="btn--add-Fields">+</span>
      <div class="main-components">
        <input-group :item="item" :index="index" v-for="(item, index) in fieldsGroup"
                     v-bind:key="index"
                     @show-distance="getDistance" class="input-group"
                     @delete-group="deleteGroup"
                     v-model="fieldsGroup"
        />
      </div>
    </div>
  </div>
</template>

<script>
import yaMaps from '../plugins/yaMaps'
import inputGroup from './InputGroup'
import moment from 'moment'

export default {
  name: 'cities',
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
  beforeMount(){
    this.fieldsGroup.push({
      buttonBlock: false,
      info: [],
      id:this.id++
    })
  },
  methods: {
    async getDistance(ind, cities) {
      try{
        this.fieldsGroup[ind].buttonBlock = true;
        const date = moment().format('MM/DD в hh:mm');
        let result = [];
        for(let item of cities) {
          let pos = await this.$methods.getDist(item);
          result.push(pos)
        }
        /**
         * TODO window
         * */
        let dis = await window.ymaps.route(result, {mapStateAutoApply: false});
        if(dis) {
          this.fieldsGroup[ind].buttonBlock = false;
          this.fieldsGroup[ind].info.push({
            cities: cities,
            time: date,
            distance: dis.getHumanLength()
          })
        }
      } catch(error){
        const date = moment().format('MM/DD в hh:mm');

        this.fieldsGroup[ind].info.push({
          error: {
            time: date,
            status: error.status,
            message: error.message
          }
        })
        this.fieldsGroup[ind].buttonBlock = false;
      }
    },
    addFieldsGroup() {
      if(this.$children.length < 10) {
        this.fieldsGroup.push({
            buttonBlock: false,
            info: [],
            id:this.id++
        })
      }
    },
    deleteGroup(ind){
      this.fieldsGroup.splice(ind, 1);
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .title
    text-align: center
  .container
    display: grid
    grid-template-columns: 1fr 2fr 8fr 1fr
    grid-template-areas: '. add-button main-components .'
    grid-template-rows: auto

  .main-components
    grid-area: main-components
  .input-group
      grid-area: input-group
      margin-bottom: 30px

  .btn--add-Fields
    border: none
    width: 30px
    font-size: 1.6em
    background: #02832b
    color: #fff
    padding: 1px 1px 0 0
    -webkit-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    border-radius: 50%
    grid-area: add-button
    justify-self: end
    height: 30px
    text-align: center
    margin-right: 10px
    &:hover
      cursor: pointer
      background: #02AC37
    &:active
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)
  @media all and (max-width: 1200px)
    .container
      grid-template-columns: 1fr 10fr 1fr
      grid-template-areas: 'add-button main-components .'

</style>
