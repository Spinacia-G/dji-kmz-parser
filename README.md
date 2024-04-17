# Dji-kmz-parser

## Usage

```typescript
<script setup lang="ts">
import kmzFile from '/files/flight.kmz?url'
import { kmzToJson, xmlToJson } from '../lib'

fetch(kmzFile)
  .then(async (res: Response) => {
    const obj = await kmzToJson(res)
    console.log(obj)
  })
  .catch(err => console.log(err))
</script>
```
