export const nameToSymbol = (name) => {
    let v = '';

    if ('Kelvin'.indexOf(name) === 0) {
        return 'k';
    }
    if ('Celsius'.indexOf(name) === 0) {
        return 'c';
    }
    if ('Fahrenheit'.indexOf(name) === 0) {
        return 'f';
    }
    if ('Rankine'.indexOf(name) === 0) {
        return 'r';
    }
}

export const getValueByName = (name, table_value) => {
    // console.log('=> name: ' + name + ', result: ' + table_value);
    if (!table_value) return null;
    try {
        const json_table = JSON.parse(table_value);
        console.log('==> ', nameToSymbol(name).toUpperCase());
        return json_table[nameToSymbol(name).toUpperCase()];
    } catch (e) {
        return null;
    }
}
