import { TestBed, inject } from '@angular/core/testing';

import { ItemCreaterComponent } from './item-creater.component';

describe('a item-creater component', () => {
	let component: ItemCreaterComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ItemCreaterComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ItemCreaterComponent], (ItemCreaterComponent) => {
		component = ItemCreaterComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});