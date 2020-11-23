import { describe, it, expect } from "@jest/globals";
import { AdditiveTweening } from ".";

describe("additween", function () {
    it("should export AdditiveTweening class", function () {
        expect(AdditiveTweening).toBeInstanceOf(Function);
    });

    it("should return final state on finish", function () {
        return new Promise<void>((resolve) => {
            const animation = new AdditiveTweening({
                onRender: () => {},
                onFinish: function (finalState) {
                    expect(finalState).toEqual({
                        x: 100,
                        y: 200,
                    });
                    resolve();
                },
            });
            animation.tween({ x: 0, y: 0 }, { x: 100, y: 200 }, 200);
        });
    });

    it("should cancels animation", function () {
        return new Promise<void>((resolve) => {
            const animation = new AdditiveTweening({
                onRender: function (currentState) {
                    expect(currentState).not.toEqual({
                        x: 300,
                        y: 200,
                    });
                },
                onCancel: resolve,
            });
            animation.tween({ x: 0, y: 0 }, { x: 100, y: 200 }, 400);
            setTimeout(function () {
                animation.cancel();
            }, 200);
        });
    });

    it("returns last animation final state on finish", function () {
        return new Promise<void>((resolve) => {
            const animation = new AdditiveTweening({
                onRender: () => {},
                onFinish: function (finalState) {
                    expect(finalState).toEqual({
                        x: 300,
                        y: 400,
                    });
                    resolve();
                },
            });
            animation.tween({ x: 0, y: 0 }, { x: 100, y: 200 }, 400);
            setTimeout(function () {
                animation.tween({ x: 100, y: 200 }, { x: 300, y: 400 }, 400);
            }, 200);
        });
    });
});
