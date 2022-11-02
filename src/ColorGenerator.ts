import MathHelper from "./MathHelper";

interface HslLimitArgs {
    minHLimit?: number,
    maxHLimit?: number,
    minSLimit?: number,
    maxSLimit?: number,
    minLLimit?: number,
    maxLLimit?: number
}

export default class ColorGenerator {

    static readonly maxH = 360;
    static readonly minH = 0;

    static readonly maxS = 100;
    static readonly minS = 0;

    static readonly maxL = 100;
    static readonly minL = 0;


    private isHueValid(hue?: number): boolean {
        if (hue === undefined) return false;
        return hue >= ColorGenerator.minH && hue <= ColorGenerator.maxH;
    }

    private isSaturationValid(saturation?: number): boolean {
        if (saturation === undefined) return false;
        return saturation >= ColorGenerator.minS && saturation <= ColorGenerator.maxS;
    }

    private isLightnessValid(lightness?: number): boolean {
        if (lightness === undefined) return false;
        return lightness >= ColorGenerator.minL && lightness < ColorGenerator.maxL;
    }

    generateHslColor(limits: HslLimitArgs): string {

        const { minHLimit, maxHLimit, minSLimit, maxSLimit, minLLimit, maxLLimit } = limits;

        const minLightnessLimit = this.isLightnessValid(minLLimit) ? minLLimit! : ColorGenerator.minL;
        const maxLightnessLimit = this.isHueValid(maxLLimit) ? maxLLimit! : ColorGenerator.maxL;

        const minHueLimit = this.isHueValid(minHLimit) ? minHLimit! : ColorGenerator.minH;
        const maxHueLimit = this.isHueValid(maxHLimit) ? maxHLimit! : ColorGenerator.maxH;

        const minSaturationLimit = this.isSaturationValid(minSLimit) ? minSLimit! : ColorGenerator.minS;
        const maxSaturationLimit = this.isSaturationValid(maxSLimit) ? maxLLimit! : ColorGenerator.maxL;


        const rHue = MathHelper.getRandomValue(maxHueLimit, minHueLimit);
        const rSaturation = MathHelper.getRandomValue(maxSaturationLimit, minSaturationLimit);
        const rLightness = MathHelper.getRandomValue(maxLightnessLimit, minLightnessLimit);


        return `hsl(${rHue}, ${rSaturation}%, ${rLightness}%)`;
    }
}