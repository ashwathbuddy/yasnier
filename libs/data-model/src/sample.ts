import { Account, Device } from './models.js';

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
