<template>
  <div class="info-table">
    <table class="info-table__table">
      <thead class="info-table__table__head">
      <tr>
        <th><b>Статус</b></th>
        <th><b>Команда 1</b></th>
        <th><b>Счёт</b></th>
        <th><b>Команда 2</b></th>
      </tr>
      </thead>
      <tbody>
      <tr :class="{'in-progress': inProgress(item.time)}" align="center" v-for="item in items">
        <td class="info-table__table__item">
          <div v-if="inProgress(item.time)">{{ item.time }} минута</div>
          <div v-else>Окончен</div>
        </td>
        <td class="info-table__table__item">
          <div class="info-table__table__item__card" v-for="card in cards(item.command1.redCardNumber)"></div>
          {{ item.command1.name }}
          <img class="info-table__table__item__logo"
               :src="require(`client/common/images/${item.command1.logo.toUpperCase()}.png`)" alt="logo">
        </td>
        <td class="info-table__table__item">
          <div>
            {{ item.command1.goals }} : {{ item.command2.goals }}
          </div>
        </td>
        <td class="info-table__table__item command-2">
          <img class="info-table__table__item__logo"
               :src="require(`client/common/images/${item.command2.logo.toUpperCase()}.png`)" alt="logo">
          {{ item.command2.name }}
          <div class="info-table__table__item__card" v-for="card in cards(item.command2.redCardNumber)"></div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import io from 'socket.io-client'

  @Component({
    name: 'info-table'
  })
  export default class InfoTable extends Vue {
    socket = io('localhost:8080')
    $toasted: any
    items: any[] = []

    mounted() {
      this.socket.on('connect', (data: any) => {
        this.$toasted.show('Соединение установлено', {
          type: 'success'
        })
      });
      this.socket.on('news', (data: any) => {
        this.items = data;
      });
      this.socket.on('disconnect', (data: any) => {
        this.$toasted.show('Соединение разорвано')
      });
    }


    cards(cards: number) {
      const result = []
      if (cards) {
        let i = 1
        while (i < cards) {
          result.push(i)
          i++
        }
      }
      return result
    }

    inProgress(time: string | number) {
      return typeof time === "number"
    }
  }
</script>

<style lang="scss">
  .info-table {
    &__table {
      margin: 5% auto;

      &__head {
        font-size: 18px;
      }

      &__item {
        position: relative;
        padding: 10px 20px;

        &__card {
          width: 7px;
          height: 10px;
          display: inline-block;
          background: red;
          margin: 0 2px;
          border-radius: 2px;
        }

        &__logo {
          position: absolute;
          top: 10px;
          right: 0;
          width: 15px;
        }
      }
    }
  }

  .command-2 .info-table__table__item__logo {
    left: 0;
  }

  .in-progress {
    color: red;
  }
  .toasted-container.top-center {
    top: 0;
  }
</style>
