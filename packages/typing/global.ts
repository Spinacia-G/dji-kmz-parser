/**
 * 飞行器偏航角模式
 * - `followWayline` 沿航线方向。飞行器机头沿着航线方向飞至下一航点
 * - `manually` 手动控制。飞行器在飞至下一航点的过程中，用户可以手动控制飞行器机头朝向
 * - `fixed` 锁定当前偏航角。飞行器机头保持执行完航点动作后的飞行器偏航角飞至下一航点
 * - `smoothTransition` 自定义。通过`wpml:waypointHeadingAngle`给定某航点的目标偏航角，并在航段飞行过程中均匀过渡至下一航点的目标偏航角
 * - `towardPOI` 朝向兴趣点
 */
export type WaypointHeadingMode =
  'followWayline'
  | 'manually'
  | 'fixed'
  | 'smoothTransition'

/**
 * 飞行器偏航角转动方向
 * - `clockwise` 顺时针旋转飞行器偏航角
 * - `counterClockwise` 逆时针旋转飞行器偏航角
 * - `followBadArc` 沿最短路径旋转飞行器偏航角
 */
export type WaypointHeadingPathMode =
  'clockwise'
  | 'counterClockwise'
  | 'followBadArc'

/**
 * 航点类型（航点转弯模式）
 * - `coordinateTurn` 协调转弯，不过点，提前转弯
 * - `toPointAndStopWithDiscontinuityCurvature` 直线飞行，飞行器到点停
 * - `toPointAndStopWithContinuityCurvature` 曲线飞行，飞行器到点停
 * - `toPointAndPassWithContinuityCurvature` 曲线飞行，飞行器过点不停
 * - 注：DJI Pilot 2/司空 2 上“平滑过点，提前转弯”模式设置方法为：
 *   1. 将`wpml:waypointTurnMode`设置为`toPointAndPassWithContinuityCurvature`
 *   2. 将`wpml:useStraightLine`设置为`1`
 */
export type WaypointTurnMode =
  'coordinateTurn'
  | 'toPointAndStopWithDiscontinuityCurvature'
  | 'toPointAndStopWithContinuityCurvature'
  | 'toPointAndPassWithContinuityCurvature'

/**
 * 飞向首航点模式
 * - `safely` 安全模式。
 *   - （M300）飞行器起飞，上升至首航点高度，再平飞至首航点。如果首航点低于起飞点，则起飞后平飞至首航点上方再下降
 *   - （M30）飞行器起飞，上升至首航点高度，再平飞至首航点。如果首航点低于“安全起飞高度”，则起飞至“安全起飞高度”后，平飞至首航点上方再下降。注意“安全起飞高度”仅在飞行器未起飞时生效。
 * - `pointToPoint` 倾斜飞行模式。
 *   - （M300）飞行器起飞后，倾斜飞到首航点。
 *   - （M30）飞行器起飞至“安全起飞高度”，再倾斜爬升至首航点。如果首航点高度低于“安全起飞高度”，则先平飞后下降。
 */
export type FlyToWaypointType = 'safely' | 'pointToPoint'

/**
 * 航线结束动作
 * - `goHome` 飞行器完成航线任务后，退出航线模式并返航。
 * - `noAction` 飞行器完成航线任务后，退出航线模式。
 * - `autoLand` 飞行器完成航线任务后，退出航线模式并原地降落。
 * - `gotoFirstWaypoint` 飞行器完成航线任务后，立即飞向航线起始点，到达后退出航线模式。* 注：以上动作执行过程，若飞行器退出了航线模式且进入失控状态，则会优先执行失控动作。
 */
export type FinishAction =
  'goHome'
  | 'noAction'
  | 'autoLand'
  | 'gotoFirstWaypoint'

/**
 * 失控是否继续执行航线
 * - `goContinue` 继续执行航线
 * - `executeLostAction` 退出航线，执行失控动作
 */
export type ExitOnRCLost = 'goContinue' | 'executeLostAction'

/**
 * 失控动作类型
 * - `goBack` 返航。飞行器从失控位置飞向起飞点
 * - `landing` 降落。飞行器从失控位置原地降落
 * - `hover` 悬停。飞行器从失控位置悬停
 */
export type ExecuteRCLostAction = 'goBack' | 'landing' | 'hover'
