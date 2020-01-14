const vol_convert = require('convert-units');

export const temperatureConverter = (value, fromUnit) => {
     console.log('>> value: ' + value, ', fromUnit: ' + fromUnit);
    let translations = k => ['K', 'C', 'F', 'R']
    .map(x => [x, heatBabel(value, fromUnit, x)]);

    let heatBabel = (n, strFromScale, strToScale) => {
        let ratio = 9 / 5,
            cels = 273.15,
            fahr = 459.67,
            id = x => x,
            readK = {
                k: id,
                c: x => cels + x,
                f: x => (fahr + x) * ratio,
                r: x => x / ratio
            },
            writeK = {
                k: id,
                c: x => x - cels,
                f: x => (x * ratio) - fahr,
                r: x => ratio * x
            };

        return writeK[strToScale.charAt(0).toLowerCase()](
            readK[strFromScale.charAt(0).toLowerCase()](n)
        ).toFixed(2);
    };

    return '{' + translations(21)
        .map(([s, n]) => '"' + s + '"' + (':' + n)
            .slice(-10))
        .join(',') + '}';

}

export const volumeConverter = (value, fromUnit, toUnit) => {
    console.log('>> value: ' + value, ', fromUnit: ' + fromUnit + ', toUnit: ' + toUnit);
    try {
        const result = vol_convert(value).from(fromUnit).to(toUnit);
        console.log('=> volumeConverter: ', result);
        return result;
    } catch(e) {
        console.error(e);
        return null;
    }
}

export const valueEqual = (t1, t2) => {
    if (isNaN(Number(t1)) || isNaN(Number(t2))) {
        return false;
    }
    console.log('=> t1: ' + parseFloat(t1).toFixed(1) + ', t2: ' + parseFloat(t2).toFixed(1));
    return parseFloat(t1).toFixed(1) == parseFloat(t2).toFixed(1);
}