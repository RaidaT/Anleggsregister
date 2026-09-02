export type Facility = {
    id: number;
    name: string;
    fishSpecies: string[];
    organisations: string[];
    location: 'SEA' | 'LAND';
    createdDate: string;
};

export type FacilityRequest = Omit<Facility, 'id'>;
