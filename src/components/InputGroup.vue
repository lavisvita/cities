<template>
  <div>
    <div v-for="prop in item" v-bind:key="prop.id">

      <div>
        <input type="text" v-model="cityOne">
        <input type="text" v-model="cityTwo">

        <button @click="onCompute(prop, [cityOne, cityTwo])"
                :disabled='buttonBlock' >GO!</button>
        <button @click="clearFields()"
                :disabled='buttonBlock'>Clear</button>
      </div>
    </div>
    <div>
      <ul>
        <li v-for="prop in info" v-bind:key="prop.id">
          <div v-if="prop.error" style="color: red">
            <span>{{prop.error.status}} </span>
            <span>{{prop.error.message}}</span>
          </div>
          <div v-else>
            <span>{{prop.time}}</span>
            <span>{{prop.cities[0]}} - {{prop.cities[1]}} = </span>
            <span v-html="prop.distance"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'inputGroup',
    props:{
      item: ''
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
        this.$emit('show-distance', index ,arr)
      }
    }
  }
</script>
