<!--<template>-->
<!--  <div class="info-table">-->
<!--    <table class="info-table__table">-->
<!--      <thead class="info-table__table__head">-->
<!--      <tr>-->
<!--        <th><b>Статус</b></th>-->
<!--        <th><b>Команда 1</b></th>-->
<!--        <th><b>Счёт</b></th>-->
<!--        <th><b>Команда 2</b></th>-->
<!--      </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr :class="{'in-progress': inProgress(item.time)}" align="center" v-for="item in items">-->
<!--        <td class="info-table__table__item">{{ item.time }}</td>-->
<!--        <td class="info-table__table__item">-->
<!--          <div class="info-table__table__item__card" v-for="card in cards(item.command1.redCardNumber)"></div>-->
<!--          {{ item.command1.name }}-->
<!--          <img class="info-table__table__item__logo" :src="require(`client/common/images/${item.command1.logo.toUpperCase()}.png`)" alt="logo">-->
<!--        </td>-->
<!--        <td class="info-table__table__item">{{ item.command1.goals || '-' }} : {{ item.command2.goals || '-' }}</td>-->
<!--        <td class="info-table__table__item command-2">-->
<!--          <img class="info-table__table__item__logo" :src="require(`client/common/images/${item.command2.logo.toUpperCase()}.png`)" alt="logo">-->
<!--          {{ item.command2.name }}-->
<!--          <div class="info-table__table__item__card" v-for="card in cards(item.command2.redCardNumber)"></div>-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import Vue from 'vue'-->
<!--  import Component from 'vue-class-component'-->
<!--  import io from 'socket.io-client'-->
<!--  // @ts-ignore-->
<!--  import items from '@/client/common/__data/info.json'-->
<!--  import {Getter} from 'vuex-class'-->

<!--  @Component({-->
<!--    name: 'info-table',-->
<!--    data() {-->
<!--      return {-->
<!--        socket : io('localhost:8080'),-->
<!--        msg: null-->
<!--      }-->
<!--    },-->
<!--  })-->
<!--  export default class InfoTable extends Vue {-->
<!--    @Getter('message')-->
<!--    private message: any-->
<!--    @Getter('connect')-->
<!--    private connect: any-->

<!--    items: any = items-->


<!--    cards(cards: number) {-->
<!--      const result = []-->
<!--      if (cards) {-->
<!--        let i = 1-->
<!--        while (i < cards) {-->
<!--          result.push(i)-->
<!--          i++-->
<!--        }-->
<!--      }-->
<!--      return result-->
<!--    }-->

<!--    inProgress(time: string) {-->
<!--      return time.toLocaleLowerCase() !== 'закончен' && time.toLocaleLowerCase() !== 'не начался'-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--  .info-table {-->
<!--    text-align: center;-->

<!--    &__table {-->
<!--      &__head {-->
<!--        font-size: 18px;-->
<!--      }-->
<!--      &__item {-->
<!--        position: relative;-->
<!--        padding: 10px 20px;-->
<!--        &__card {-->
<!--          width: 7px;-->
<!--          height: 10px;-->
<!--          display: inline-block;-->
<!--          background: red;-->
<!--          margin: 0 2px;-->
<!--          border-radius: 2px;-->
<!--        }-->
<!--        &__logo {-->
<!--          position: absolute;-->
<!--          top: 10px;-->
<!--          right: 0;-->
<!--          width: 15px;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--  .command-2 .info-table__table__item__logo {-->
<!--    left: 0;-->
<!--  }-->
<!--  .in-progress {-->
<!--    color: red;-->
<!--  }-->
<!--</style>-->

<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">User:</label>
          <input id="user" type="text" v-model="user" class="form-control">
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input id="message" type="text" v-model="message" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client';
  export default {
    data() {
      return {
        user: '',
        message: '',
        messages: [],
        socket : io('localhost:8080')
      }
    },
    methods: {
      sendMessage(e) {
        e.preventDefault();

        this.socket.emit('SEND_MESSAGE', {
          user: this.user,
          message: this.message
        });
        this.message = ''
      }
    },
    mounted() {
      this.socket.on('news', (data) => {
        console.log(data);
        this.socket.emit('my other event', { my: 'data' });
      });
    }
  }
</script>
