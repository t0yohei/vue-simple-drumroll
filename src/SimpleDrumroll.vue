<template>
  <div>
    <input v-model.number="number" type="number" />
    <p>{{ animatedNumber }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: function() {
    return {
      number: 0,
      rollingNubmer: 0,
      intervalId: 0
    };
  },

  computed: {
    animatedNumber: function(): string {
      return this.rollingNubmer.toFixed(0);
    }
  },

  watch: {
    number(newVal: number, oldVal: number) {
      if (newVal === oldVal) {
        return;
      }
      this.performDrumRolling(newVal, oldVal);
    }
  },

  methods: {
    performDrumRolling(newVal: number, oldVal: number): void {
      // ドラムローリング中に再度値の変更があった場合のために、 変更前の値を使用して初期化しておく
      this.setUpDrumRolling(oldVal);
      // 0.5秒以内にドラムロールが完了するようにする
      const countInterval = Math.abs(Math.floor((newVal - oldVal) / 50)) || 1;
      if (oldVal < newVal) {
        this.intervalId = window.setInterval((): void => {
          this.countUp(newVal, countInterval);
        }, 10);
      } else if (newVal < oldVal) {
        this.intervalId = window.setInterval((): void => {
          this.countDown(newVal, countInterval);
        }, 10);
      }
    },
    setUpDrumRolling(oldVal: number): void {
      this.rollingNubmer = oldVal;
      this.resetInterval();
    },
    resetInterval(): void {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    },
    countUp(newVal: number, countInterval: number): void {
      if (newVal <= this.rollingNubmer) {
        this.rollingNubmer = newVal;
        this.resetInterval();
        return;
      }
      this.rollingNubmer = this.rollingNubmer + countInterval;
    },
    countDown(newVal: number, countInterval: number): void {
      if (newVal >= this.rollingNubmer) {
        this.rollingNubmer = newVal;
        this.resetInterval();
        return;
      }
      this.rollingNubmer = this.rollingNubmer - countInterval;
    }
  }
});
</script>

<style scoped></style>
