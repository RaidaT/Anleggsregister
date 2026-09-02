import { useState } from 'react';
import type { Facility } from '../types/Facility';
import { btnStyles } from '../styles/buttonStyles';

type CreateFacilityFormValues = Omit<Facility, 'id'>;

type CreateEditFacilityFormProps = {
    onCancel: () => void;
    onSubmit: (facility: CreateFacilityFormValues) => void;
    initialFacility?: Facility;
};

const styles = {
    title: {
        fontWeight: 'bold',
        marginTop: '40px',
        marginBottom: '32px',
    },
    legend: {
        fontWeight: 'bold',
        marginTop: '16px',
    },
    btnX: {
        borderRadius: '4px',
        border: '1px solid #353839',
    },
} as const;

function CreateEditFacilityForm(props: CreateEditFacilityFormProps) {
    const { onCancel, onSubmit, initialFacility } = props;

    // initial states
    const [name, setName] = useState(initialFacility?.name ?? '');
    const [fishSpecies, setFishSpecies] = useState<string[]>(initialFacility?.fishSpecies ?? ['']);
    const [organisations, setOrganisations] = useState<string[]>(initialFacility?.organisations ?? ['']);
    const [location, setLocation] = useState<'SEA' | 'LAND'>(initialFacility?.location ?? 'SEA');
    const [createdDate, setCreatedDate] = useState(initialFacility?.createdDate ?? '');

    const updateFishSpecies = (index: number, value: string) => {
        setFishSpecies((current) => current.map((species, currentIndex) => (currentIndex === index ? value : species)));
    };

    const removeFishSpecies = (index: number) => {
        setFishSpecies((current) => current.filter((_, currentIndex) => currentIndex !== index));
    };

    const addFishSpecies = () => {
        setFishSpecies((current) => [...current, '']);
    };

    const updateOrganisation = (index: number, value: string) => {
        setOrganisations((current) =>
            current.map((organisation, currentIndex) => (currentIndex === index ? value : organisation)),
        );
    };

    const removeOrganisation = (index: number) => {
        setOrganisations((current) => current.filter((_, currentIndex) => currentIndex !== index));
    };

    const addOrganisation = () => {
        setOrganisations((current) => [...current, '']);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        onSubmit({
            name: name.trim(),
            fishSpecies: fishSpecies.map((value) => value.trim()).filter(Boolean),
            organisations: organisations.map((value) => value.trim()).filter(Boolean),
            location,
            createdDate,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={styles.title}>{initialFacility ? 'Edit Facility' : 'Create Facility'}</h2>
            <legend style={styles.legend}>Name (*):</legend>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
            <legend style={styles.legend}>Fish Species:</legend>
            {fishSpecies.map((species, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={species}
                        onChange={(event) => updateFishSpecies(index, event.target.value)}
                    />
                    <button type="button" style={styles.btnX} onClick={() => removeFishSpecies(index)}>
                        x
                    </button>
                </div>
            ))}
            <button type="button" style={{ marginBottom: '8px', ...btnStyles(true) }} onClick={addFishSpecies}>
                + Add Fish Species
            </button>
            <legend style={styles.legend}>Organisations:</legend>
            {organisations.map((organisation, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={organisation}
                        onChange={(event) => updateOrganisation(index, event.target.value)}
                    />
                    <button type="button" style={{ ...styles.btnX }} onClick={() => removeOrganisation(index)}>
                        x
                    </button>
                </div>
            ))}
            <button type="button" style={{ marginBottom: '8px', ...btnStyles(true) }} onClick={addOrganisation}>
                + Add Organisation
            </button>
            <legend style={styles.legend}>Location:</legend>
            <div>
                <label>
                    <input
                        type="radio"
                        name="location"
                        value="SEA"
                        checked={location === 'SEA'}
                        onChange={() => setLocation('SEA')}
                    />
                    SEA
                </label>
                <label>
                    <input
                        type="radio"
                        name="location"
                        value="LAND"
                        checked={location === 'LAND'}
                        onChange={() => setLocation('LAND')}
                        style={{ marginLeft: '16px' }}
                    />
                    LAND
                </label>
            </div>
            <legend style={styles.legend}>Created Date (*):</legend>
            <input type="date" value={createdDate} onChange={(event) => setCreatedDate(event.target.value)} required />
            <div>
                <button
                    type="button"
                    style={{
                        marginTop: '40px',
                        marginRight: '32px',
                        ...btnStyles(false),
                    }}
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    style={{
                        ...btnStyles(false),
                    }}
                    type="submit"
                >
                    {initialFacility ? 'Save' : 'Create'}
                </button>
            </div>
        </form>
    );
}

export default CreateEditFacilityForm;
