////////////////////////////////////////
/// 暂时只考虑 M30T 一种机型
////////////////////////////////////////

import {
  ExecuteRCLostAction,
  ExitOnRCLost,
  FinishAction,
  FlyToWaypointType,
  WaypointHeadingMode,
  WaypointHeadingPathMode
} from './global'
import { PointType } from './point'

/**
 * @description
 * - [`template.kml`](https://developer.dji.com/doc/cloud-api-tutorial/en/api-reference/dji-wpml/template-kml.html) 文件由三部分组成：
 * 1. 创建信息：主要包含航线文件本身的信息，例如文件的创建、更新时间等。
 * 2. 任务信息：主要包含 `wpml:missionConfig` 元素，定义航线任务的全局参数等。
 * 3. 模板信息：主要包含 `Folder` 元素，定义航线的模板信息（如航点飞行、建图航拍、倾斜摄影、航带飞行等）。不同航线模板类型包含的元素不同。
 */
export interface TemplateFile {
  /**
   * 文件创建作者
   */
  author?: string
  /**
   * 文件创建时间（Unix Timestamp）
   * - ms
   */
  createTime?: string
  /**
   * 文件更新时间（Unix Timestamp）
   * - ms
   */
  updateTime?: string
  /**
   * 模板信息
   */
  Folder: {
    /**
     * 航点信息（包括航点经纬度和高度等）
     */
    Placemark?: Array<PointType>
    /**
     * 全局航线飞行速度
     * - m/s
     * - [1,15]
     * - 注：该元素定义了此模板生成的整段航线中，飞行器的目标飞行速度。如果额外定义了某航点的该元素，则局部定义会覆盖全局定义。
     */
    autoFlightSpeed: string
    caliFlightEnable: string
    /**
     * 云台俯仰角控制模式
     */
    gimbalPitchMode: GimbalPitchMode
    /**
     * 全局航线高度（相对起飞点高度）
     * - m
     */
    globalHeight: string
    /**
     * 全局航段轨迹是否尽量贴合直线
     * - `0`：航段轨迹全程为曲线
     * - `1`：航段轨迹尽量贴合两点连线
     * - 注：当且仅当`wpml:globalWaypointTurnMode`被设置为`toPointAndStopWithContinuityCurvature`或`toPointAndPassWithContinuityCurvature`时必需。如果额外定义了某航点的该元素，则局部定义会覆盖全局定义。
     */
    globalUseStraightLine: '0' | '1'
    /**
     * 全局偏航角模式参数
     */
    globalWaypointHeadingParam: {
      /**
       * 飞行器偏航角度
       * - °
       * - 给定某航点的目标偏航角，并在航段飞行过程中均匀过渡至下一航点的目标偏航角。
       * - 注：当且仅当`wpml:waypointHeadingMode`为`smoothTransition`时必需
       */
      waypointHeadingAngle: string
      /**
       * 飞行器偏航角模式
       */
      waypointHeadingMode: WaypointHeadingMode
      /**
       * 飞行器偏航角转动方向
       */
      waypointHeadingPathMode: WaypointHeadingPathMode
    }
    /**
     * 全局航点类型（全局航点转弯模式）
     */
    globalWaypointTurnMode: GlobalWaypointTurnMode
    /**
     * 负载设置
     */
    payloadParam: {
      /**
       * 负载对焦模式
       * - `firstPoint`：首个航点自动对焦
       * - `custom`：标定对焦值对焦
       */
      focusMode: 'firstPoint' | 'custom'
      /**
       * 图片格式列表
       * - `wide`：存储广角镜头照片
       * - `zoom`：存储变焦镜头照片
       * - `ir`：存储红外镜头照片
       * - `narrow_band`: 存储窄带镜头拍摄照片
       * - 注：存储多个镜头照片，格式如`<wpml:imageFormat>wide,ir</wpml:imageFormat>`
       */
      imageFormat: string
      /**
       * 负载测光模式
       * - `average`：全局测光
       * - `spot`：点测光
       */
      meteringMode: 'average' | 'spot'
      /**
       * 负载挂载位置
       * - `0`：飞行器1号挂载位置。M300 RTK，M350 RTK机型，对应机身左前方。其它机型，对应主云台。
       * - `1`：飞行器2号挂载位置。M300 RTK，M350 RTK机型，对应机身右前方。
       * - `2`：飞行器3号挂载位置。M300 RTK，M350 RTK机型，对应机身上方。
       */
      payloadPositionIndex: '0'
      /**
       * 激光雷达回波模式
       * - `singleReturnStrongest`：单回波
       * - `dualReturn`：双回波
       * - `tripleReturn`：三回波
       */
      returnMode: 'singleReturnStrongest' | 'dualReturn' | 'tripleReturn'
      /**
       * 负载采样率
       * - Hz
       * - 60000,80000,120000,160000,180000,240000
       */
      samplingRate: string
      /**
       * 负载扫描模式
       * - `repetitive`：重复扫描
       * - `nonRepetitive`：非重复扫描
       */
      scanningMode: 'repetitive' | 'nonRepetitive'
    }
    /**
     * 模板ID
     * - [0, 65535]
     * - integer
     * - 注：在一个kmz文件内该ID唯一。建议从0开始单调连续递增。在template.kml和waylines.wpml文件中，将使用该id将模板与所生成的可执行航线进行关联。
     */
    templateId: string
    /**
     * 预定义模板类型
     * - 注：模板为用户提供了快速生成航线的方案。用户填充模板元素，再导入大疆支持客户端（如DJI Pilot），即可快速生成可执行的测绘/巡检航线。
     */
    templateType: TemplateType
    /**
     * 坐标系参数
     */
    waylineCoordinateSysParam: {
      /**
       * 经纬度坐标系
       * - `WGS84`：当前固定使用WGS84坐标系
       */
      coordinateMode: 'WGS84'
      /**
       * 航点高程参考平面
       * - `EGM96`：使用海拔高编辑
       * - `relativeToStartPoint`：使用相对点的高度进行编辑
       * - `aboveGroundLevel`：使用地形数据，AGL下编辑(仅支持司空2平台)
       * - `realTimeFollowSurface`: 使用实时仿地模式（仅用于建图航拍模版），仅支持M3E/M3T/M3M机型
       */
      heightMode: 'EGM96' | 'relativeToStartPoint' | 'aboveGroundLevel' | 'realTimeFollowSurface'
    }
  },
  /**
   * 任务信息
   */
  missionConfig: {
    /**
     * 飞行器机型信息
     * @example 67 - 1 | M30T 三光
     */
    droneInfo: {
      /**
       * 飞行器机型主类型
       * - `89`（机型：M350 RTK）,
       * - `60`（机型：M300 RTK）,
       * - `67`（机型：M30/M30T）,
       * - `77`（机型：M3E/M3T/M3M）,
       * - `91`（机型：M3D/M3TD）
       */
      droneEnumValue: string
      /**
       * 飞行器机型子类型
       * - 当`飞行器机型主类型`为`67`（机型：M30/M30T）时：
       *   - `0`（机型：M30双光）,
       *   - `1`（机型：M30T三光）
       * - 当`飞行器机型主类型`为`77`（机型：M3E/M3T/M3M）时：
       *   - `0`（机型：M3E）
       *   - `1`（机型：M3T）
       *   - `2`（机型：M3M）
       * - 当`飞行器机型主类型`为`91`（机型：M3D/M3TD）时：
       *   - `0`（机型：M3D）
       *   - `1`（机型：M3TD）
       */
      droneSubEnumValue: string
    }
    /**
     * 失控动作类型
     */
    executeRCLostAction: ExecuteRCLostAction
    /**
     * 失控是否继续执行航线
     */
    exitOnRCLost: ExitOnRCLost
    /**
     * 航线结束动作
     */
    finishAction: FinishAction
    /**
     * 飞向首航点模式
     */
    flyToWaylineMode: FlyToWaypointType
    /**
     * 全局返航高度
     * - m
     * - 注：飞行器返航时，先爬升至该高度，再进行返航
     */
    globalRTHHeight: string
    /**
     * 全局航线过渡速度
     * - m/s
     * - [1,15]
     * - 注：飞行器飞往每条航线首航点的速度。航线任务中断时，飞行器从当前位置恢复至断点的速度。
     */
    globalTransitionalSpeed: string
    /**
     * 负载机型信息
     * @example 53 - 0 | M30T三光相机，挂在主云台
     */
    payloadInfo: {
      /**
       * 负载机型主类型
       * - `42`（H20）,
       * - `43`（H20T）,
       * - `52`（M30双光相机）,
       * - `53`（M30T三光相机）,
       * - `61`（H20N）,
       * - `66`（Mavic 3E 相机）
       * - `67`（Mavic 3T 相机）
       * - `68`（Mavic 3M 相机）
       * - `80`（Matrice 3D 相机）
       * - `81`（Matrice 3TD 相机）
       * - `65534`（PSDK 负载）
       */
      payloadEnumValue: string
      /**
       * 负载挂载位置
       * - `0`：飞行器1号挂载位置。M300 RTK，M350 RTK机型，对应机身左前方。其它机型，对应主云台。
       * - `1`：飞行器2号挂载位置。M300 RTK，M350 RTK机型，对应机身右前方。
       * - `2`：飞行器3号挂载位置。M300 RTK，M350 RTK机型，对应机身上方。
       */
      payloadPositionIndex: string
      payloadSubEnumValue: string
    }
    /**
     * 参考起飞点 <x,y,z>
     * - °, °, m
     * - [-90,90],[-180,180],高度无限制
     * - 注：“参考起飞点”仅做航线规划参考，飞行器执行航线时以飞行器真实的起飞点为准，高度使用椭球高。
     */
    takeOffRefPoint?: string
    /**
     * 参考起飞点海拔高度
     * - m
     * - 注：”参考起飞点“海拔高度，与“参考起飞点”中的椭球高度对应。
     */
    takeOffRefPointAGLHeight?: string
    /**
     * 安全起飞高度倾斜飞行模式
     * （M300）飞行器起飞后，倾斜飞到首航点。
     * （M30）飞行器起飞至“安全起飞高度”，再倾斜爬升至首航点。如果首航点高度低于“安全起飞高度”，则先平飞后下降。
     * - m
     * - [2, 1500] （高度模式：相对起飞点高度）
     * - 注：飞行器起飞后，先爬升至该高度，再根据“飞向首航点模式”的设置飞至首航点。该元素仅在飞行器未起飞时生效。
     */
    takeoffSecurityHeight: string
  }
}

/**
 * 预定义模板类型
 * - `waypoint` 航点飞行
 * - `mapping2d` 建图航拍
 * - `mapping3d` 倾斜摄影
 * - `mappingStrip` 航带飞行
 */
export type TemplateType =
  'waypoint'
  | 'mapping2d'
  | 'mapping3d'
  | 'mappingStrip'

/**
 * 全局航点类型（全局航点转弯模式）
 * - `coordinateTurn` 协调转弯，不过点，提前转弯
 * - `toPointAndStopWithDiscontinuityCurvature` 直线飞行，飞行器到点停
 * - `toPointAndStopWithContinuityCurvature` 曲线飞行，飞行器到点停
 * - `toPointAndPassWithContinuityCurvature` 曲线飞行，飞行器过点不停
 */
export type GlobalWaypointTurnMode =
  'coordinateTurn'
  | 'toPointAndStopWithDiscontinuityCurvature'
  | 'toPointAndStopWithContinuityCurvature'
  | 'toPointAndPassWithContinuityCurvature'

/**
 * 云台俯仰角控制模式
 * - `manual` 手动控制。飞行器从一个航点飞向下一个航点的过程中，支持用户手动控制云台的俯仰角度。若无用户控制，则保持飞离航点时的云台俯仰角度。
 * - `usePointSetting` 依照每个航点设置。飞行器从一个航点飞向下一个航点的过程中，云台俯仰角均匀过渡至下一个航点的俯仰角。
 */
export type GimbalPitchMode = 'manual' | 'usePointSetting'
