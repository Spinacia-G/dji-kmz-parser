import JSZip from 'jszip'
import { TemplateFile } from './typing/template.ts'
import { WaylineFile } from './typing/wayline.ts'
import { KmzFile } from './typing'

const staticName: string[] = ['Folder', 'Placemark', 'Point', 'coordinates']
/**
 * 格式化时需要处理成数组的节点
 * - `PlaceMark` 航点信息
 * - `actionGroup` 航点动作按照 `actionTriggerType` 分组
 * - `action` 每个分组下的动作列表
 */
const arrayLikeName: string[] = ['Placemark', 'actionGroup', 'action']

/**
 * convert Element in XML DOM to key-value pairs in JSON
 * @param {Document | Element} xml
 * @param {Record<string, any>} obj
 */
const parseNode = (xml: Document | Element, obj: Record<string, any>): void => {
  const attr = xml.nodeName.replace('wpml:', '')
  if (!xml.childNodes.length) {
    obj[attr] = undefined
  } else if (xml.childNodes[0].nodeType === Node.TEXT_NODE) {
    obj[attr] = xml.childNodes[0].nodeValue
  } else {
    if (arrayLikeName.includes(attr)) {
      if (obj[attr]?.length) {
        obj[attr].push({})
      } else {
        obj[attr] = [{}]
      }
    } else {
      obj[attr] = {}
    }
    for (const childNode of xml.childNodes) {
      parseNode(
        childNode as any,
        !Array.isArray(obj[attr]) ? obj[attr] : obj[attr].at(-1)
      )
    }
  }
}

/**
 * convert XML DOM to JSON
 * @param {Response | string} xmlLike
 * @returns {Promise<Awaited<any>>}
 */
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
  parseNode(xmlDoc, obj)
  return Promise.resolve(obj['#document'].kml.Document)
}

/**
 * convert KMZ file to JSON (JavaScript Object Notation)
 * @param {Response | Blob} blobLike
 * @returns {Promise<Awaited<Record<string, any>>>}
 */
export const kmzToJson = async (blobLike: Response | Blob): Promise<KmzFile | string> => {
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
              parseNode(xmlDoc, obj)
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

const isString = (target: unknown): target is string => {
  return typeof target === 'string'
}

const isArray = (target: unknown): target is any[] => {
  return Array.isArray(target)
}

const isObject = (target: unknown): target is Record<any, any> => {
  return !Array.isArray(target) && typeof target === 'object'
}

/**
 * convert key-value pairs in JSON to Element in XML DOM
 * @param {Element} root
 * @param {Record<string, any>} obj
 */
const generateNode = (root: Element, obj: Record<string, any>): void => {
  const doc = new Document()
  for (let key in obj) {
    const xmlKey = staticName.includes(key) ? key : `wpml:${key}`
    if (isString(obj[key])) {
      const node = doc.createElement(xmlKey)
      const text = doc.createTextNode(obj[key])
      node.appendChild(text)
      root.appendChild(node)
    } else if (isArray(obj[key])) {
      for (let index in obj[key]) {
        const node = doc.createElement(xmlKey)
        root.appendChild(node)
        generateNode(node, obj[key][index])
      }
    } else if (isObject(obj[key])) {
      const node = doc.createElement(xmlKey)
      root.appendChild(node)
      generateNode(node, obj[key])
    }
  }
}

/**
 * create XML DOM from JSON
 * @param {KmlType | Record<string, any>} obj
 * @returns {Document}
 */
export const jsonToXml = (obj: TemplateFile | WaylineFile): Document => {
  const rootStr = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2" xmlns:wpml="http://www.dji.com/wpmz/1.0.6"></kml>'
  const root = new DOMParser().parseFromString(rootStr, 'text/xml')
  root.childNodes[0].appendChild(root.createElement('Document'))
  generateNode(root.childNodes[0].childNodes[0] as Element, obj)
  return root
}

/**
 * create KMZ file from JSON
 * @description [how to create KMZ file](https://sdk-forum.dji.net/hc/en-us/articles/12254235478681-How-to-creat-KMZ-file)
 * @param {{template: KmlType, waylines: Record<string, any>}} obj
 * @returns {Promise<Awaited<Blob>>} KMZ file in Blob format
 */
export const jsonToKmz = async (obj: KmzFile): Promise<Blob | string> => {
  try {
    const templateDoc = jsonToXml(obj.template)
    const waylinesDoc = jsonToXml(obj.waylines)
    const serializer = new XMLSerializer()
    const templateStr = serializer.serializeToString(templateDoc)
    const waylinesStr = serializer.serializeToString(waylinesDoc)
    const zip = new JSZip()
    zip.folder('wpmz')!.file('template.kml', templateStr)
    zip.folder('wpmz')!.file('waylines.wpml', waylinesStr)
    const res: Blob = await zip.generateAsync({ type: 'blob' })
    return Promise.resolve(res)
  } catch {
    return Promise.reject('something error')
  }
}
