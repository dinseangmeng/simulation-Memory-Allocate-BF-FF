<script setup>

const intToString=(num)=>{
  return num>=1000?num/1000 + "K":num;
}




</script>

<template>
  <div>
    <table >
      <tr>
        <th>Memory Block</th>
      </tr>
      <tr v-for="item in $store.state.memory">
        <td   :style="{'--Item-size--':item.size, '--base--':$store.state.Base,'--background--':item.color}" :title="'Address:'+item.address">{{ intToString(item.size) }} </td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="scss">
th{
  font-size: 2rem;
  font-family: 'Fira Sans', sans-serif;
}
td{
  text-align: center;
  height: calc(var(--Item-size-- ) * var( --base--)*1px )  ;
  border: 3px solid black;
  background-color: var(--background--);
  
}
</style>