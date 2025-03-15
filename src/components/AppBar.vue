<template>
  <v-toolbar color="transparent">
    <v-toolbar-title style="line-height: 0.8; font-size: 40px; color: white"
      >DONA<br />
      SHARE</v-toolbar-title
    >

    <v-toolbar-items>
      <v-btn style="font-size: 16px; color: white" :to="{ name: 'Main' }"
        >Question</v-btn
      >
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn style="font-size: 16px; color: white" :to="{ name: 'Record' }"
        >Dashboard</v-btn
      >
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "AppBarComponenet",
};
</script>
<style lang=""></style>
