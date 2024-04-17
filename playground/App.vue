<script setup lang="ts">
import kmzFile from "./flight.kmz?url";
import { kmzToJson } from "../lib";

fetch(kmzFile)
  .then(async (res: Response) => {
    const obj = await kmzToJson(res);
    console.log(obj, "kmz");
  })
  .catch((err) => console.log(err));
</script>

<template>
  <div>111</div>
</template>

<style scoped lang="scss"></style>
