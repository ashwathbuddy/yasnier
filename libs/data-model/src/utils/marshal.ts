import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';

export const DB_SCHEMA: CreateTableCommandInput[] = [];
export const REGISTRY: { [name: string]: any } = {};

function getTableReg(tableName: string) {
    if (!REGISTRY[tableName]) {
        REGISTRY[tableName] = {
            TableName: tableName,
            KeySchema: [],
            AttributeDefinitions: [],
            GlobalSecondaryIndexes: [],
        };
    }
    return REGISTRY[tableName];
}
function setKeyAttribute(target: Object, propertyKey: string, type: string, keyType: string) {
    const table: string = target.constructor.name;
    const reg = getTableReg(table);
    reg['KeySchema'].push({ AttributeName: propertyKey, KeyType: keyType });
    reg['AttributeDefinitions'].push({ AttributeName: propertyKey, AttributeType: type });
}

function setGsiKeyAttribute(target: Object, propertyKey: string, type: string, keyType: string) {
    const table: string = target.constructor.name;
    const reg = getTableReg(table);
    reg['AttributeDefinitions'].push({ AttributeName: propertyKey, AttributeType: type });
    reg['GlobalSecondaryIndexes'].push({
        IndexName: propertyKey + '-gsi',    // NOTE: GSI indexNames is set propertyKey-gsi
        KeySchema: [
            {
                AttributeName: propertyKey,
                KeyType: keyType,
            },
        ],
        Projection: {
            ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    });
}

// Decorator factory
export function Model() {
    return function (constructor: Function) {
        const reg = getTableReg(constructor.name);
        // TODO ensure only one hashkey and range key is specified
        reg['ProvisionedThroughput'] = {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        };
        if(reg['GlobalSecondaryIndexes'].length == 0){
            reg['GlobalSecondaryIndexes'] = null;
        }
        DB_SCHEMA.push(reg as CreateTableCommandInput);
    };
}
export function HashKey(type: string) {
    return function (target: Object, propertyKey: string) {
        setKeyAttribute(target, propertyKey, type, 'HASH');
    };
}
export function RangeKey(type: string) {
    return function (target: Object, propertyKey: string) {
        setKeyAttribute(target, propertyKey, type, 'RANGE');
    };
}
export function GsiHashKey(type: string) {
    return function (target: Object, propertyKey: string) {
        setGsiKeyAttribute(target, propertyKey, type, 'HASH');
    };
}

// {
//     "TableName": table_name,
//     "KeySchema": [
//         {
//             'AttributeName': str(hash),
//             'KeyType': 'HASH'
//         }
//     ],
//     "AttributeDefinitions": [
//         {
//             'AttributeName': str(hash),
//             'AttributeType': 'S'
//         },
//         {
//             'AttributeName': "email",
//             'AttributeType': 'S'
//         }
//     ],
//     "ProvisionedThroughput": {
//         'ReadCapacityUnits': 5,
//         'WriteCapacityUnits': 5
//     },
//     "GlobalSecondaryIndexes": [
//         {
//             'IndexName': 'email-gsi',
//             'KeySchema': [
//                 {
//                     'AttributeName': 'email',
//                     'KeyType': 'HASH'
//                 },
//             ],
//             'Projection': {
//                 'ProjectionType': 'ALL'
//             },
//             'ProvisionedThroughput': {
//                 'ReadCapacityUnits': 5,
//                 'WriteCapacityUnits': 5
//             }
//         },
//     ]
// }

// credit: Typescript documentation, src
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
// function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
//     return o[propertyName]; // o[propertyName] is of type T[K]
// }
