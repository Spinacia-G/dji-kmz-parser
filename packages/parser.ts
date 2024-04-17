import JSZip from 'jszip'

const convertNode = (xml: Document | Element, obj: Record<string, any>) => {
  const attr = xml.nodeName.replace('wpml:', '')
  if (!xml.childNodes.length) {
    obj[attr] = undefined
  } else if (xml.childNodes[0].nodeType === Node.TEXT_NODE) {
    obj[attr] = xml.childNodes[0].nodeValue
  } else {
    if (obj[attr]) {
      if (!Array.isArray(obj[attr])) {
        obj[attr] = [obj[attr], {}]
      } else {
        obj[attr] = [...obj[attr], {}]
      }
    } else {
      obj[attr] = {}
    }
    for (const childNode of xml.childNodes) {
      convertNode(
        childNode as any,
        !Array.isArray(obj[attr]) ? obj[attr] : obj[attr].at(-1)
      )
    }
  }
}

export const xmlToJson = async (xmlLike: Response | string) => {
  let str: string
  if (xmlLike instanceof Response) {
    str = await xmlLike.text()
  } else {
    str = xmlLike
  }

  str = str
    .replaceAll('\n', '')
    .replaceAll('\t', '')
    .replaceAll(/((?<=>)\x20)|(\x20(?=<))|((?<=\x20)\x20)|(\x20(?=\x20))/g, '')

  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(str, 'text/xml')
  const obj: Record<string, any> = {}
  convertNode(xmlDoc, obj)
  return Promise.resolve(obj['#document'].kml.Document)
}

export const kmzToJson = async (blobLike: Response | Blob) => {
  let blob: Blob
  if (blobLike instanceof Response) {
    blob = await blobLike.blob()
  } else if (blobLike instanceof Blob) {
    blob = blobLike
  } else {
    return Promise.reject('zip is missing')
  }

  if (blob) {
    const kmzObj: Record<string, any> = {}
    let res: JSZip
    try {
      res = await JSZip.loadAsync(blob)
    } catch {
      return Promise.reject('zip is missing')
    }
    const promises: Promise<any>[] = []
    res.forEach((_: string, file: JSZip.JSZipObject) => {
      if (!file.dir) {
        promises.push(
          res
            .file(file.name)!
            .async('string')
            .then((str: string) =>
              str
                .replaceAll('\n', '')
                .replaceAll('\t', '')
                .replaceAll(
                  /((?<=>)\x20)|(\x20(?=<))|((?<=\x20)\x20)|(\x20(?=\x20))/g,
                  ''
                )
            )
            .then((str: string) => {
              const parser = new DOMParser()
              const xmlDoc = parser.parseFromString(str, 'text/xml')
              const obj: Record<string, any> = {}
              convertNode(xmlDoc, obj)
              const objName = file.name.replace('wpmz/', '').split('.')[0]
              Object.assign(kmzObj, {
                [objName]: obj['#document'].kml.Document
              })
            })
        )
      }
    })
    await Promise.all(promises)
    return Promise.resolve(kmzObj)
  } else {
    return Promise.reject('zip is missing')
  }
}
