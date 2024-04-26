import { ActionGroupType } from './action'
import {
  WaypointHeadingMode,
  WaypointHeadingPathMode,
  WaypointTurnMode
} from './global'

/**
 * 航点信息
 * @memberof Placemark
 */
export interface PointType {
  /**
   * 航点经纬度 <经度,纬度>
   * - 注：此处格式如`<Point> <coordinates> 经度,纬度 </coordinates> </Point>`
   */
  Point: {
    coordinates: string
  }
  /**
   * 动作分组列表
   */
  actionGroup: Array<ActionGroupType>
  /**
   * 航点高度（WGS84椭球高度）
   * - m
   * - 注：该元素与`wpml:height`配合使用，二者是同一位置不同高程参考平面的表达。
   */
  ellipsoidHeight: string
  /**
   * 航点执行高度
   * - m
   * - 注：该元素仅在`waylines.wpml`中使用。具体高程参考平面在 `wpml:executeHeightMode` 中声明。
   */
  executeHeight?: string
  /**
   * 航点高度（EGM96海拔高度/相对起飞点高度/AGL相对地面高度）
   * - m
   * - 注：该元素与`wpml:ellipsoidHeight`配合使用，二者是同一位置不同高程参考平面的表达。
   */
  height: string
  /**
   * 航点序号
   * - [0, 65535]
   * - 注：在一条航线内该ID唯一。该序号必须从0开始单调连续递增。
   */
  index: string
  isRisky: string
  /**
   * 是否使用全局偏航角模式参数
   * - 0：不使用全局设置
   * - 1：使用全局设置
   */
  useGlobalHeadingParam: '0' | '1'
  /**
   * 是否使用全局高度
   * - 0, 1
   */
  useGlobalHeight: '0' | '1'
  /**
   * 是否使用全局飞行速度
   * - 0：不使用全局设置
   * - 1：使用全局设置
   * - 注：此处的全局飞行速度即`wpml:autoFlightSpeed`
   */
  useGlobalSpeed: '0' | '1'
  /**
   * 是否使用全局航点类型（全局航点转弯模式）
   * - 0：不使用全局设置
   * - 1：使用全局设置
   */
  useGlobalTurnParam: '0' | '1'
  /**
   * 该航段是否贴合直线
   * - `0`：航段轨迹全程为曲线
   * - `1`：航段轨迹尽量贴合两点连线
   */
  useStraightLine: '0' | '1'
  /**
   * 偏航角模式参数
   */
  waypointHeadingParam: {
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
   * 航点飞行速度
   * - m/s
   * - [1,15]
   */
  waypointSpeed: string
  /**
   * 航点类型（航点转弯模式）
   */
  waypointTurnParam: {
    /**
     * 航点转弯截距
     * - m
     * - (0, 航段最大长度]
     * - 注：两航点间航段长度必需大于两航点转弯截距之和。此元素定义了飞行器在距离该航点若干米前，提前多少距离转弯。
     */
    waypointTurnDampingDist: string
    /**
     * 航点类型（航点转弯模式）
     */
    waypointTurnMode: WaypointTurnMode
  }
  /**
   * 航点云台俯仰角
   * - °
   */
  gimbalPitchAngle: string
}
