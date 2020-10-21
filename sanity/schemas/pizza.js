import { MdLocalPizza as icon } from 'react-icons/md';

import PriceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of Pizza in pence',
      validation: (Rule) => Rule.min(500).max(50000),
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      veg0: 'toppings.0.vegetarian',
      veg1: 'toppings.1.vegetarian',
      veg2: 'toppings.2.vegetarian',
      veg3: 'toppings.3.vegetarian',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, veg0, veg1, veg2, veg3, ...toppings }) => {
      /* filter undefined toppings out */
      const tops = Object.values(toppings).filter(Boolean);

      let vegetarian = true;
      if (veg0 === false || veg1 === false || veg2 === false || veg3 === false)
        vegetarian = false;

      /* return preview object */
      return {
        title: `${title} ${vegetarian ? '🌱' : ''}`,
        media,
        subtitle: tops.join(', '),
      };
    },
  },
};
