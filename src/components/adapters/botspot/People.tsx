'use client';

import { getPeople } from '@/services/getPeople';
import { Person } from '@/wordpress/component-map';
import * as botspot from '@botspot/ui';
import { FC, useEffect, useState } from 'react';

const mapProps = (person: Person) => ({
  excerpt: person.flat_excerpt || '',
  featuredImage: person.featured_image || '',
  id: person.id,
  title: person.flat_title || '',
});

export const People: FC = () => {
  const [people, setPeople] = useState<ReturnType<typeof mapProps>[]>([]);

  useEffect(() => {
    getPeople()
      .then((response) => {
        const mappedPeople = response.data.map(mapProps);
        setPeople(mappedPeople);
      })
      .catch((error) => {
        console.error('Error fetching people:', error);
        setPeople([]);
      });
  }, []);

  return <botspot.People people={people} />;
};
