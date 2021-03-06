import {CancelToken} from 'axios';
import {client} from '../client';
import {Id, IEntity, Rank} from '../Model';
import {IQueryDocument, Projection} from '../routes';
import {Armor} from './Armor';
import {ArmorSetBonus} from './ArmorSetBonus';

interface IArmorSet extends IEntity {
	bonus: ArmorSetBonus;
	name: string;
	pieces: Armor[];
	rank: Rank;
}

export type ArmorSet = Partial<IArmorSet>;

export interface IArmorSetCreatePayload {
	name: string;

	bonus?: number;
	pieces?: number[];
	rank?: Rank;
}

export interface IArmorSetUpdatePayload {
	bonus?: number;
	name?: string;
	pieces?: number[];
	rank?: Rank;
}

export class ArmorSetModel {
	public static list(query?: IQueryDocument, projection?: Projection, cancelToken?: CancelToken) {
		return client.get('/armor/sets', {
			cancelToken,
			params: {
				p: projection,
				q: query,
			},
		});
	}

	public static create(payload: IArmorSetCreatePayload, projection?: Projection) {
		return client.put('/armor/sets', payload, {
			params: {
				p: projection,
			},
		});
	}

	public static read(id: Id, projection?: Projection, cancelToken?: CancelToken) {
		return client.get<'/armor/sets/:id'>(`/armor/sets/${id}`, {
			cancelToken,
			params: {
				p: projection,
			},
		});
	}

	public static update(id: Id, payload: IArmorSetUpdatePayload, projection?: Projection) {
		return client.patch<'/armor/sets/:id'>(`/armor/sets/${id}`, payload, {
			params: {
				p: projection,
			},
		});
	}

	public static delete(id: Id) {
		return client.delete<'/armor/sets/:id'>(`/armor/sets/${id}`);
	}
}
