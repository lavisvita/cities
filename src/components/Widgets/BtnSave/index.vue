<template>
  <div class="btn-container">
    <div >
      <div>
        <b-button :variant="success"
                  :size="size"
                  :disabled="disable"
                  @click="callback()">
          <b-spinner small
                     type="grow"
                     v-if="progress"
          />
          {{msg}}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BtnSave',
    props: {
      progress: Boolean,
      callback: Function,
      size: String,
      success: String,
      disable: Boolean,
      msg: String
    }
  }
</script>

<style scoped>
  .btn-container {
    width: -moz-fit-content;
    width: fit-content;
    margin-left: 10px;
  }
  .progress {
    height: 5px;
    position:relative;
    top: -5px;
  }
  .btn-success:focus {
    box-shadow: none;
  }
</style>
