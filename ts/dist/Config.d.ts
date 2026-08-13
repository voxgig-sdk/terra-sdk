import { BaseFeature } from './feature/base/BaseFeature';
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    main: {
        name: string;
    };
    feature: {
        test: {
            options: {
                active: boolean;
            };
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            activity: {};
            athlete: {};
            authentication: {};
            body: {};
            bulk_user_info: {};
            daily: {};
            integration: {};
            lab_report: {};
            lab_report_delivery: {};
            lab_report_file: {};
            menstruation: {};
            nutrition: {};
            planned_workout: {};
            sleep: {};
            user: {};
            workout: {};
        };
    };
    entity: {
        activity: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        athlete: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        authentication: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: ({
                        active: boolean;
                        args: {
                            header: {
                                active: boolean;
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                            query: {
                                active: boolean;
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    } | {
                        active: boolean;
                        args: {
                            header?: undefined;
                            query?: undefined;
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist?: undefined;
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    })[];
                    key$: string;
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        body: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        bulk_user_info: {
            fields: never[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        daily: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        integration: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        lab_report: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                session_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                session_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        lab_report_delivery: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                session_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        lab_report_file: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                session_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        menstruation: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        nutrition: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        planned_workout: {
            fields: ({
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
                op?: undefined;
            } | {
                active: boolean;
                name: string;
                op: {
                    update: {
                        req: boolean;
                        type: string;
                    };
                };
                req: boolean;
                type: string;
                index$: number;
            })[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                planned_workout_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                update: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                planned_workout_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        sleep: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        user: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                example: number;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    } | {
                        active: boolean;
                        args: {
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    })[];
                    key$: string;
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        workout: {
            fields: {
                active: boolean;
                name: string;
                req: boolean;
                type: string;
                index$: number;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: ({
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                workout_id: string;
                            };
                        };
                        select: {
                            $action: string;
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    } | {
                        active: boolean;
                        args: {
                            params?: undefined;
                            query?: undefined;
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            $action?: undefined;
                            exist?: undefined;
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                        rename?: undefined;
                    })[];
                    key$: string;
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {};
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                workout_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    }[];
                    key$: string;
                };
                remove: {
                    input: string;
                    name: string;
                    points: ({
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                        rename?: undefined;
                    } | {
                        active: boolean;
                        args: {
                            params: {
                                active: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                index$: number;
                            }[];
                            query?: undefined;
                        };
                        method: string;
                        orig: string;
                        parts: string[];
                        rename: {
                            param: {
                                workout_id: string;
                            };
                        };
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        index$: number;
                    })[];
                    key$: string;
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
    };
}
declare const config: Config;
export { config };
