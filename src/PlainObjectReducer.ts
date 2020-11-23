export interface IStateReducer<T extends Record<string, number>> {
    clone: (state: T) => T;
    reduce: (targetState: T, toState: T, fromState: T, pos: number) => T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PlainObjectReducer: IStateReducer<any> = {
    clone: function (obj) {
        const target: Record<string, number> = {};
        for (const key in obj) {
            target[key] = obj[key];
        }
        return target;
    },

    reduce: function (targetState, toState, fromState, pos) {
        for (const key in targetState) {
            targetState[key] -= (toState[key] - fromState[key]) * pos;
        }
        return targetState;
    },
};
