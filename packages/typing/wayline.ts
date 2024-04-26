import {
  ExecuteRCLostAction,
  ExitOnRCLost,
  FinishAction,
  FlyToWaypointType
} from './global'
import { PointType } from './point'

/**
 * @description
 * - [`waylines.wpml`](https://developer.dji.com/doc/cloud-api-tutorial/en/api-reference/dji-wpml/waylines-wpml.html)是飞机直接执行的文件，它定义了明确的无人机飞行和负载动作指令，这些指令由 DJI Pilot 2、DJI Flighthub 2 或者其它软件生成，也可被开发者直接编辑开发。`waylines.wpml` 文件由两部分组成：
 * 1. 任务信息：主要包含 `wpml:missionConfig` 元素，定义航线任务的全局参数等。
 * 2. 航线信息：主要包含 `Folder` 元素，定义详细的航线信息（路径定义、动作定义等）。每个 `Folder` 代表一条可执行的航线。特别的，当使用“倾斜摄影”模板时，将生成5条可执行航线，对应 `waylines.wpml` 内的5个 `Folder` 元素。
 */
export interface WaylineFile {
  Folder: {
    /**
     * 航点信息（包括航点经纬度和高度等）
     */
    Placemark: Array<PointType>
    /**
     * 全局航线飞行速度
     * - m/s
     * - [1,15]
     * - 注：此元素定义了此模板生成的整段航线中，飞行器的目标飞行速度。如果额外定义了某航点的该元素，则局部定义会覆盖全局定义。
     */
    autoFlightSpeed: string
    /**
     * 执行高度模式
     * - `WGS84`：椭球高模式
     * - `relativeToStartPoint`：相对起飞点高度模式
     * - `realTimeFollowSurface`: 使用实时仿地模式，仅支持M3E/M3T/M3M，M3D/M3TD
     * - 注：该元素仅在`waylines.wpml`中使用。
     */
    executeHeightMode: 'WGS84' | `relativeToStartPoint` | `realTimeFollowSurface`
    /**
     * 模板ID
     * - 注：在一个kmz文件内该ID唯一。建议从0开始单调连续递增。在template.kml和waylines.wpml文件中，将使用该id将模板与所生成的可执行航线进行关联。
     */
    templateId: string
    /**
     * 航线ID
     * - 注：在一条航线中该ID唯一。建议从0开始单调连续递增。
     */
    waylineId: string
  }
  /**
   * 任务信息
   */
  missionConfig: {
    /**
     * 飞行器机型信息
     */
    droneInfo: {
      droneEnumValue: '67'
      droneSubEnumValue: '1'
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
     */
    payloadInfo: {
      payloadEnumValue: '53'
      payloadPositionIndex: '0'
      payloadSubEnumValue: '2'
    }
    /**
     * 安全起飞高度
     * - m
     * - [2, 1500] （高度模式：相对起飞点高度）
     * - 注：飞行器起飞后，先爬升至该高度，再根据“飞向首航点模式”的设置飞至首航点。该元素仅在飞行器未起飞时生效。
     */
    takeOffSecurityHeight: string
  }
}
