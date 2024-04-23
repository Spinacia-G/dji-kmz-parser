declare interface ActionType {
    (propName: string): string;
}

/**
 * create KMZ file from JSON
 * @description Reference: [how to create KMZ file](https://sdk-forum.dji.net/hc/en-us/articles/12254235478681-How-to-creat-KMZ-file)
 * @param {{template: KmlType, waylines: Record<string, any>}} obj
 * @returns {Promise<Awaited<Blob>>} KMZ file in Blob format
 */
export declare const jsonToKmz: (obj: {
    template: KmlType;
    waylines: Record<string, any>;
}) => Promise<Blob>;

/**
 * create XML DOM from JSON
 * @param {KmlType | Record<string, any>} obj
 * @returns {Document}
 */
export declare const jsonToXml: (obj: KmlType | Record<string, any>) => Document;

declare interface KmlType {
    author: string;
    createTime: string;
    updateTime: string;
    Folder: {
        Placemark?: Array<PointType>;
        autoFlightSpeed: string;
        caliFlightEnable: string;
        gimbalPitchMode: string;
        globalHeight: string;
        globalUseStraightLine: string;
        globalWaypointHeadingParam: {
            waypointHeadingAngle: string;
            waypointHeadingMode: string;
            waypointHeadingPathMode: string;
            waypointHeadingPoiIndex: string;
            waypointPoiPoint: string;
        };
        globalWaypointTurnMode: string;
        payloadParam: {
            focusMode: string;
            imageFormat: string;
            meteringMode: string;
            payloadPositionIndex: string;
            returnMode: string;
            samplingRate: string;
            scanningMode: string;
        };
        templateId: string;
        templateType: string;
        waylineCoordinateSysParam: {
            coordinateMode: string;
            heightMode: string;
        };
    };
    missionConfig: {
        droneInfo: {
            droneEnumValue: string;
            droneSubEnumValue: string;
        };
        executeRCLostAction: string;
        exitOnRCLost: string;
        finishAction: string;
        flyToWaylineMode: string;
        globalRTHHeight: string;
        globalTransitionalSpeed: string;
        payloadInfo: {
            payloadEnumValue: string;
            payloadPositionIndex: string;
            payloadSubEnumValue: string;
        };
        takeOffRefPoint: string;
        takeOffRefPointAGLHeight: string;
        takeoffSecurityHeight: string;
    };
}

/**
 * convert KMZ file to JSON (JavaScript Object Notation)
 * @param {Response | Blob} blobLike
 * @returns {Promise<Awaited<Record<string, any>>>}
 */
export declare const kmzToJson: (blobLike: Response | Blob) => Promise<Record<string, any>>;

declare interface PointType {
    Point: {
        coordinates: string;
    };
    actionGroup: {
        action: Array<ActionType>;
        actionGroupEndIndex: string;
        actionGroupId: string;
        actionGroupMode: string;
        actionGroupStartIndex: string;
        actionTrigger: {
            actionTriggerType: string;
        };
    };
    ellipsoidHeight: string;
    height: string;
    index: string;
    isRisky: string;
    useGlobalHeadingParam: string;
    useGlobalHeight: string;
    useGlobalSpeed: string;
    useStraightLine: string;
    waypointHeadingParam: {
        waypointHeadingAngle: string;
        waypointHeadingMode: string;
        waypointHeadingPathMode: string;
        waypointHeadingPoiIndex: string;
        waypointPoiPoint: string;
    };
    waypointSpeed: string;
    waypointTurnParam: {
        waypointTurnDampingDist: string;
        waypointTurnMode: string;
    };
}

/**
 * convert XML DOM to JSON
 * @param {Response | string} xmlLike
 * @returns {Promise<Awaited<any>>}
 */
export declare const xmlToJson: (xmlLike: Response | string) => Promise<any>;

export { }
