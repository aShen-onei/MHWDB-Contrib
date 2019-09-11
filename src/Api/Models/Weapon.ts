import {CancelToken} from 'axios';
import {Omit} from 'utility-types';
import {client} from '../client';
import {Id, IEntity, ISimpleCraftingCost, Slot} from '../Model';
import {IQueryDocument, Projection} from '../routes';
import {AttributeName} from './attributes';
import {CraftingCost} from './Item';
import {AmmoType} from './Weapons/ammo';
import {BowWeapon} from './Weapons/Bow';
import {ChargeBladeWeapon} from './Weapons/ChargeBlade';
import {DualBladesWeapon} from './Weapons/DualBlades';
import {GreatSwordWeapon} from './Weapons/GreatSword';
import {GunlanceWeapon} from './Weapons/Gunlance';
import {HammerWeapon} from './Weapons/Hammer';
import {HeavyBowgunWeapon} from './Weapons/HeavyBowgun';
import {HuntingHornWeapon} from './Weapons/HuntingHorn';
import {InsectGlaiveWeapon} from './Weapons/InsectGlaive';
import {LanceWeapon} from './Weapons/Lance';
import {LightBowgunWeapon} from './Weapons/LightBowgun';
import {LongSwordWeapon} from './Weapons/LongSword';
import {SwitchAxeWeapon} from './Weapons/SwitchAxe';
import {SwordAndShieldWeapon} from './Weapons/SwordAndShield';

export enum WeaponType {
	GREAT_SWORD = 'great-sword',
	LONG_SWORD = 'long-sword',
	SWORD_AND_SHIELD = 'sword-and-shield',
	DUAL_BLADES = 'dual-blades',
	HAMMER = 'hammer',
	HUNTING_HORN = 'hunting-horn',
	LANCE = 'lance',
	GUNLANCE = 'gunlance',
	SWITCH_AXE = 'switch-axe',
	CHARGE_BLADE = 'charge-blade',
	INSECT_GLAIVE = 'insect-glaive',
	LIGHT_BOWGUN = 'light-bowgun',
	HEAVY_BOWGUN = 'heavy-bowgun',
	BOW = 'bow',
}

export const weaponTypeLabels: { [key in WeaponType]: string } = {
	[WeaponType.BOW]: 'Bow',
	[WeaponType.CHARGE_BLADE]: 'Charge Blade',
	[WeaponType.DUAL_BLADES]: 'Dual Blades',
	[WeaponType.GREAT_SWORD]: 'Great Sword',
	[WeaponType.GUNLANCE]: 'Gunlance',
	[WeaponType.HAMMER]: 'Hammer',
	[WeaponType.HEAVY_BOWGUN]: 'Heavy Bowgun',
	[WeaponType.HUNTING_HORN]: 'Hunting Horn',
	[WeaponType.INSECT_GLAIVE]: 'Insect Glaive',
	[WeaponType.LANCE]: 'Lance',
	[WeaponType.LIGHT_BOWGUN]: 'Light Bowgun',
	[WeaponType.LONG_SWORD]: 'Long Sword',
	[WeaponType.SWITCH_AXE]: 'Switch Axe',
	[WeaponType.SWORD_AND_SHIELD]: 'Sword and Shield',
};

export enum DamageType {
	BLUNT = 'blunt',
	PROJECTILE = 'projectile',
	SEVER = 'sever',
}

export enum Element {
	BLAST = 'blast',
	DRAGON = 'dragon',
	FIRE = 'fire',
	ICE = 'ice',
	PARALYSIS = 'paralysis',
	POISON = 'poison',
	SLEEP = 'sleep',
	STUN = 'stun',
	THUNDER = 'thunder',
	WATER = 'water',
}

export enum Elderseal {
	LOW = 'low',
	AVERAGE = 'average',
	HIGH = 'high',
}

export enum ShellingType {
	LONG = 'Long',
	NORMAL = 'Normal',
	WIDE = 'Wide',
}

export enum SpecialAmmo {
	WYVERNBLAST = 'wyvernblast',
	WYVERNHEART = 'wyvernheart',
	WYVERNSNIPE = 'wyvernsnipe',
}

export enum PhialType {
	ELEMENT = 'element',
	IMPACT = 'impact',
	POWER = 'power',
	POWER_ELEMENT = 'power element',
}

export enum DamagePhialType {
	DRAGON = 'dragon',
	EXHAUST = 'exhaust',
	PARA = 'para',
	POISON = 'poison',
}

export type PhialTypes = PhialType | DamagePhialType;

export enum Deviation {
	AVERAGE = 'average',
	HIGH = 'high',
	LOW = 'low',
	NONE = 'none',
}

export enum Coating {
	BLAST = 'blast',
	CLOSE_RANGE = 'close range',
	PARALYSIS = 'paralysis',
	POISON = 'poison',
	POWER = 'power',
	SLEEP = 'sleep',
}

export enum BoostType {
	BLUNT = 'blunt',
	ELEMENT = 'element',
	HEALTH = 'health',
	SEVER = 'sever',
	SPEED = 'speed',
	STAMINA = 'stamina',
}

interface IAttack {
	display: number;
	raw: number;
}

interface IWeaponElement {
	damage: number;
	hidden: boolean;
	type: Element;
}

interface IWeaponCrafting {
	branches: number[];
	craftable: boolean;
	craftingMaterials: CraftingCost[];
	previous: number;
	upgradeMaterials: CraftingCost[];
}

interface IDurability {
	red: number;
	orange: number;
	yellow: number;
	green: number;
	blue: number;
	white: number;
}

export interface IAmmoCapacities {
	[AmmoType.NORMAL]: [number, number, number];
	[AmmoType.PIERCING]: [number, number, number];
	[AmmoType.SPREAD]: [number, number, number];
	[AmmoType.STICKY]: [number, number, number];
	[AmmoType.CLUSTER]: [number, number, number];
	[AmmoType.RECOVER]: [number, number];
	[AmmoType.POISON]: [number, number];
	[AmmoType.PARALYSIS]: [number, number];
	[AmmoType.SLEEP]: [number, number];
	[AmmoType.EXHAUST]: [number, number];
	[AmmoType.FLAMING]: [number];
	[AmmoType.WATER]: [number];
	[AmmoType.FREEZE]: [number];
	[AmmoType.THUNDER]: [number];
	[AmmoType.DRAGON]: [number];
	[AmmoType.SLICING]: [number];
	[AmmoType.WYVERN]: [number];
	[AmmoType.DEMON]: [number];
	[AmmoType.ARMOR]: [number];
	[AmmoType.TRANQ]: [number];
}

interface IWeaponAttributes {
	[key: string]: any;

	[AttributeName.AFFINITY]: string;
	[AttributeName.AMMO_CAPACITIES]: AmmoCapacities;
	[AttributeName.DAMAGE_TYPE]: DamageType;
	[AttributeName.DEFENSE]: number;
	[AttributeName.GL_SHELLING_TYPE]: ShellingType;
	[AttributeName.IG_BOOST_TYPE]: BoostType;
	[AttributeName.SPECIAL_AMMO]: SpecialAmmo;
}

export interface IDurabilityFunctionality {
	durability: Durability[];
}

export const hasDurabilityFunctionality = (value: any): value is IDurabilityFunctionality => {
	return typeof value === 'object' && 'durability' in value;
};

export const isDurabilityFunctionalityType = (type: WeaponType): boolean => {
	return !WeaponModel.isRanged(type);
};

export interface IWeapon<T extends WeaponType> extends IEntity {
	attack: Attack;
	attributes: WeaponAttributes;
	crafting: WeaponCrafting;
	elderseal: Elderseal;
	elements: WeaponElement[];
	name: string;
	rarity: number;
	slots: Slot[];
	type: T;
}

export type Attack = Partial<IAttack>;
export type WeaponElement = Partial<IWeaponElement>;
export type WeaponCrafting = Partial<IWeaponCrafting>;
export type Durability = Partial<IDurability>;
export type AmmoCapacities = Partial<IAmmoCapacities>;
export type WeaponAttributes = Partial<IWeaponAttributes>;

export type Weapon = BowWeapon | ChargeBladeWeapon | DualBladesWeapon | GreatSwordWeapon | GunlanceWeapon | HammerWeapon
	| HeavyBowgunWeapon | HuntingHornWeapon | InsectGlaiveWeapon | LanceWeapon | LightBowgunWeapon | LongSwordWeapon
	| SwitchAxeWeapon | SwordAndShieldWeapon;

export const durabilityOrder: Array<keyof Durability> = [
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'white',
];

export type WeaponPayload = Omit<Weapon, 'crafting'> & {
	crafting?: Omit<WeaponCrafting, 'craftingMaterials' | 'upgradeMaterials'> & {
		craftingMaterials?: ISimpleCraftingCost[];
		upgradeMaterials?: ISimpleCraftingCost[];
	};
};

export type WeaponCreatePayload = Omit<WeaponPayload, 'name' | 'rarity' | 'type'> & {
	name: string;
	rarity: number;
	type: WeaponType;
};

export class WeaponModel {
	public static list(query?: IQueryDocument, projection?: Projection, cancelToken?: CancelToken) {
		return client.get('/weapons', {
			cancelToken,
			params: {
				p: projection,
				q: query,
			},
		});
	}

	public static listByType(
		type: WeaponType,
		query?: IQueryDocument,
		projection?: Projection,
		cancelToken?: CancelToken,
	) {
		query = query || {};
		query.type = type;

		return WeaponModel.list(query, projection, cancelToken);
	}

	public static create(payload: WeaponPayload, projection?: Projection) {
		return client.put('/weapons', payload, {
			params: {
				p: projection,
			},
		});
	}

	public static read(id: Id, projection?: Projection, cancelToken?: CancelToken) {
		return client.get<'/weapons/:id'>(`/weapons/${id}`, {
			cancelToken,
			params: {
				p: projection,
			},
		});
	}

	public static update(id: Id, payload: WeaponPayload, projection?: Projection) {
		return client.patch<'/weapons/:id'>(`/weapons/${id}`, payload, {
			params: {
				p: projection,
			},
		});
	}

	public static delete(id: Id) {
		return client.delete<'/weapons/:id'>(`/weapons/${id}`);
	}

	public static isRanged(type: WeaponType) {
		return type === WeaponType.LIGHT_BOWGUN || type === WeaponType.HEAVY_BOWGUN || type === WeaponType.BOW;
	}
}
