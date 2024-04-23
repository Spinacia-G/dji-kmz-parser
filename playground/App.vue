<script setup lang="ts">
import kmzFile from "./flight-2.kmz?url"
import { jsonToKmz, kmzToJson } from "../lib"
// import { jsonToKmz, kmzToJson } from "../packages/parser.ts"
import { testObj } from "./obj.ts"

fetch(kmzFile)
  .then(async (res: Response) => {
    const obj = await kmzToJson(res)
    console.log(obj, "kmz")
  })
  .catch((err: string) => console.log(err))

jsonToKmz(testObj as any).then((res: Blob) => {
  const a = document.createElement("a")
  a.href = window.URL.createObjectURL(res)
  a.download = `flight-${new Date().getTime()}.kmz`
  a.click()
}).catch((err: string) => console.log(err))
</script>

<template>
  <div>1</div>
</template>

<style scoped lang="scss"></style>
