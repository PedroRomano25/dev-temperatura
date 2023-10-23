export interface IGeoLocation {
    loaded: boolean;
    coordinates?: ICoordinates;
    error?: {
        code: number;
        message: string;
    };
}
