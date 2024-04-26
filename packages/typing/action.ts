interface ActionBaseType {
  /**
   * 动作id
   * - [0, 65535]
   * - 注：在一个动作组内该ID唯一。建议从0开始单调连续递增。
   */
  actionId: string
}

/**
 * 动作 - 单拍
 * @memberof wpml:action
 */
export interface TakePhoto extends ActionBaseType {
  actionActuatorFunc: 'takePhoto'
  actionActuatorFuncParam: {
    /**
     * 负载挂载位置，默认主云台
     */
    payloadPositionIndex: '0'
    /**
     * 拍摄照片文件后缀。为生成媒体文件命名时将额外附带该后缀。
     */
    fileSuffix: string
    /**
     * 拍摄照片存储类型
     * - `zoom`: 存储变焦镜头拍摄照片
     * - `wide`: 存储广角镜头拍摄照片
     * - `ir`: 存储红外镜头拍摄照片
     * - `narrow_band`: 存储窄带镜头拍摄照片
     * - `visable`：可见光照片
     * - 注：存储多个镜头照片，格式如`<wpml:payloadLensIndex>wide,ir,narrow_band</wpml:payloadLensIndex>`表示同时使用广角、红外和窄带镜头
     */
    payloadLensIndex: string
    /**
     * 是否使用全局存储类型
     * - `0`：不使用全局设置
     * - `1`：使用全局设置
     */
    useGlobalPayloadLensIndex: '0' | '1'
  }
}

/**
 * 动作 - 开始录像
 * @memberof wpml:action
 */
export interface StartRecord extends ActionBaseType {
  actionActuatorFunc: 'startRecord'
  actionActuatorFuncParam: {
    /**
     * 负载挂载位置，默认主云台
     */
    payloadPositionIndex: '0'
    /**
     * 拍摄照片文件后缀。为生成媒体文件命名时将额外附带该后缀。
     */
    fileSuffix: string
    /**
     * 拍摄照片存储类型
     * - `zoom`: 存储变焦镜头拍摄照片
     * - `wide`: 存储广角镜头拍摄照片
     * - `ir`: 存储红外镜头拍摄照片
     * - `narrow_band`: 存储窄带镜头拍摄照片
     * - `visable`：可见光照片
     * - 注：存储多个镜头照片，格式如`<wpml:payloadLensIndex>wide,ir,narrow_band</wpml:payloadLensIndex>`表示同时使用广角、红外和窄带镜头
     */
    payloadLensIndex: string
    /**
     * 是否使用全局存储类型
     * - `0`：不使用全局设置
     * - `1`：使用全局设置
     */
    useGlobalPayloadLensIndex: '0' | '1'
  }
}

/**
 * 动作 - 结束录像
 * @memberof wpml:action
 */
export interface StopRecord extends ActionBaseType {
  actionActuatorFunc: 'stopRecord'
  actionActuatorFuncParam: {
    /**
     * 负载挂载位置，默认主云台
     */
    payloadPositionIndex: '0'
    /**
     * 拍摄照片存储类型
     * - `zoom`: 存储变焦镜头拍摄照片
     * - `wide`: 存储广角镜头拍摄照片
     * - `ir`: 存储红外镜头拍摄照片
     * - `narrow_band`: 存储窄带镜头拍摄照片
     * - `visable`：可见光照片
     * - 注：存储多个镜头照片，格式如`<wpml:payloadLensIndex>wide,ir,narrow_band</wpml:payloadLensIndex>`表示同时使用广角、红外和窄带镜头
     */
    payloadLensIndex: string
  }
}

/**
 * 动作 - 对焦
 * @memberof wpml:action
 */
export interface Focus extends ActionBaseType {
  actionActuatorFunc: 'focus'
  actionActuatorFuncParam: {
    /**
     * 负载挂载位置，默认主云台
     */
    payloadPositionIndex: '0'
    /**
     * 是否点对焦
     * - `0`：区域对焦
     * - `1`：点对焦
     */
    isPointFocus: '0' | '1'
    /**
     * 对焦点位置
     * - [0, 1]
     * - 注：对焦点或对焦区域左上角在画面的X轴（宽）坐标。0为最左侧，1为最右侧。
     */
    focusX: string
    /**
     * 对焦点位置
     * - [0, 1]
     * - 注：对焦点或对焦区域左上角在画面的Y轴（高）坐标。0为最上方，1为最下方。
     */
    focusY: string
    /**
     * 对焦区域宽度比
     * - [0, 1]
     * - 注：对焦区域大小占画面整体的比例，此为宽度比
     * - 注：当且仅当`isPointFocus`为`0`（即区域对焦）时必需。
     */
    focusRegionWidth: string
    /**
     * 对焦区域高度比
     * - [0, 1]
     * - 注：对焦区域大小占画面整体的比例，此为高度比
     * - 注：当且仅当`isPointFocus`为`0`（即区域对焦）时必需。
     */
    focusRegionHeight: string
  }
}

/**
 * 动作 - 变焦
 * @memberof wpml:action
 */
export interface Zoom extends ActionBaseType {
  actionActuatorFunc: 'zoom'
  actionActuatorFuncParam: {
    /**
     * 负载挂载位置，默认主云台
     */
    payloadPositionIndex: '0'
    /**
     * 变焦焦距
     * - mm
     * - 大于0
     */
    focalLength: string
  }
}

/**
 * 动作 - 创建新文件夹
 * @memberof wpml:action
 */
export interface CustomDirName extends ActionBaseType {
  actionActuatorFunc: 'customDirName'
  actionActuatorFuncParam: {
    /**
     * 负载挂载位置，默认主云台
     */
    payloadPositionIndex: '0'
    /**
     * 新文件夹的名称
     */
    directoryName: string
  }
}

/**
 * 动作 - 旋转云台
 * @memberof wpml:action
 */
export interface GimbalRotate extends ActionBaseType {
  actionActuatorFunc: 'gimbalRotate'
  actionActuatorFuncParam: {
    /**
     * 负载挂载位置，默认主云台
     */
    payloadPositionIndex: '0'
    /**
     * 云台偏航角转动坐标系
     * - `north`：相对地理北
     */
    gimbalHeadingYawBase: 'north'
    /**
     * 云台转动模式
     * - `absoluteAngle`：绝对角度，相对于正北方的角度
     */
    gimbalRotateMode: 'absoluteAngle'
    /**
     * 是否使能云台Pitch转动
     * - `0`：不使能
     * - `1`：使能
     */
    gimbalPitchRotateEnable: '0' | '1'
    /**
     * 云台Pitch转动角度
     * - 注：不同云台可转动范围不同
     */
    gimbalPitchRotateAngle: string
    /**
     * 是否使能云台Roll转动
     * - `0`：不使能
     * - `1`：使能
     */
    gimbalRollRotateEnable: '0' | '1'
    /**
     * 云台Roll转动角度
     * - 注：不同云台可转动范围不同
     */
    gimbalRollRotateAngle: string
    /**
     * 是否使能云台Yaw转动
     * - `0`：不使能
     * - `1`：使能
     */
    gimbalYawRotateEnable: '0' | '1'
    /**
     * 云台Yaw转动角度
     * - 注：不同云台可转动范围不同
     */
    gimbalYawRotateAngle: string
    /**
     * 是否使能云台转动时间
     * - `0`：不使能
     * - `1`：使能
     */
    gimbalRotateTimeEnable: '0' | '1'
    /**
     * 云台完成转动用时
     * - s
     */
    gimbalRotateTime: string
  }
}

/**
 * 动作 - 飞行器偏航
 * @memberof wpml:action
 */
export interface RotateYaw extends ActionBaseType {
  actionActuatorFunc: 'rotateYaw'
  actionActuatorFuncParam: {
    /**
     * 飞行器目标偏航角（相对于地理北）
     * - °
     * - [-180, 180]
     * - 注：飞行器旋转至该目标偏航角。0°为正北方向，90°为正东方向，-90°为正西方向，-180°/180°为正南方向。
     */
    aircraftHeading: string
    /**
     * 飞行器偏航角转动模式
     * - `clockwise`：顺时针旋转
     * - `counterClockwise`：逆时针旋转
     */
    aircraftPathMode: 'clockwise' | 'counterClockwise'
  }
}

/**
 * 动作 - 悬停等待
 * @memberof wpml:action
 */
export interface Hover extends ActionBaseType {
  actionActuatorFunc: 'hover'
  actionActuatorFuncParam: {
    /**
     * 飞行器悬停等待时间
     * - s
     * - 大于0
     */
    hoverTime: string
  }
}

/**
 * 动作 - 航段间均匀转动云台pitch角
 * @memberof wpml:action
 * - 注：`gimbalEvenlyRotate`动作为航段间均匀转动云台pitch角，其触发器类型必须为`betweenAdjacentPoints`。
 */
export interface GimbalEvenlyRotate extends ActionBaseType {
  actionActuatorFunc: 'gimbalEvenlyRotate'
  actionActuatorFuncParam: {
    /**
     * 负载挂载位置，默认主云台
     */
    payloadPositionIndex: '0'
    /**
     * 云台Pitch转动角度
     * - 注：不同云台可转动范围不同
     */
    gimbalPitchRotateAngle: string
  }
}

/**
 * 动作 - 精准复拍/定向拍照
 * @memberof wpml:action
 */
export interface OrientedShoot extends ActionBaseType {
  actionActuatorFunc: 'orientedShoot'
  actionActuatorFuncParam: {
    /**
     * 负载挂载位置，默认主云台
     */
    payloadPositionIndex: '0'
    /**
     * 云台Pitch转动角度
     * - °
     * - M30/M30T：[-120, 45]
     * - M3E/M3T：[-90, 35]
     * - M3D/M3TD：[-90, 30]
     */
    gimbalPitchRotateAngle: string
    /**
     * 云台Yaw转动角度
     * - °
     * - [-180, 180]
     * - 注：M3E/M3T，M3D/M3TD 机型 `wpml:gimbalYawRotateAngle` 与 `wpml:aircraftHeading` 需保持一致
     */
    gimbalYawRotateAngle: string
    /**
     * 目标选中框中心水平坐标
     * - px
     * - [0, 960]
     * - 注：照片左上角为坐标原点，水平方向为X轴，竖直方向为Y轴
     */
    focusX: '0'
    /**
     * 目标选中框中心竖直坐标
     * - px
     * - [0, 720]
     */
    focusY: '0'
    /**
     * 目标选中框宽
     * - px
     * - [0, 960]
     */
    focusRegionWidth: '0'
    /**
     * 目标选中框高
     * - px
     * - [0, 720]
     */
    focusRegionHeight: '0'
    /**
     * 变焦焦距
     * - mm
     * - 大于0
     */
    focalLength: string
    /**
     * 飞行器目标偏航角（相对于地理北）
     * - [-180, 180]
     * - 注：飞行器旋转至该目标偏航角。0°为正北方向，90°为正东方向，-90°为正西方向，-180°/180°为正南方向
     */
    aircraftHeading: string
    /**
     * 是否框选精准复拍目标
     * - `1`: 已框选目标物
     * - `0`: 未框选目标物
     * - 注：该值设置为1，复拍时飞行器会自主寻找目标进行拍摄。该值设置为0，复拍时飞行器只会按照飞行器姿态和负载姿态进行动作重复，不会自主寻找目标
     */
    accurateFrameValid: '0' | '1'
    /**
     * 目标框角度
     * - [0, 360]
     * - 注：目标框的旋转角度(以Y轴为基准，顺时针旋转)
     */
    targetAngle: string
    /**
     * 动作唯一标识
     * - 注：拍照时，该值将被写入照片文件中，用于关联动作和照片文件
     */
    actionUUID: string
    /**
     * 照片宽度
     * - px
     */
    imageWidth: '0'
    /**
     * 照片高度
     * - px
     */
    imageHeight: '0'
    /**
     * AF电机位置
     */
    AFPos: '0'
    /**
     * 云台端口号
     * - 拍摄照片的相机安装位置
     * - 注：M30/M30T机型该值固定为0
     */
    gimbalPort: '0'
    /**
     * 相机类型
     * - `52`（机型：M30双光相机）,
     * - `53`（机型：M30T三光相机）
     * - `66`（机型：Mavic 3E 相机）
     * - `67`（机型：Mavic 3T 相机）
     * - `80`（机型：Matrice 3D 相机）
     * - `81`（机型：Matrice 3TD 相机）
     */
    orientedCameraType: '52' | '53' | '66' | '67' | '80' | '81'
    /**
     * 照片文件路径
     */
    orientedFilePath: string
    /**
     * 照片文件大小
     * - Byte
     */
    orientedFileSize: '0'
    /**
     * 照片文件后缀
     * - 为生成媒体文件命名时将额外附带该后缀
     */
    orientedFileSuffix: string
    /**
     * 光圈大小
     */
    orientedCameraApertue?: string
    /**
     * 环境亮度
     */
    orientedCameraLuminance?: string
    /**
     * 快门时间
     */
    orientedCameraShutterTime?: string
    /**
     * ISO
     */
    orientedCameraISO?: string
    /**
     * 拍照模式
     * - `normalPhoto`: 普通拍照
     * - `lowLightSmartShooting`：低光智能拍照
     */
    orientedPhotoMode: 'normalPhoto' | 'lowLightSmartShooting'
    /**
     * 拍摄照片存储类型
     * - `zoom`: 存储变焦镜头拍摄照片
     * - `wide`: 存储广角镜头拍摄照片
     * - `ir`: 存储红外镜头拍摄照片
     * - `narrow_band`: 存储窄带镜头拍摄照片
     * - `visable`：可见光照片
     * - 注：存储多个镜头照片，格式如`<wpml:payloadLensIndex>wide,ir,narrow_band</wpml:payloadLensIndex>`表示同时使用广角、红外和窄带镜头
     */
    payloadLensIndex: string
    /**
     * 是否使用全局存储类型
     * - `0`：不使用全局设置
     * - `1`：使用全局设置
     */
    useGlobalPayloadLensIndex: string
  }
}

/**
 * 动作 - 全景拍照
 * @memberof wpml:action
 */
export interface PanoShot extends ActionBaseType {
  actionActuatorFunc: 'panoShot'
  actionActuatorFuncParam: {
    /**
     * 负载挂载位置，默认主云台
     */
    payloadPositionIndex: '0'
    /**
     * 拍摄照片存储类型
     * - `zoom`: 存储变焦镜头拍摄照片
     * - `wide`: 存储广角镜头拍摄照片
     * - `ir`: 存储红外镜头拍摄照片
     * - `narrow_band`: 存储窄带镜头拍摄照片
     * - `visable`：可见光照片
     * - 注：存储多个镜头照片，格式如`<wpml:payloadLensIndex>wide,ir,narrow_band</wpml:payloadLensIndex>`表示同时使用广角、红外和窄带镜头
     */
    payloadLensIndex: string
    /**
     * 是否使用全局存储类型
     * - `0`：不使用全局设置
     * - `1`：使用全局设置
     */
    useGlobalPayloadLensIndex: string
    /**
     * 全景拍照模式
     * - `panoShot_360`：全景模式
     */
    panoShotSubMode: 'panoShot_360'
  }
}

/**
 * 动作信息
 * @memberof wpml:action
 */
export type ActionType =
  TakePhoto
  | StartRecord
  | StopRecord
  | Focus
  | Zoom
  | CustomDirName
  | GimbalRotate
  | RotateYaw
  | Hover
  | GimbalEvenlyRotate
  | OrientedShoot
  | PanoShot

/**
 * 动作分组信息
 * @memberof wpml:actionGroup
 */
export interface ActionGroupType {
  /**
   * 动作列表
   */
  action: Array<ActionType>
  /**
   * 动作组结束生效的航点
   * - [0, 65535]
   * - 注：该元素必须大于等于`actionGroupStartIndex`。
   * - 注：当“动作组结束生效的航点”与“动作组开始生效的航点”一致，则代表该动作组仅在该航点处生效。
   */
  actionGroupEndIndex: string
  /**
   * 动作组id
   * - [0, 65535]
   * - 注：在一个kmz文件内该ID唯一。建议从0开始单调连续递增。
   */
  actionGroupId: string
  /**
   * 动作执行模式
   * - `sequence`：串行执行。即动作组内的动作依次按顺序执行。
   */
  actionGroupMode: 'sequence'
  /**
   * 动作组开始生效的航点
   * - [0, 65535]
   */
  actionGroupStartIndex: string
  /**
   * 动作组触发器
   */
  actionTrigger: {
    /**
     * 动作触发器类型
     */
    actionTriggerType: ActionTriggerType
    /**
     * 动作触发器参数
     * - s 或 m
     * - 大于0
     * 注：当`actionTriggerType`为`multipleTiming`时，该元素表示间隔时间，单位是s。当`actionTriggerType`为`multipleDistance`时，该元素表示间隔距离，单位是m。
     */
    actionTriggerParam: string
  }
}

/**
 * 动作触发器类型
 * - `reachPoint` 到达航点时执行
 * - `betweenAdjacentPoints` 航段触发，均匀转云台
 * - `multipleTiming` 等时触发
 * - `multipleDistance` 等距触发
 * - 注：`betweenAdjacentPoints`需配合动作`gimbalEvenlyRotate`使用，`multipleTiming` 配合动作 `takePhoto` 即可实现等时间隔拍照，`multipleDistance` 配合动作 `takePhoto` 即可实现等距离间隔拍照。
 */
export type ActionTriggerType = 'reachPoint' | 'betweenAdjacentPoints' |
  'multipleTiming' | 'multipleDistance'
