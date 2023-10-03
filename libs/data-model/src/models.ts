import { v4 as uuidv4 } from 'uuid';
import { Model, HashKey, RangeKey } from './utils/marshal';

@Model()
export class Account {
  @HashKey('S')
  email: string;
  @RangeKey('S')
  id: string;

  name: string;
  phone: string;
  password?: string;
  createdAt?: string;

  constructor(args: {
    email: string;
    id?: string;
    name: string;
    phone: string;
    password?: string;
    createdAt?: string;
  }) {
    this.name = args.name;
    this.phone = args.phone;
    this.email = args.email;
    this.password = args.password;
    this.id = args.id || uuidv4();
    this.createdAt = args.createdAt || new Date().toLocaleDateString();
  }
}

@Model()
export class DeviceModel {
  @HashKey('S')
  name!: string;
  image?: string;
  level?: string;
  power!: number[];
  capacity?: number;
  protocol?: string;
  connection?: string[];
  deviceType?: string;

  constructor(args: {
    name: string;
    image: string;
    level?: string;
    power: number[];
    capacity?: number;
    protocol?: string;
    connection?: string[];
    deviceType?: string;
  }) {
    this.name = args.name;
    this.image = args.image;
    this.level = args.level;
    this.power = args.power;
    this.capacity = args.capacity;
    this.protocol = args.protocol;
    this.connection = args.connection;
    this.deviceType = args.deviceType;
  }
}

@Model()
export class Device {
  @HashKey('S')
  accountId!: string;

  @RangeKey('S')
  id: string;
  model: {
    name: string;
    image?: string;
    level?: string;
    power: number;

    protocol?: string;
    connection?: string[];
    deviceType?: string;
  };
  storage: {
    state_of_charge: number;
    capacity: number;
  };
  createdAt?: string;
  load!: number | null;

  get status(): string {
    const Status: any = {
      0: 'Idle',
      null: 'Unplugged',
    };

    if (this.load === 0) {
      return Status[0] || 'Idle';
    } else if (this.load! > 0) {
      return 'Charging';
    } else if (this.load! < 0) {
      return 'Discharging';
    }

    return 'Unplugged';
  }

  constructor(args: {
    id?: string;
    accountId: string;
    model: {
      name: string;
      image?: string;
      level?: string;
      power: number;
      capacity?: number;
      protocol?: string;
      connection?: string[];
      deviceType?: string;
    };
    storage: {
      state_of_charge: number;
      capacity: number;
    };
    createdAt?: string;
    load: number | null;
    status?: string;
  }) {
    this.id = args.id || uuidv4();
    this.accountId = args.accountId;
    this.model = args.model;
    this.createdAt = args.createdAt || new Date().toLocaleDateString();
    this.load = args.load;
    args.status;
    this.storage = args.storage;
  }
}
