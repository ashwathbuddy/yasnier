import {
  Account,
  Device,
  DeviceModel,
  // GlobalConfig,
} from './models.js';

import { addRecord } from './utils/transpiler.js';

// export list of sample objects transpiled for ddb batch write

export const DB_SAMPLE: { [name: string]: [] } = {};

// const GlobalConfigSample: GlobalConfig[] = [
//   new GlobalConfig({
//     id: 'es',
//     name: 'Spain',
//     legals: [
//       {
//         code: 'doc01',
//         name: 'Installer certificate',
//         description: '',
//       },
//       {
//         code: 'doc02',
//         name: 'Treasury and SS Certificate',
//         description: '',
//       },
//       {
//         code: 'doc03',
//         name: 'Liability insurance',
//         description: '',
//       },
//     ],
//     regions: [
//       {
//         id: 'andalucia',
//         name: 'Andalucía',
//       },
//       {
//         id: 'aragon',
//         name: 'Aragón',
//       },
//       {
//         id: 'asturias',
//         name: 'Asturias',
//       },
//       {
//         id: 'baleares',
//         name: 'Islas Baleares',
//       },
//       {
//         id: 'canarias',
//         name: 'Canarias',
//       },
//       {
//         id: 'cantabria',
//         name: 'Cantabria',
//       },
//       {
//         id: 'castillaLeon',
//         name: 'Castilla y León',
//       },
//       {
//         id: 'castillaMancha',
//         name: 'Castilla-La Mancha',
//       },
//       {
//         id: 'cataluna',
//         name: 'Cataluña',
//       },
//       {
//         id: 'madrid',
//         name: 'Comunidad de Madrid',
//       },
//       {
//         id: 'navarra',
//         name: 'Comunidad Foral de Navarra',
//       },
//       {
//         id: 'valencia',
//         name: 'Comunidad Valenciana',
//       },
//       {
//         id: 'extremadura',
//         name: 'Extremadura',
//       },
//       {
//         id: 'galicia',
//         name: 'Galicia',
//       },
//       {
//         id: 'larioja',
//         name: 'La Rioja',
//       },
//       {
//         id: 'paisVasco',
//         name: 'País Vasco',
//       },
//       {
//         id: 'murcia',
//         name: 'Región de Murcia',
//       },
//     ],
//   }),
// ];
// addRecord(DB_SAMPLE, 'GlobalConfig', GlobalConfigSample);

const AccountSample: Account[] = [
  new Account({
    id: '4394a852-20f1-70ec-6261-26cccea14c3f',
    name: 'Alpha',
    email: 'alpha@domain.io',
    phone: '+52525252',
    createdAt: new Date().toLocaleDateString(),
  }),
  new Account({
    id: '4394a852-20f1-70ec-6261-26cccea14c3f',
    name: 'Alex Mart',
    email: 'alpha@domain.io',
    phone: '+52525252',
    createdAt: new Date().toLocaleDateString(),
  }),
];
addRecord(DB_SAMPLE, 'Account', AccountSample);

const DeviceModelSample: DeviceModel[] = [
  new DeviceModel({
    name: 'GW7K-HCA-GoodWe',
    image: 'GW-HCA-GoodWe.jpg',
    level: 'Level 2',
    power: [7, 23, 35],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'GoodWe',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'GW11K-HCA-GoodWe',
    image: 'GW-HCA-GoodWe.jpg',
    level: 'Level 2',
    power: [11, 15, 26],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'GoodWe',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'GW22K-HCA-GoodWe',
    image: 'GW-HCA-GoodWe.jpg',
    level: 'Level 2',
    power: [22, 34],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'GoodWe',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Smappee EV Wall',
    image: 'Smappee_EV_Wall.jpg',
    level: 'Level 2',
    power: [24, 36],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Charger Point',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Myenergi Zappi V2',
    image: 'Myenergi_Zappi_V2.jpg',
    level: 'Level 2',
    power: [20, 23],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Anderson A2',
    image: 'Anderson_A2.jpg',
    level: 'Level 2',
    power: [22, 30],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'EO Mini PRO 3',
    image: 'EO_Mini_PRO_3.jpg',
    level: 'Level 2',
    power: [21, 26, 36],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Charger Point',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'ZJ Beny BCP Series',
    image: 'ZJ_Beny_BCP_Series.jpg',
    level: 'Level 2',
    power: [35, 37, 45],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Charger Point',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Fimer Flexa AC wallbox',
    image: 'Fimer_Flexa_AC_wallbox.jpg',
    level: 'Level 2',
    power: [32, 38],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Charger Point',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Wallbox Pulsar Plus',
    image: 'Wallbox_Pulsar_Plus.jpg',
    level: 'Level 2',
    power: [27, 36],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Charger Point',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Ocular IQ Wallbox',
    image: 'Ocular_IQ_Wallbox.jpg',
    level: 'Level 2',
    power: [36, 38],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Charger Point',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Enel-x JuiceBox 40',
    image: 'Enel-x_JuiceBox_40.jpg',
    level: 'Level 2',
    power: [38, 40, 42],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Tesla Wall Connector',
    image: 'Tesla_Wall_Connector.jpg',
    level: 'Level 2',
    power: [22, 29, 40],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Primo & GEN24',
    image: 'Primo_&_GEN24.jpg',
    level: 'Level 2',
    power: [29, 35],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'SUN2000L1',
    image: 'SUN2000L1.jpg',
    level: 'Level 2',
    power: [40, 46],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'HD Wave',
    image: 'HD_Wave.jpg',
    level: 'Level 2',
    power: [424, 5, 47],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Sunny Boy',
    image: 'Sunny_Boy.jpg',
    level: 'Level 2',
    power: [33, 37],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'SG Premium & SG-RS',
    image: 'SG_Premium_&_SG-RS.jpg',
    level: 'Level 2',
    power: [30, 45],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'DNS G3 Series',
    image: 'DNS_G3_Series.jpg',
    level: 'Level 2',
    power: [24, 35],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'UNO DM PLUS-Q',
    image: 'UNO_DM_PLUS-Q.jpg',
    level: 'Level 2',
    power: [26, 34, 38],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'Home Series',
    image: 'Home_Series.jpg',
    level: 'Level 2',
    power: [34, 38],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'GEP Series',
    image: 'GEP_Series.jpg',
    level: 'Level 2',
    power: [38, 43],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
  new DeviceModel({
    name: 'STS-KTL-P',
    image: 'STS-KTL-P.jpg',
    level: 'Level 2',
    power: [25, 34],
    protocol: 'OCCP 1.6',
    connection: ['', ''],
    deviceType: 'Solar Inversor',
    capacity: 60,
  }),
];
addRecord(DB_SAMPLE, 'DeviceModel', DeviceModelSample);

const DeviceSample: Device[] = [
  new Device({
    id: '90f8d3f0-47d6-499f-b24f-9fe4ae056600',
    accountId: AccountSample[0]!.id!,
    model: {
      name: 'Smappee EV Wall',
      image: 'Smappee_EV_Wall.jpg',
      power: 28,
      protocol: 'OCCP 1.6',
    },
    storage: {
      state_of_charge: 36,
      capacity: 60,
    },
    load: -24,
  }),
  new Device({
    id: '90f8d3f0-47d6-499f-b24f-9fe4ae056601',
    accountId: AccountSample[0]!.id!,
    model: {
      name: 'Myenergi Zappi V2',
      image: 'Myenergi_Zappi_V2.jpg',
      power: 30,
      protocol: 'OCCP 1.6',
    },
    storage: {
      state_of_charge: 36,
      capacity: 60,
    },
    load: 0,
  }),
  new Device({
    id: '90f8d3f0-47d6-499f-b24f-9fe4ae056602',
    accountId: AccountSample[0]!.id!,
    model: {
      name: 'GEP Series',
      image: 'GEP_Series.jpg',
      power: 38,
      protocol: 'OCCP 1.6',
    },
    storage: {
      state_of_charge: 36,
      capacity: 60,
    },
    load: 38,
  }),
  new Device({
    id: '90f8d3f0-47d6-499f-b24f-9fe4ae056603',
    accountId: AccountSample[0]!.id!,
    model: {
      name: 'DNS G3 Series',
      image: 'DNS_G3_Series.jpg',
      power: 42,
      protocol: 'OCCP 1.6',
    },
    storage: {
      state_of_charge: 36,
      capacity: 60,
    },
    load: 46,
  }),
  new Device({
    id: '90f8d3f0-47d6-499f-b24f-9fe4ae056604',
    accountId: AccountSample[0]!.id!,
    model: {
      name: 'DNS G3 Series',
      image: 'DNS_G3_Series.jpg',
      power: 40,
      protocol: 'OCCP 1.6',
    },
    storage: {
      state_of_charge: 36,
      capacity: 60,
    },
    load: null,
  }),
  new Device({
    id: '90f8d3f0-47d6-499f-b24f-9fe4ae056605',
    accountId: AccountSample[0]!.id!,
    model: {
      name: 'Sunny Boy',
      image: 'Sunny_Boy.jpg',
      power: 22,
      protocol: 'OCCP 1.6',
    },
    storage: {
      state_of_charge: 36,
      capacity: 60,
    },
    load: 36,
  }),
  new Device({
    id: '90f8d3f0-47d6-499f-b24f-9fe4ae056606',
    accountId: AccountSample[0]!.id!,
    model: {
      name: 'Primo & GEN24',
      image: 'Primo_&_GEN24.jpg',
      power: 28,
      protocol: 'OCCP 1.6',
    },
    storage: {
      state_of_charge: 36,
      capacity: 60,
    },
    load: 42,
  }),
  new Device({
    id: '90f8d3f0-47d6-499f-b24f-9fe4ae056607',
    accountId: AccountSample[0]!.id!,
    model: {
      name: 'Tesla Wall Connector',
      image: 'Tesla_Wall_Connector.jpg',
      power: 40,
      protocol: 'OCCP 1.6',
    },
    storage: {
      state_of_charge: 36,
      capacity: 60,
    },
    load: 32,
  }),
  new Device({
    id: '90f8d3f0-47d6-499f-b24f-9fe4ae056608',
    accountId: AccountSample[0]!.id!,
    model: {
      name: 'Ocular IQ Wallbox',
      image: 'Ocular_IQ_Wallbox.jpg',
      power: 22,
      protocol: 'OCCP 1.6',
    },
    storage: {
      state_of_charge: 36,
      capacity: 60,
    },
    load: -34,
  }),
  new Device({
    id: '90f8d3f0-47d6-499f-b24f-9fe4ae056609',
    accountId: AccountSample[0]!.id!,
    model: {
      name: 'Wallbox Pulsar Plus',
      image: 'Wallbox_Pulsar_Plus.jpg',
      power: 36,
      protocol: 'OCCP 1.6',
    },
    storage: {
      state_of_charge: 36,
      capacity: 60,
    },
    load: 51,
  }),
];
addRecord(DB_SAMPLE, 'Device', DeviceSample);
