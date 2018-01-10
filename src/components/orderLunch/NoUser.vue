<template>
  <div class="NoUser">
    <div class="body" v-show="showLoading">
      <div class="fireflyDiv">
        <div class="checkbox-wrap">
          <input class="checkbox" id="checkbox" type="checkbox" />
          <label class="firefly" for="checkbox">
            <div class="abdomen">
              <div class="thorax">
                <div class="head">
                  <div class="eyes"></div>
                  <div class="antennae"></div>
                </div>
              </div>
              <div class="wings">
                <div class="wing wing-a"></div>
                <div class="wing wing-b"></div>
                <div class="wing-opacity wing-a"></div>
                <div class="wing-opacity wing-b"></div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  name: "NoUser",
  directives: {},
  components: {},
  data() {
    return {
      showLoading: false,
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
  },
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {
    let vm = this;
    MessageBox.alert("后台没有您的数据<br\>请联系管理人员添加!").then(action => {
      vm.showLoading = true;
    });
  }
};
</script>

<style lang="css" scoped>
.body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background: radial-gradient(#0a2a43 30%, #09243a);
  font-family: "Asap", sans-serif;
}

.fireflyDiv {
  position: absolute;
  transform: rotate(270deg);
}

.label {
  flex: 0;
  color: #b8c5d0;
  letter-spacing: 0.04em;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 3rem;
}

@media screen and (min-width: 60rem) {
  .label {
    font-size: 5vw;
  }
}

.checkbox-wrap {
  flex: none;
  position: relative;
  width: 10%;
  min-width: 8rem;
  z-index: 1;
}

.checkbox-wrap:after {
  content: "";
  display: block;
  padding-top: 50%;
}

.checkbox {
  display: none;
}

.checkbox:checked ~ .firefly .abdomen {
  background: #27231e;
  box-shadow: inset 0 0 1.5rem rgba(150, 0, 0, 0.75);
  animation: flicker 4000ms ease infinite;
}

.checkbox:checked ~ .firefly .wing.wing-a {
  transform: rotate(30deg);
}

.checkbox:checked ~ .firefly .wing-opacity.wing-a {
  animation: shock-a 1s infinite;
}

.checkbox:checked ~ .firefly .wing.wing-b {
  transform: rotate(-30deg);
}

.checkbox:checked ~ .firefly .wing-opacity.wing-b {
  animation: shock-b 1s infinite;
}

.head {
  position: absolute;
  top: 15%;
  left: 60%;
  bottom: 15%;
  background: #27231e;
  width: 70%;
  border-radius: 40% 80% 80% 40%;
  box-shadow: inset -0.1rem 0 0 0.3rem rgba(14, 10, 10, 0.2);
}

.eyes {
  position: absolute;
  top: -5%;
  right: 10%;
  bottom: -5%;
  width: 35%;
}

.eyes:before,
.eyes:after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  border-radius: 100%;
  background: #0e0a0a;
  padding-top: 100%;
}

.eyes:before {
  top: 0;
}

.eyes:after {
  bottom: 0;
}

.antennae {
  position: absolute;
  top: 20%;
  left: -150%;
  bottom: 20%;
  width: 400%;
  z-index: -1;
}

.antennae:before,
.antennae:after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  border-color: #0e0a0a;
  border-style: solid;
  padding-top: 65%;
  border-width: 0.25rem 0.25rem 0.25rem 0;
}

.antennae:before {
  top: 80%;
  animation: Tentacles-a 1s infinite;
}

.antennae:after {
  bottom: 80%;
  animation: Tentacles-b 1s infinite;
}

.thorax {
  position: absolute;
  top: 0;
  left: 100%;
  bottom: 0;
  background: #d43b1f;
  width: 30%;
  border-radius: 20% 80% 80% 20%;
  box-shadow: inset -0.1rem 0 0.1rem 0.3rem rgba(0, 0, 0, 0.2);
}

.abdomen {
  position: absolute;
  top: 10%;
  right: 20%;
  bottom: 10%;
  background: #27231e;
  width: 100%;
  transition: all 1000ms ease;
  border-radius: 100% 30% 30% 100%;
  box-sizing: border-box;
}

.abdomen:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent 0,
    transparent 15%,
    rgba(0, 0, 20, 0.1) 15%,
    rgba(0, 0, 20, 0.1) 20%
  );
  mix-blend-mode: multiply;
  border-radius: 100% 30% 30% 100%;
  z-index: 0;
  box-shadow: inset -1rem 0 0.2rem 0.3rem rgba(0, 0, 0, 0.1);
}

.wings {
  position: absolute;
  top: -20%;
  right: 0;
  bottom: -20%;
  left: -5%;
  z-index: 1;
}

.wings .wing {
  position: absolute;
  right: 0;
  background: repeating-linear-gradient(
    #27231e 0%,
    #27231e 40%,
    #191613 40%,
    #191613 60%
  );
  width: 100%;
  height: 50%;
  transition: all 200ms ease-out;
  border: 1px solid #40341d;
  box-sizing: border-box;
  box-shadow: inset 0.2rem 0 0.1rem 0.5rem rgba(0, 0, 0, 0.5);
}
.wings .wing-opacity {
  position: absolute;
  right: 0;
  background: repeating-linear-gradient(
    #fafafa 0%,
    #fafafa 40%,
    #fffd99 40%,
    #fffd99 60%
  );
  width: 100%;
  height: 50%;
  transition: all 200ms ease-out;
  border: 1px solid #40341d;
  box-sizing: border-box;
  box-shadow: inset 0.1rem 0 0.1rem 0.1rem rgba(255, 255, 200, 0.5);
}
.wings .wing.wing-a {
  z-index: 2;
  transform-origin: bottom right;
  top: 0;
  border-radius: 90% 30% 0 20%;
}
.wings .wing-opacity.wing-a {
  z-index: 1;
  transform-origin: bottom right;
  top: 0;
  border-radius: 90% 30% 0 20%;
  background-color: rgba(255, 255, 255, 0.5);
}
.wings .wing.wing-b {
  z-index: 2;
  transform-origin: top right;
  top: 50%;
  border-radius: 20% 0 30% 90%;
}
.wings .wing-opacity.wing-b {
  z-index: 1;
  transform-origin: top right;
  top: 50%;
  border-radius: 20% 0 30% 90%;
  background-color: rgba(255, 255, 255, 0.5);
}
@keyframes flicker {
  0%,
  100% {
    background: #fefa01;
    box-shadow: 0 0 1rem #fefa01,
      inset -0.25rem 0 0 0.5rem rgba(14, 10, 10, 0.1);
  }
  30%,
  70% {
    background: #fffd99;
    box-shadow: -1rem 0 8rem 1rem #fefa01,
      inset -0.25rem 0 0 0.5rem rgba(14, 10, 10, 0.1);
  }
  50% {
    box-shadow: -1rem 0 8rem 1rem rgba(254, 250, 1, 0.8),
      inset -0.25rem 0 0 0.5rem rgba(14, 10, 10, 0.1);
  }
}
@keyframes shock-a {
  0%,
  100% {
    transform: rotate(0deg);
  }
  10%,
  90% {
    transform: rotate(6deg);
  }
  20%,
  80% {
    transform: rotate(12deg);
  }
  30%,
  70% {
    transform: rotate(18deg);
  }
  40%,
  60% {
    transform: rotate(24deg);
  }
  50% {
    transform: rotate(30deg);
  }
}
@keyframes shock-b {
  0%,
  100% {
    transform: rotate(0deg);
  }
  10%,
  90% {
    transform: rotate(-6deg);
  }
  20%,
  80% {
    transform: rotate(-12deg);
  }
  30%,
  70% {
    transform: rotate(-18deg);
  }
  40%,
  60% {
    transform: rotate(-24deg);
  }
  50% {
    transform: rotate(-30deg);
  }
}
@keyframes Tentacles-a {
  0%,
  100% {
    border-radius: 0 100% 100% 100%;
  }
  50% {
    border-radius: 0 100% 100% 95%;
  }
}
@keyframes Tentacles-b {
  0%,
  100% {
    border-radius: 95% 100% 100% 0;
  }
  50% {
    border-radius: 100% 100% 100% 0;
  }
}
</style>
