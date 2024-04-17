<script setup lang="ts">
import kmzFile from '/files/flight.kmz?url'
import kmlFile from '/files/template.kml?url'
import { kmzToJson, xmlToJson } from '../lib'

fetch(kmzFile)
  .then(async (res: Response) => {
    const obj = await kmzToJson(res)
    console.log(obj, 'kmz')
  })
  .catch(err => console.log(err))

fetch(kmlFile).then(async (res: Response) => {
  const obj = await xmlToJson(res)
  console.log(obj, 'kml')
})
</script>

<template>
  <div> 111 </div>
</template>

<style scoped lang="scss"></style>
