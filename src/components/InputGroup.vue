<template>
  <section>
      <div class="container">
        <div class="inputs">
          <input type="text" v-model="cityOne" placeholder="Пункт А">
          <input type="text" v-model="cityTwo" placeholder="Пункт Б">
          <button @click="onCompute(index, [cityOne, cityTwo])"
                  class="btn-go"
                  :disabled='item.buttonBlock' >Рассчитать</button>
          <button @click="clearFields()"
                  class="btn-clear"
                  :disabled='item.buttonBlock'>Очистить</button>
          <button @click="onDelete(index)"
                  class="btn-clear"
                  :disabled='item.buttonBlock'>Удалить</button>
        </div>
      </div>

    <div class="info">
      <ul>
        <li v-for="prop in item.info" v-bind:key="prop.id">

          <div v-if="prop.error" class="warning">
            <span>{{prop.error.time}} </span>
            <span>Status: {{prop.error.status}} </span>
            <span>{{prop.error.message}}</span>
          </div>
          <div v-else class="success">
            <span>{{prop.time}}</span>
            <span>{{prop.cities[0]}} --> {{prop.cities[1]}} = </span>
            <span v-html="prop.distance"></span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'inputGroup',
    props:{
      item: '',
      index: ''
    },
    data() {
      return {
        cityOne: '',
        cityTwo: '',
        buttonBlock: false,
        info: []
      }
    },
    methods: {
      clearFields() {
        this.cityOne = '';
        this.cityTwo = '';
      },
      onCompute(index, arr) {
        this.$emit('show-distance', index ,arr);
      },
      onDelete(index) {
        this.$emit('delete-group', index)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .warning
    color: darkred
  .success
    color: darkgreen
  ul
    padding: 0
    margin: 10px 0
    li
      margin-bottom: 10px
      list-style: none

  .btn-go, .btn-clear
    border: none
    background: #02832b
    color: #fff
    padding: 5px 10px
    -webkit-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    &:hover
      cursor: pointer
      background: #02AC37
    &:active
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  .btn-clear
    background: #cb7535
    &:hover
      background: #e88a3e
  button
    outline: none
  button[disabled]
    background: #ddd
    &:hover
      background: #ddd
      cursor: none
    &:active
      box-shadow: none
  button::-moz-focus-inner
    border: 0
  input
    border: 1px solid
    padding: 4px 5px
    border-radius: 2px
    width: 25%
  .inputs
    grid-area: inputs

  .btn-group
    grid-area: btn-group
  /*@media all and (min-width: 768px) and (max-width: 1200px)*/
  @media all and (max-width: 767px)
    input
      margin: 5px 0
      display: flex
      width: 100%

</style>

