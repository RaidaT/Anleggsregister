import type { FacilityRequest, Facility } from '../types/Facility';

const API_URL = 'http://localhost:8080/api/facilities';

export const getFacilities = async (): Promise<Facility[]> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        const errorResponse = await response.json();
        const validationMessage = errorResponse.errors?.[0]?.defaultMessage;

        throw new Error(validationMessage ?? 'Failed to fetch facilities');
    }

    return response.json();
};

export const createFacility = async (facilityData: FacilityRequest): Promise<Facility> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(facilityData),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        const validationMessage = errorResponse.errors?.[0]?.defaultMessage;

        throw new Error(validationMessage ?? 'Failed to create facility');
    }

    return response.json();
};

export const updateFacility = async (id: number, facilityData: FacilityRequest): Promise<Facility> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(facilityData),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        const validationMessage = errorResponse.errors?.[0]?.defaultMessage;

        throw new Error(validationMessage ?? 'Failed to update facility');
    }

    return response.json();
};

export const deleteFacility = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        const validationMessage = errorResponse.errors?.[0]?.defaultMessage;

        throw new Error(validationMessage ?? 'Failed to delete facility');
    }
};
