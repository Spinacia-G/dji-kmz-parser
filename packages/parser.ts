import JSZip from 'jszip'

export interface ActionType {
  (propName: string): string
}

export interface PointType {
  Point: {
    coordinates: string
  }
  actionGroup: {
    action: Array<ActionType>
    actionGroupEndIndex: string
    actionGroupId: string
    actionGroupMode: string
    actionGroupStartIndex: string
    actionTrigger: {
      actionTriggerType: string
    }
  }
  ellipsoidHeight: string
  height: string
  index: string
  isRisky: string
  useGlobalHeadingParam: string
  useGlobalHeight: string
  useGlobalSpeed: string
  useStraightLine: string
  waypointHeadingParam: {
    waypointHeadingAngle: string
    waypointHeadingMode: string
    waypointHeadingPathMode: string
    waypointHeadingPoiIndex: string
    waypointPoiPoint: string
  }
  waypointSpeed: string
  waypointTurnParam: {
    waypointTurnDampingDist: string
    waypointTurnMode: string
  }
}

export interface KmlType {
  author: string
  createTime: string
  updateTime: string
  Folder: {
    Placemark?: Array<PointType>
    autoFlightSpeed: string
    caliFlightEnable: string
    gimbalPitchMode: string
    globalHeight: string
    globalUseStraightLine: string
    globalWaypointHeadingParam: {
      waypointHeadingAngle: string
      waypointHeadingMode: string
      waypointHeadingPathMode: string
      waypointHeadingPoiIndex: string
      waypointPoiPoint: string
    }
    globalWaypointTurnMode: string
    payloadParam: {
      focusMode: string
      imageFormat: string
      meteringMode: string
      payloadPositionIndex: string
      returnMode: string
      samplingRate: string
      scanningMode: string
    }
    templateId: string
    templateType: string
    waylineCoordinateSysParam: {
      coordinateMode: string
      heightMode: string
    }
  },
  missionConfig: {
    droneInfo: {
      droneEnumValue: string
      droneSubEnumValue: string
    }
    executeRCLostAction: string
    exitOnRCLost: string
    finishAction: string
    flyToWaylineMode: string
    globalRTHHeight: string
    globalTransitionalSpeed: string
    payloadInfo: {
      payloadEnumValue: string
      payloadPositionIndex: string
      payloadSubEnumValue: string
    }
    takeOffRefPoint: string
    takeOffRefPointAGLHeight: string
    takeoffSecurityHeight: string
  }
}

const staticName: string[] = ['Folder', 'Placemark', 'Point', 'coordinates']

/**
 * convert Element in XML DOM to key-value pairs in JSON
 * @param {Document | Element} xml
 * @param {Record<string, any>} obj
 */
const parseNode = (xml: Document | Element, obj: Record<string, any>) => {
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
const generateNode = (root: Element, obj: Record<string, any>) => {
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
export const jsonToXml = (obj: KmlType | Record<string, any>) => {
  const rootStr = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2" xmlns:wpml="http://www.dji.com/wpmz/1.0.6"></kml>'
  const root = new DOMParser().parseFromString(rootStr, 'text/xml')
  root.childNodes[0].appendChild(root.createElement('Document'))
  generateNode(root.childNodes[0].childNodes[0] as Element, obj)
  return root
}

/**
 * create KMZ file from JSON
 * @description Reference: [how to create KMZ file](https://sdk-forum.dji.net/hc/en-us/articles/12254235478681-How-to-creat-KMZ-file)
 * @param {{template: KmlType, waylines: Record<string, any>}} obj
 * @returns {Promise<Awaited<Blob>>} KMZ file in Blob format
 */
export const jsonToKmz = async (obj: {
  template: KmlType
  waylines: Record<string, any>
}) => {
  try {
    const kmlDoc = jsonToXml(obj.template)
    const wpmlDoc = jsonToXml(obj.waylines)
    const serializer = new XMLSerializer()
    const kmlStr = serializer.serializeToString(kmlDoc)
    const wpmlStr = serializer.serializeToString(wpmlDoc)
    const zip = new JSZip()
    zip.folder('wpmz')!.file('template.kml', kmlStr)
    zip.folder('wpmz')!.file('waylines.wpml', wpmlStr)
    const res: Blob = await zip.generateAsync({ type: 'blob' })
    return Promise.resolve(res)
  } catch {
    return Promise.reject('something error')
  }
}
