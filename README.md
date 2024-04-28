# Dji-kmz-parser

## Usage

```bash
pnpm add dji-kmz-parser
```

1. `kmzToJson`

   Convert KMZ file (with Blob format) to JSON.

   ```typescript
   <script setup lang="ts">
   import kmzFile from '/files/flight.kmz?url'
   import { kmzToJson } from 'dji-kmz-parser/lib'
   
   fetch(kmzFile)
   	.then(async (res: Response) => {
   		const obj = await kmzToJson(res)
   		console.log(obj)
   	})
   	.catch((err: string) => console.log(err))
   </script>
   ```


2. `jsonToKmz`

   Convert JSON to KMZ file.

   ```typescript
   <script setup lang="ts">
   import flightObj from '/files/flightObj.ts'
   import { jsonToKmz } from 'dji-kmz-parser/lib'
   
   jsonToKmz(flightObj).then((res: Blob) => {
       const a = document.createElement('a')
       a.href = window.URL.createObjectURL(res)
       a.download = 'flight.kmz'
       a.click()
   }).catch((err: string) => console.log(err))
   </script>
   ```
