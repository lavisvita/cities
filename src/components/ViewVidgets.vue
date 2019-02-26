<template>
  <div>
    <h2 class="title">Widgets</h2>
    <h3>Button "save" with a progress bar</h3>
      <btn-save
          :callback = "callback"
          :success = "success"
          :size = "size"
          :disable = "disable"
          :progress="progress"
          :msg="msg"

      >
      </btn-save>
  </div>
</template>

<script>
import BtnSave from "./Widgets/BtnSave/index";

export default {
  name: 'ViewVidgets',
  components: {
    BtnSave
  },
  data () {
    return {
      callback: this.progressLine,
      size: 'lg',
      success: 'success',
      timeout: 0,
      max: 3,
      disable: false,
      progress: false,
      msg: 'Save'
    }
  },
  beforeMount(){
  },
  methods: {
    progressLine() {
      this.disable = true;
      this.progress = true;
      this.msg = "Loading...";
      const timer = setInterval(()=> {
        this.timeout++;
        if(this.timeout > 3) {
          clearInterval(timer);
          this.timeout = 0;
          this.disable = false;
          this.progress = false;
          this.msg = "Save";
        }
      }, 500)
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
