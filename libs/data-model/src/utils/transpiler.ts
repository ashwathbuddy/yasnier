function transpile(obj: any) {
    if (typeof obj === 'string') return { S: obj };
    if (typeof obj === 'number') return { N: obj };
    if (typeof obj === 'boolean') return { BOOL: String(obj) };
    if (typeof obj === 'object') {
        //obj.__type = obj.constructor.name;
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            const res: any[] = [];
            for (var item of obj) {
                var item2 = transpile(item);
                res.push(item2);
            }
            return { L: res }; //TODO empty list??
        } else {
            const res: { [name: string]: any } = {};
            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) continue;
                var value = obj[key];
                if (value) {
                    res[key] = transpile(value);
                }
            }
            return { M: res }; //TODO empty class??
        }
    }

    throw 'error transpiling datamodel';
}

function addRecord(sampleJson: { [name: string]: any }, tableName: string, records: any[]) {
    if (!sampleJson[tableName]) sampleJson[tableName] = [];
    for (const item of records) {
        sampleJson[tableName].push({
            PutRequest: {
                Item: transpile(item)['M'],
            },
        });
    }
}

export { addRecord };
