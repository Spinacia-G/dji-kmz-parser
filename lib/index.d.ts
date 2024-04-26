declare interface ActionBaseType {
    /**
     * 动作id
     * - [0, 65535]
     * - 注：在一个动作组内该ID唯一。建议从0开始单调连续递增。
     */
    actionId: string;
}

/**
 * 动作分组信息
 * @memberof wpml:actionGroup
 */
export declare interface ActionGroupType {
    /**
     * 动作列表
     */
    action: Array<ActionType>;
    /**
     * 动作组结束生效的航点
     * - [0, 65535]
     * - 注：该元素必须大于等于`actionGroupStartIndex`。
     * - 注：当“动作组结束生效的航点”与“动作组开始生效的航点”一致，则代表该动作组仅在该航点处生效。
     */
    actionGroupEndIndex: string;
    /**
     * 动作组id
     * - [0, 65535]
     * - 注：在一个kmz文件内该ID唯一。建议从0开始单调连续递增。
     */
    actionGroupId: string;
    /**
     * 动作执行模式
     * - `sequence`：串行执行。即动作组内的动作依次按顺序执行。
     */
    actionGroupMode: 'sequence';
    /**
     * 动作组开始生效的航点
     * - [0, 65535]
     */
    actionGroupStartIndex: string;
    /**
     * 动作组触发器
     */
    actionTrigger: {
        /**
         * 动作触发器类型
         */
        actionTriggerType: ActionTriggerType;
        /**
         * 动作触发器参数
         * - s 或 m
         * - 大于0
         * 注：当`actionTriggerType`为`multipleTiming`时，该元素表示间隔时间，单位是s。当`actionTriggerType`为`multipleDistance`时，该元素表示间隔距离，单位是m。
         */
        actionTriggerParam: string;
    };
}

/**
 * 动作触发器类型
 * - `reachPoint` 到达航点时执行
 * - `betweenAdjacentPoints` 航段触发，均匀转云台
 * - `multipleTiming` 等时触发
 * - `multipleDistance` 等距触发
 * - 注：`betweenAdjacentPoints`需配合动作`gimbalEvenlyRotate`使用，`multipleTiming` 配合动作 `takePhoto` 即可实现等时间隔拍照，`multipleDistance` 配合动作 `takePhoto` 即可实现等距离间隔拍照。
 */
export declare type ActionTriggerType = 'reachPoint' | 'betweenAdjacentPoints' | 'multipleTiming' | 'multipleDistance';

/**
 * 动作信息
 * @memberof wpml:action
 */
export declare type ActionType = TakePhoto | StartRecord | StopRecord | Focus | Zoom | CustomDirName | GimbalRotate | RotateYaw | Hover | GimbalEvenlyRotate | OrientedShoot | PanoShot;

/**
 * 动作 - 创建新文件夹
 * @memberof wpml:action
 */
export declare interface CustomDirName extends ActionBaseType {
    actionActuatorFunc: 'customDirName';
    actionActuatorFuncParam: {
        /**
         * 负载挂载位置，默认主云台
         */
        payloadPositionIndex: '0';
        /**
         * 新文件夹的名称
         */
        directoryName: string;
    };
}

/**
 * 失控动作类型
 * - `goBack` 返航。飞行器从失控位置飞向起飞点
 * - `landing` 降落。飞行器从失控位置原地降落
 * - `hover` 悬停。飞行器从失控位置悬停
 */
export declare type ExecuteRCLostAction = 'goBack' | 'landing' | 'hover';

/**
 * 失控是否继续执行航线
 * - `goContinue` 继续执行航线
 * - `executeLostAction` 退出航线，执行失控动作
 */
export declare type ExitOnRCLost = 'goContinue' | 'executeLostAction';

/**
 * 航线结束动作
 * - `goHome` 飞行器完成航线任务后，退出航线模式并返航。
 * - `noAction` 飞行器完成航线任务后，退出航线模式。
 * - `autoLand` 飞行器完成航线任务后，退出航线模式并原地降落。
 * - `gotoFirstWaypoint` 飞行器完成航线任务后，立即飞向航线起始点，到达后退出航线模式。* 注：以上动作执行过程，若飞行器退出了航线模式且进入失控状态，则会优先执行失控动作。
 */
export declare type FinishAction = 'goHome' | 'noAction' | 'autoLand' | 'gotoFirstWaypoint';

/**
 * 飞向首航点模式
 * - `safely` 安全模式。
 *   - （M300）飞行器起飞，上升至首航点高度，再平飞至首航点。如果首航点低于起飞点，则起飞后平飞至首航点上方再下降
 *   - （M30）飞行器起飞，上升至首航点高度，再平飞至首航点。如果首航点低于“安全起飞高度”，则起飞至“安全起飞高度”后，平飞至首航点上方再下降。注意“安全起飞高度”仅在飞行器未起飞时生效。
 * - `pointToPoint` 倾斜飞行模式。
 *   - （M300）飞行器起飞后，倾斜飞到首航点。
 *   - （M30）飞行器起飞至“安全起飞高度”，再倾斜爬升至首航点。如果首航点高度低于“安全起飞高度”，则先平飞后下降。
 */
export declare type FlyToWaypointType = 'safely' | 'pointToPoint';

/**
 * 动作 - 对焦
 * @memberof wpml:action
 */
export declare interface Focus extends ActionBaseType {
    actionActuatorFunc: 'focus';
    actionActuatorFuncParam: {
        /**
         * 负载挂载位置，默认主云台
         */
        payloadPositionIndex: '0';
        /**
         * 是否点对焦
         * - `0`：区域对焦
         * - `1`：点对焦
         */
        isPointFocus: '0' | '1';
        /**
         * 对焦点位置
         * - [0, 1]
         * - 注：对焦点或对焦区域左上角在画面的X轴（宽）坐标。0为最左侧，1为最右侧。
         */
        focusX: string;
        /**
         * 对焦点位置
         * - [0, 1]
         * - 注：对焦点或对焦区域左上角在画面的Y轴（高）坐标。0为最上方，1为最下方。
         */
        focusY: string;
        /**
         * 对焦区域宽度比
         * - [0, 1]
         * - 注：对焦区域大小占画面整体的比例，此为宽度比
         * - 注：当且仅当`isPointFocus`为`0`（即区域对焦）时必需。
         */
        focusRegionWidth: string;
        /**
         * 对焦区域高度比
         * - [0, 1]
         * - 注：对焦区域大小占画面整体的比例，此为高度比
         * - 注：当且仅当`isPointFocus`为`0`（即区域对焦）时必需。
         */
        focusRegionHeight: string;
    };
}

/**
 * 动作 - 航段间均匀转动云台pitch角
 * @memberof wpml:action
 * - 注：`gimbalEvenlyRotate`动作为航段间均匀转动云台pitch角，其触发器类型必须为`betweenAdjacentPoints`。
 */
export declare interface GimbalEvenlyRotate extends ActionBaseType {
    actionActuatorFunc: 'gimbalEvenlyRotate';
    actionActuatorFuncParam: {
        /**
         * 负载挂载位置，默认主云台
         */
        payloadPositionIndex: '0';
        /**
         * 云台Pitch转动角度
         * - 注：不同云台可转动范围不同
         */
        gimbalPitchRotateAngle: string;
    };
}

/**
 * 云台俯仰角控制模式
 * - `manual` 手动控制。飞行器从一个航点飞向下一个航点的过程中，支持用户手动控制云台的俯仰角度。若无用户控制，则保持飞离航点时的云台俯仰角度。
 * - `usePointSetting` 依照每个航点设置。飞行器从一个航点飞向下一个航点的过程中，云台俯仰角均匀过渡至下一个航点的俯仰角。
 */
export declare type GimbalPitchMode = 'manual' | 'usePointSetting';

/**
 * 动作 - 旋转云台
 * @memberof wpml:action
 */
export declare interface GimbalRotate extends ActionBaseType {
    actionActuatorFunc: 'gimbalRotate';
    actionActuatorFuncParam: {
        /**
         * 负载挂载位置，默认主云台
         */
        payloadPositionIndex: '0';
        /**
         * 云台偏航角转动坐标系
         * - `north`：相对地理北
         */
        gimbalHeadingYawBase: 'north';
        /**
         * 云台转动模式
         * - `absoluteAngle`：绝对角度，相对于正北方的角度
         */
        gimbalRotateMode: 'absoluteAngle';
        /**
         * 是否使能云台Pitch转动
         * - `0`：不使能
         * - `1`：使能
         */
        gimbalPitchRotateEnable: '0' | '1';
        /**
         * 云台Pitch转动角度
         * - 注：不同云台可转动范围不同
         */
        gimbalPitchRotateAngle: string;
        /**
         * 是否使能云台Roll转动
         * - `0`：不使能
         * - `1`：使能
         */
        gimbalRollRotateEnable: '0' | '1';
        /**
         * 云台Roll转动角度
         * - 注：不同云台可转动范围不同
         */
        gimbalRollRotateAngle: string;
        /**
         * 是否使能云台Yaw转动
         * - `0`：不使能
         * - `1`：使能
         */
        gimbalYawRotateEnable: '0' | '1';
        /**
         * 云台Yaw转动角度
         * - 注：不同云台可转动范围不同
         */
        gimbalYawRotateAngle: string;
        /**
         * 是否使能云台转动时间
         * - `0`：不使能
         * - `1`：使能
         */
        gimbalRotateTimeEnable: '0' | '1';
        /**
         * 云台完成转动用时
         * - s
         */
        gimbalRotateTime: string;
    };
}

/**
 * 全局航点类型（全局航点转弯模式）
 * - `coordinateTurn` 协调转弯，不过点，提前转弯
 * - `toPointAndStopWithDiscontinuityCurvature` 直线飞行，飞行器到点停
 * - `toPointAndStopWithContinuityCurvature` 曲线飞行，飞行器到点停
 * - `toPointAndPassWithContinuityCurvature` 曲线飞行，飞行器过点不停
 */
export declare type GlobalWaypointTurnMode = 'coordinateTurn' | 'toPointAndStopWithDiscontinuityCurvature' | 'toPointAndStopWithContinuityCurvature' | 'toPointAndPassWithContinuityCurvature';

/**
 * 动作 - 悬停等待
 * @memberof wpml:action
 */
export declare interface Hover extends ActionBaseType {
    actionActuatorFunc: 'hover';
    actionActuatorFuncParam: {
        /**
         * 飞行器悬停等待时间
         * - s
         * - 大于0
         */
        hoverTime: string;
    };
}

/**
 * create KMZ file from JSON
 * @description [how to create KMZ file](https://sdk-forum.dji.net/hc/en-us/articles/12254235478681-How-to-creat-KMZ-file)
 * @param {{template: KmlType, waylines: Record<string, any>}} obj
 * @returns {Promise<Awaited<Blob>>} KMZ file in Blob format
 */
export declare const jsonToKmz: (obj: {
    template: TemplateFile;
    waylines: WaylineFile;
}) => Promise<Blob>;

/**
 * create XML DOM from JSON
 * @param {KmlType | Record<string, any>} obj
 * @returns {Document}
 */
export declare const jsonToXml: (obj: TemplateFile | WaylineFile) => Document;

/**
 * convert KMZ file to JSON (JavaScript Object Notation)
 * @param {Response | Blob} blobLike
 * @returns {Promise<Awaited<Record<string, any>>>}
 */
export declare const kmzToJson: (blobLike: Response | Blob) => Promise<Record<string, any>>;

/**
 * 动作 - 精准复拍/定向拍照
 * @memberof wpml:action
 */
export declare interface OrientedShoot extends ActionBaseType {
    actionActuatorFunc: 'orientedShoot';
    actionActuatorFuncParam: {
        /**
         * 负载挂载位置，默认主云台
         */
        payloadPositionIndex: '0';
        /**
         * 云台Pitch转动角度
         * - °
         * - M30/M30T：[-120, 45]
         * - M3E/M3T：[-90, 35]
         * - M3D/M3TD：[-90, 30]
         */
        gimbalPitchRotateAngle: string;
        /**
         * 云台Yaw转动角度
         * - °
         * - [-180, 180]
         * - 注：M3E/M3T，M3D/M3TD 机型 `wpml:gimbalYawRotateAngle` 与 `wpml:aircraftHeading` 需保持一致
         */
        gimbalYawRotateAngle: string;
        /**
         * 目标选中框中心水平坐标
         * - px
         * - [0, 960]
         * - 注：照片左上角为坐标原点，水平方向为X轴，竖直方向为Y轴
         */
        focusX: '0';
        /**
         * 目标选中框中心竖直坐标
         * - px
         * - [0, 720]
         */
        focusY: '0';
        /**
         * 目标选中框宽
         * - px
         * - [0, 960]
         */
        focusRegionWidth: '0';
        /**
         * 目标选中框高
         * - px
         * - [0, 720]
         */
        focusRegionHeight: '0';
        /**
         * 变焦焦距
         * - mm
         * - 大于0
         */
        focalLength: string;
        /**
         * 飞行器目标偏航角（相对于地理北）
         * - [-180, 180]
         * - 注：飞行器旋转至该目标偏航角。0°为正北方向，90°为正东方向，-90°为正西方向，-180°/180°为正南方向
         */
        aircraftHeading: string;
        /**
         * 是否框选精准复拍目标
         * - `1`: 已框选目标物
         * - `0`: 未框选目标物
         * - 注：该值设置为1，复拍时飞行器会自主寻找目标进行拍摄。该值设置为0，复拍时飞行器只会按照飞行器姿态和负载姿态进行动作重复，不会自主寻找目标
         */
        accurateFrameValid: '0' | '1';
        /**
         * 目标框角度
         * - [0, 360]
         * - 注：目标框的旋转角度(以Y轴为基准，顺时针旋转)
         */
        targetAngle: string;
        /**
         * 动作唯一标识
         * - 注：拍照时，该值将被写入照片文件中，用于关联动作和照片文件
         */
        actionUUID: string;
        /**
         * 照片宽度
         * - px
         */
        imageWidth: '0';
        /**
         * 照片高度
         * - px
         */
        imageHeight: '0';
        /**
         * AF电机位置
         */
        AFPos: '0';
        /**
         * 云台端口号
         * - 拍摄照片的相机安装位置
         * - 注：M30/M30T机型该值固定为0
         */
        gimbalPort: '0';
        /**
         * 相机类型
         * - `52`（机型：M30双光相机）,
         * - `53`（机型：M30T三光相机）
         * - `66`（机型：Mavic 3E 相机）
         * - `67`（机型：Mavic 3T 相机）
         * - `80`（机型：Matrice 3D 相机）
         * - `81`（机型：Matrice 3TD 相机）
         */
        orientedCameraType: '52' | '53' | '66' | '67' | '80' | '81';
        /**
         * 照片文件路径
         */
        orientedFilePath: string;
        /**
         * 照片文件大小
         * - Byte
         */
        orientedFileSize: '0';
        /**
         * 照片文件后缀
         * - 为生成媒体文件命名时将额外附带该后缀
         */
        orientedFileSuffix: string;
        /**
         * 光圈大小
         */
        orientedCameraApertue?: string;
        /**
         * 环境亮度
         */
        orientedCameraLuminance?: string;
        /**
         * 快门时间
         */
        orientedCameraShutterTime?: string;
        /**
         * ISO
         */
        orientedCameraISO?: string;
        /**
         * 拍照模式
         * - `normalPhoto`: 普通拍照
         * - `lowLightSmartShooting`：低光智能拍照
         */
        orientedPhotoMode: 'normalPhoto' | 'lowLightSmartShooting';
        /**
         * 拍摄照片存储类型
         * - `zoom`: 存储变焦镜头拍摄照片
         * - `wide`: 存储广角镜头拍摄照片
         * - `ir`: 存储红外镜头拍摄照片
         * - `narrow_band`: 存储窄带镜头拍摄照片
         * - `visable`：可见光照片
         * - 注：存储多个镜头照片，格式如`<wpml:payloadLensIndex>wide,ir,narrow_band</wpml:payloadLensIndex>`表示同时使用广角、红外和窄带镜头
         */
        payloadLensIndex: string;
        /**
         * 是否使用全局存储类型
         * - `0`：不使用全局设置
         * - `1`：使用全局设置
         */
        useGlobalPayloadLensIndex: string;
    };
}

/**
 * 动作 - 全景拍照
 * @memberof wpml:action
 */
export declare interface PanoShot extends ActionBaseType {
    actionActuatorFunc: 'panoShot';
    actionActuatorFuncParam: {
        /**
         * 负载挂载位置，默认主云台
         */
        payloadPositionIndex: '0';
        /**
         * 拍摄照片存储类型
         * - `zoom`: 存储变焦镜头拍摄照片
         * - `wide`: 存储广角镜头拍摄照片
         * - `ir`: 存储红外镜头拍摄照片
         * - `narrow_band`: 存储窄带镜头拍摄照片
         * - `visable`：可见光照片
         * - 注：存储多个镜头照片，格式如`<wpml:payloadLensIndex>wide,ir,narrow_band</wpml:payloadLensIndex>`表示同时使用广角、红外和窄带镜头
         */
        payloadLensIndex: string;
        /**
         * 是否使用全局存储类型
         * - `0`：不使用全局设置
         * - `1`：使用全局设置
         */
        useGlobalPayloadLensIndex: string;
        /**
         * 全景拍照模式
         * - `panoShot_360`：全景模式
         */
        panoShotSubMode: 'panoShot_360';
    };
}

/**
 * 航点信息
 * @memberof Placemark
 */
export declare interface PointType {
    /**
     * 航点经纬度 <经度,纬度>
     * - 注：此处格式如`<Point> <coordinates> 经度,纬度 </coordinates> </Point>`
     */
    Point: {
        coordinates: string;
    };
    /**
     * 动作分组列表
     */
    actionGroup: Array<ActionGroupType>;
    /**
     * 航点高度（WGS84椭球高度）
     * - m
     * - 注：该元素与`wpml:height`配合使用，二者是同一位置不同高程参考平面的表达。
     */
    ellipsoidHeight: string;
    /**
     * 航点执行高度
     * - m
     * - 注：该元素仅在`waylines.wpml`中使用。具体高程参考平面在 `wpml:executeHeightMode` 中声明。
     */
    executeHeight?: string;
    /**
     * 航点高度（EGM96海拔高度/相对起飞点高度/AGL相对地面高度）
     * - m
     * - 注：该元素与`wpml:ellipsoidHeight`配合使用，二者是同一位置不同高程参考平面的表达。
     */
    height: string;
    /**
     * 航点序号
     * - [0, 65535]
     * - 注：在一条航线内该ID唯一。该序号必须从0开始单调连续递增。
     */
    index: string;
    isRisky: string;
    /**
     * 是否使用全局偏航角模式参数
     * - 0：不使用全局设置
     * - 1：使用全局设置
     */
    useGlobalHeadingParam: '0' | '1';
    /**
     * 是否使用全局高度
     * - 0, 1
     */
    useGlobalHeight: '0' | '1';
    /**
     * 是否使用全局飞行速度
     * - 0：不使用全局设置
     * - 1：使用全局设置
     * - 注：此处的全局飞行速度即`wpml:autoFlightSpeed`
     */
    useGlobalSpeed: '0' | '1';
    /**
     * 是否使用全局航点类型（全局航点转弯模式）
     * - 0：不使用全局设置
     * - 1：使用全局设置
     */
    useGlobalTurnParam: '0' | '1';
    /**
     * 该航段是否贴合直线
     * - `0`：航段轨迹全程为曲线
     * - `1`：航段轨迹尽量贴合两点连线
     */
    useStraightLine: '0' | '1';
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
        waypointHeadingAngle: string;
        /**
         * 飞行器偏航角模式
         */
        waypointHeadingMode: WaypointHeadingMode;
        /**
         * 飞行器偏航角转动方向
         */
        waypointHeadingPathMode: WaypointHeadingPathMode;
    };
    /**
     * 航点飞行速度
     * - m/s
     * - [1,15]
     */
    waypointSpeed: string;
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
        waypointTurnDampingDist: string;
        /**
         * 航点类型（航点转弯模式）
         */
        waypointTurnMode: WaypointTurnMode;
    };
    /**
     * 航点云台俯仰角
     * - °
     */
    gimbalPitchAngle: string;
}

/**
 * 动作 - 飞行器偏航
 * @memberof wpml:action
 */
export declare interface RotateYaw extends ActionBaseType {
    actionActuatorFunc: 'rotateYaw';
    actionActuatorFuncParam: {
        /**
         * 飞行器目标偏航角（相对于地理北）
         * - °
         * - [-180, 180]
         * - 注：飞行器旋转至该目标偏航角。0°为正北方向，90°为正东方向，-90°为正西方向，-180°/180°为正南方向。
         */
        aircraftHeading: string;
        /**
         * 飞行器偏航角转动模式
         * - `clockwise`：顺时针旋转
         * - `counterClockwise`：逆时针旋转
         */
        aircraftPathMode: 'clockwise' | 'counterClockwise';
    };
}

/**
 * 动作 - 开始录像
 * @memberof wpml:action
 */
export declare interface StartRecord extends ActionBaseType {
    actionActuatorFunc: 'startRecord';
    actionActuatorFuncParam: {
        /**
         * 负载挂载位置，默认主云台
         */
        payloadPositionIndex: '0';
        /**
         * 拍摄照片文件后缀。为生成媒体文件命名时将额外附带该后缀。
         */
        fileSuffix: string;
        /**
         * 拍摄照片存储类型
         * - `zoom`: 存储变焦镜头拍摄照片
         * - `wide`: 存储广角镜头拍摄照片
         * - `ir`: 存储红外镜头拍摄照片
         * - `narrow_band`: 存储窄带镜头拍摄照片
         * - `visable`：可见光照片
         * - 注：存储多个镜头照片，格式如`<wpml:payloadLensIndex>wide,ir,narrow_band</wpml:payloadLensIndex>`表示同时使用广角、红外和窄带镜头
         */
        payloadLensIndex: string;
        /**
         * 是否使用全局存储类型
         * - `0`：不使用全局设置
         * - `1`：使用全局设置
         */
        useGlobalPayloadLensIndex: '0' | '1';
    };
}

/**
 * 动作 - 结束录像
 * @memberof wpml:action
 */
export declare interface StopRecord extends ActionBaseType {
    actionActuatorFunc: 'stopRecord';
    actionActuatorFuncParam: {
        /**
         * 负载挂载位置，默认主云台
         */
        payloadPositionIndex: '0';
        /**
         * 拍摄照片存储类型
         * - `zoom`: 存储变焦镜头拍摄照片
         * - `wide`: 存储广角镜头拍摄照片
         * - `ir`: 存储红外镜头拍摄照片
         * - `narrow_band`: 存储窄带镜头拍摄照片
         * - `visable`：可见光照片
         * - 注：存储多个镜头照片，格式如`<wpml:payloadLensIndex>wide,ir,narrow_band</wpml:payloadLensIndex>`表示同时使用广角、红外和窄带镜头
         */
        payloadLensIndex: string;
    };
}

/**
 * 动作 - 单拍
 * @memberof wpml:action
 */
export declare interface TakePhoto extends ActionBaseType {
    actionActuatorFunc: 'takePhoto';
    actionActuatorFuncParam: {
        /**
         * 负载挂载位置，默认主云台
         */
        payloadPositionIndex: '0';
        /**
         * 拍摄照片文件后缀。为生成媒体文件命名时将额外附带该后缀。
         */
        fileSuffix: string;
        /**
         * 拍摄照片存储类型
         * - `zoom`: 存储变焦镜头拍摄照片
         * - `wide`: 存储广角镜头拍摄照片
         * - `ir`: 存储红外镜头拍摄照片
         * - `narrow_band`: 存储窄带镜头拍摄照片
         * - `visable`：可见光照片
         * - 注：存储多个镜头照片，格式如`<wpml:payloadLensIndex>wide,ir,narrow_band</wpml:payloadLensIndex>`表示同时使用广角、红外和窄带镜头
         */
        payloadLensIndex: string;
        /**
         * 是否使用全局存储类型
         * - `0`：不使用全局设置
         * - `1`：使用全局设置
         */
        useGlobalPayloadLensIndex: '0' | '1';
    };
}

/**
 * @description
 * - [`template.kml`](https://developer.dji.com/doc/cloud-api-tutorial/en/api-reference/dji-wpml/template-kml.html) 文件由三部分组成：
 * 1. 创建信息：主要包含航线文件本身的信息，例如文件的创建、更新时间等。
 * 2. 任务信息：主要包含 `wpml:missionConfig` 元素，定义航线任务的全局参数等。
 * 3. 模板信息：主要包含 `Folder` 元素，定义航线的模板信息（如航点飞行、建图航拍、倾斜摄影、航带飞行等）。不同航线模板类型包含的元素不同。
 */
export declare interface TemplateFile {
    /**
     * 文件创建作者
     */
    author?: string;
    /**
     * 文件创建时间（Unix Timestamp）
     * - ms
     */
    createTime?: string;
    /**
     * 文件更新时间（Unix Timestamp）
     * - ms
     */
    updateTime?: string;
    /**
     * 模板信息
     */
    Folder: {
        /**
         * 航点信息（包括航点经纬度和高度等）
         */
        Placemark?: Array<PointType>;
        /**
         * 全局航线飞行速度
         * - m/s
         * - [1,15]
         * - 注：该元素定义了此模板生成的整段航线中，飞行器的目标飞行速度。如果额外定义了某航点的该元素，则局部定义会覆盖全局定义。
         */
        autoFlightSpeed: string;
        caliFlightEnable: string;
        /**
         * 云台俯仰角控制模式
         */
        gimbalPitchMode: GimbalPitchMode;
        /**
         * 全局航线高度（相对起飞点高度）
         * - m
         */
        globalHeight: string;
        /**
         * 全局航段轨迹是否尽量贴合直线
         * - `0`：航段轨迹全程为曲线
         * - `1`：航段轨迹尽量贴合两点连线
         * - 注：当且仅当`wpml:globalWaypointTurnMode`被设置为`toPointAndStopWithContinuityCurvature`或`toPointAndPassWithContinuityCurvature`时必需。如果额外定义了某航点的该元素，则局部定义会覆盖全局定义。
         */
        globalUseStraightLine: '0' | '1';
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
            waypointHeadingAngle: string;
            /**
             * 飞行器偏航角模式
             */
            waypointHeadingMode: WaypointHeadingMode;
            /**
             * 飞行器偏航角转动方向
             */
            waypointHeadingPathMode: WaypointHeadingPathMode;
        };
        /**
         * 全局航点类型（全局航点转弯模式）
         */
        globalWaypointTurnMode: GlobalWaypointTurnMode;
        /**
         * 负载设置
         */
        payloadParam: {
            /**
             * 负载对焦模式
             * - `firstPoint`：首个航点自动对焦
             * - `custom`：标定对焦值对焦
             */
            focusMode: 'firstPoint' | 'custom';
            /**
             * 图片格式列表
             * - `wide`：存储广角镜头照片
             * - `zoom`：存储变焦镜头照片
             * - `ir`：存储红外镜头照片
             * - `narrow_band`: 存储窄带镜头拍摄照片
             * - 注：存储多个镜头照片，格式如`<wpml:imageFormat>wide,ir</wpml:imageFormat>`
             */
            imageFormat: string;
            /**
             * 负载测光模式
             * - `average`：全局测光
             * - `spot`：点测光
             */
            meteringMode: 'average' | 'spot';
            /**
             * 负载挂载位置
             * - `0`：飞行器1号挂载位置。M300 RTK，M350 RTK机型，对应机身左前方。其它机型，对应主云台。
             * - `1`：飞行器2号挂载位置。M300 RTK，M350 RTK机型，对应机身右前方。
             * - `2`：飞行器3号挂载位置。M300 RTK，M350 RTK机型，对应机身上方。
             */
            payloadPositionIndex: '0';
            /**
             * 激光雷达回波模式
             * - `singleReturnStrongest`：单回波
             * - `dualReturn`：双回波
             * - `tripleReturn`：三回波
             */
            returnMode: 'singleReturnStrongest' | 'dualReturn' | 'tripleReturn';
            /**
             * 负载采样率
             * - Hz
             * - 60000,80000,120000,160000,180000,240000
             */
            samplingRate: string;
            /**
             * 负载扫描模式
             * - `repetitive`：重复扫描
             * - `nonRepetitive`：非重复扫描
             */
            scanningMode: 'repetitive' | 'nonRepetitive';
        };
        /**
         * 模板ID
         * - [0, 65535]
         * - integer
         * - 注：在一个kmz文件内该ID唯一。建议从0开始单调连续递增。在template.kml和waylines.wpml文件中，将使用该id将模板与所生成的可执行航线进行关联。
         */
        templateId: string;
        /**
         * 预定义模板类型
         * - 注：模板为用户提供了快速生成航线的方案。用户填充模板元素，再导入大疆支持客户端（如DJI Pilot），即可快速生成可执行的测绘/巡检航线。
         */
        templateType: TemplateType;
        /**
         * 坐标系参数
         */
        waylineCoordinateSysParam: {
            /**
             * 经纬度坐标系
             * - `WGS84`：当前固定使用WGS84坐标系
             */
            coordinateMode: 'WGS84';
            /**
             * 航点高程参考平面
             * - `EGM96`：使用海拔高编辑
             * - `relativeToStartPoint`：使用相对点的高度进行编辑
             * - `aboveGroundLevel`：使用地形数据，AGL下编辑(仅支持司空2平台)
             * - `realTimeFollowSurface`: 使用实时仿地模式（仅用于建图航拍模版），仅支持M3E/M3T/M3M机型
             */
            heightMode: 'EGM96' | 'relativeToStartPoint' | 'aboveGroundLevel' | 'realTimeFollowSurface';
        };
    };
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
            droneEnumValue: string;
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
            droneSubEnumValue: string;
        };
        /**
         * 失控动作类型
         */
        executeRCLostAction: ExecuteRCLostAction;
        /**
         * 失控是否继续执行航线
         */
        exitOnRCLost: ExitOnRCLost;
        /**
         * 航线结束动作
         */
        finishAction: FinishAction;
        /**
         * 飞向首航点模式
         */
        flyToWaylineMode: FlyToWaypointType;
        /**
         * 全局返航高度
         * - m
         * - 注：飞行器返航时，先爬升至该高度，再进行返航
         */
        globalRTHHeight: string;
        /**
         * 全局航线过渡速度
         * - m/s
         * - [1,15]
         * - 注：飞行器飞往每条航线首航点的速度。航线任务中断时，飞行器从当前位置恢复至断点的速度。
         */
        globalTransitionalSpeed: string;
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
            payloadEnumValue: string;
            /**
             * 负载挂载位置
             * - `0`：飞行器1号挂载位置。M300 RTK，M350 RTK机型，对应机身左前方。其它机型，对应主云台。
             * - `1`：飞行器2号挂载位置。M300 RTK，M350 RTK机型，对应机身右前方。
             * - `2`：飞行器3号挂载位置。M300 RTK，M350 RTK机型，对应机身上方。
             */
            payloadPositionIndex: string;
            payloadSubEnumValue: string;
        };
        /**
         * 参考起飞点 <x,y,z>
         * - °, °, m
         * - [-90,90],[-180,180],高度无限制
         * - 注：“参考起飞点”仅做航线规划参考，飞行器执行航线时以飞行器真实的起飞点为准，高度使用椭球高。
         */
        takeOffRefPoint?: string;
        /**
         * 参考起飞点海拔高度
         * - m
         * - 注：”参考起飞点“海拔高度，与“参考起飞点”中的椭球高度对应。
         */
        takeOffRefPointAGLHeight?: string;
        /**
         * 安全起飞高度倾斜飞行模式
         * （M300）飞行器起飞后，倾斜飞到首航点。
         * （M30）飞行器起飞至“安全起飞高度”，再倾斜爬升至首航点。如果首航点高度低于“安全起飞高度”，则先平飞后下降。
         * - m
         * - [2, 1500] （高度模式：相对起飞点高度）
         * - 注：飞行器起飞后，先爬升至该高度，再根据“飞向首航点模式”的设置飞至首航点。该元素仅在飞行器未起飞时生效。
         */
        takeoffSecurityHeight: string;
    };
}

/**
 * 预定义模板类型
 * - `waypoint` 航点飞行
 * - `mapping2d` 建图航拍
 * - `mapping3d` 倾斜摄影
 * - `mappingStrip` 航带飞行
 */
export declare type TemplateType = 'waypoint' | 'mapping2d' | 'mapping3d' | 'mappingStrip';

/**
 * @description
 * - [`waylines.wpml`](https://developer.dji.com/doc/cloud-api-tutorial/en/api-reference/dji-wpml/waylines-wpml.html)是飞机直接执行的文件，它定义了明确的无人机飞行和负载动作指令，这些指令由 DJI Pilot 2、DJI Flighthub 2 或者其它软件生成，也可被开发者直接编辑开发。`waylines.wpml` 文件由两部分组成：
 * 1. 任务信息：主要包含 `wpml:missionConfig` 元素，定义航线任务的全局参数等。
 * 2. 航线信息：主要包含 `Folder` 元素，定义详细的航线信息（路径定义、动作定义等）。每个 `Folder` 代表一条可执行的航线。特别的，当使用“倾斜摄影”模板时，将生成5条可执行航线，对应 `waylines.wpml` 内的5个 `Folder` 元素。
 */
export declare interface WaylineFile {
    Folder: {
        /**
         * 航点信息（包括航点经纬度和高度等）
         */
        Placemark: Array<PointType>;
        /**
         * 全局航线飞行速度
         * - m/s
         * - [1,15]
         * - 注：此元素定义了此模板生成的整段航线中，飞行器的目标飞行速度。如果额外定义了某航点的该元素，则局部定义会覆盖全局定义。
         */
        autoFlightSpeed: string;
        /**
         * 执行高度模式
         * - `WGS84`：椭球高模式
         * - `relativeToStartPoint`：相对起飞点高度模式
         * - `realTimeFollowSurface`: 使用实时仿地模式，仅支持M3E/M3T/M3M，M3D/M3TD
         * - 注：该元素仅在`waylines.wpml`中使用。
         */
        executeHeightMode: 'WGS84' | `relativeToStartPoint` | `realTimeFollowSurface`;
        /**
         * 模板ID
         * - 注：在一个kmz文件内该ID唯一。建议从0开始单调连续递增。在template.kml和waylines.wpml文件中，将使用该id将模板与所生成的可执行航线进行关联。
         */
        templateId: string;
        /**
         * 航线ID
         * - 注：在一条航线中该ID唯一。建议从0开始单调连续递增。
         */
        waylineId: string;
    };
    /**
     * 任务信息
     */
    missionConfig: {
        /**
         * 飞行器机型信息
         */
        droneInfo: {
            droneEnumValue: '67';
            droneSubEnumValue: '1';
        };
        /**
         * 失控动作类型
         */
        executeRCLostAction: ExecuteRCLostAction;
        /**
         * 失控是否继续执行航线
         */
        exitOnRCLost: ExitOnRCLost;
        /**
         * 航线结束动作
         */
        finishAction: FinishAction;
        /**
         * 飞向首航点模式
         */
        flyToWaylineMode: FlyToWaypointType;
        /**
         * 全局返航高度
         * - m
         * - 注：飞行器返航时，先爬升至该高度，再进行返航
         */
        globalRTHHeight: string;
        /**
         * 全局航线过渡速度
         * - m/s
         * - [1,15]
         * - 注：飞行器飞往每条航线首航点的速度。航线任务中断时，飞行器从当前位置恢复至断点的速度。
         */
        globalTransitionalSpeed: string;
        /**
         * 负载机型信息
         */
        payloadInfo: {
            payloadEnumValue: '53';
            payloadPositionIndex: '0';
            payloadSubEnumValue: '2';
        };
        /**
         * 安全起飞高度
         * - m
         * - [2, 1500] （高度模式：相对起飞点高度）
         * - 注：飞行器起飞后，先爬升至该高度，再根据“飞向首航点模式”的设置飞至首航点。该元素仅在飞行器未起飞时生效。
         */
        takeOffSecurityHeight: string;
    };
}

/**
 * 飞行器偏航角模式
 * - `followWayline` 沿航线方向。飞行器机头沿着航线方向飞至下一航点
 * - `manually` 手动控制。飞行器在飞至下一航点的过程中，用户可以手动控制飞行器机头朝向
 * - `fixed` 锁定当前偏航角。飞行器机头保持执行完航点动作后的飞行器偏航角飞至下一航点
 * - `smoothTransition` 自定义。通过`wpml:waypointHeadingAngle`给定某航点的目标偏航角，并在航段飞行过程中均匀过渡至下一航点的目标偏航角
 * - `towardPOI` 朝向兴趣点
 */
export declare type WaypointHeadingMode = 'followWayline' | 'manually' | 'fixed' | 'smoothTransition';

/**
 * 飞行器偏航角转动方向
 * - `clockwise` 顺时针旋转飞行器偏航角
 * - `counterClockwise` 逆时针旋转飞行器偏航角
 * - `followBadArc` 沿最短路径旋转飞行器偏航角
 */
export declare type WaypointHeadingPathMode = 'clockwise' | 'counterClockwise' | 'followBadArc';

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
export declare type WaypointTurnMode = 'coordinateTurn' | 'toPointAndStopWithDiscontinuityCurvature' | 'toPointAndStopWithContinuityCurvature' | 'toPointAndPassWithContinuityCurvature';

/**
 * convert XML DOM to JSON
 * @param {Response | string} xmlLike
 * @returns {Promise<Awaited<any>>}
 */
export declare const xmlToJson: (xmlLike: Response | string) => Promise<any>;

/**
 * 动作 - 变焦
 * @memberof wpml:action
 */
export declare interface Zoom extends ActionBaseType {
    actionActuatorFunc: 'zoom';
    actionActuatorFuncParam: {
        /**
         * 负载挂载位置，默认主云台
         */
        payloadPositionIndex: '0';
        /**
         * 变焦焦距
         * - mm
         * - 大于0
         */
        focalLength: string;
    };
}

export { }
