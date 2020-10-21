import { MdPerson as icon } from 'react-icons/md';

export default {
	name: 'person',
	title: 'Slicemasters',
	type: 'document',
	icon: icon,
	fields: [
		{
			name: 'name',
			title: 'Pizza Name',
			type: 'string',
			description: 'Name of the person'
		},
		{
			name: 'slug',
			title: 'slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 100,
			}
		},
		{
			name: 'description',
			title: 'description',
			type: 'text',
			description: 'Bio'
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			}
		}
	]
};
