import * as React from 'react';
import {Route} from 'react-router';
import {ContentContainer} from '../ContentContainer';
import {Switch} from '../Navigation/Switch';
import {Ailments} from './Ailments';
import {Armor} from './Armor';
import {Charms} from './Charms';
import {Decorations} from './Decorations';
import {Items} from './Items';
import {Locations} from './Locations';
import {MotionValues} from './MotionValues';
import {Skills} from './Skills';

export const Editors: React.FC<{}> = () => (
	<ContentContainer>
		<Switch>
			<Route path="/edit/ailments" component={Ailments} />
			<Route path="/edit/armor" component={Armor} />
			<Route path="/edit/charms" component={Charms} />
			<Route path="/edit/decorations" component={Decorations} />
			<Route path="/edit/items" component={Items} />
			<Route path="/edit/locations" component={Locations} />
			<Route path="/edit/motion-values" component={MotionValues} />
			<Route path="/edit/skills" component={Skills} />
		</Switch>
	</ContentContainer>
);
