import arrayMin from './min';
import arrayMax from './max';

export default ({ data, limit, width = 1, height = 1, margin = 0, max, min }) => {
    var curves = data;
    if (!Array.isArray(data[0])) curves = [data];

    if (max === undefined) max = arrayMax(curves.map((curve) => arrayMax(curve)));
    if (min === undefined) min = arrayMin(curves.map((curve) => arrayMin(curve)));

    const len = arrayMax(curves.map((curve) => curve.length));

    if (limit && limit < len) {
        curves = curves.map((curve) => curve.slice(len - limit));
    }

    const vfactor = (height - margin * 2) / ((max - min) || 2);
    const hfactor = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0));

    return curves.map((curve) =>
        curve.map((d, i) => ({
            x: i * hfactor + margin,
            y: (max === min ? 1 : (max - d)) * vfactor + margin
        }))
    );
};
