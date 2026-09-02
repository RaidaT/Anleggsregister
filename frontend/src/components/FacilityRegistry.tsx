import { useEffect, useState } from 'react';
import cuteFishSwimmingImg from '../assets/cute-fish-swimming.jpg';
import { createFacility, updateFacility, deleteFacility, getFacilities } from '../api/facilityApi';
import type { FacilityRequest, Facility } from '../types/Facility';
import { btnStyles } from '../styles/buttonStyles';
import CreateEditFacilityForm from './CreateEditFacilityForm';

const styles = {
    createBtn: {
        marginTop: '16px',
        marginBottom: '40px',
        ...btnStyles(false),
    },
    subtitle: {
        fontWeight: 'bold',
        marginTop: '16px',
        marginLeft: '-555px',
        paddingBottom: '8px',
    },
    table: {
        margin: '0 auto',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
        minWidth: '760px',
    },
    header: {
        padding: '8px 16px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
    body: {
        padding: '8px 16px 8px 20px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
} as const;

function FacilityRegistry() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingFacility, setEditingFacility] = useState<Facility | null>(null);

    useEffect(() => {
        getFacilities()
            .then((data) => {
                setFacilities(data);
                setError(null);
            })
            .catch((error: unknown) => {
                setError(`Could not load facilities. ${error}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleCreateFacility = async (facility: FacilityRequest) => {
        try {
            const createdFacility = await createFacility(facility);

            setFacilities((current) => [...current, createdFacility]); // appends newly created at the bottom
            setShowCreateForm(false);
            setError(null);
        } catch (error: unknown) {
            setError(`Could not create facility. ${error}`);
        }
    };

    const handleUpdateFacility = async (facility: FacilityRequest) => {
        if (!editingFacility) {
            return;
        }

        try {
            const updatedFacility = await updateFacility(editingFacility.id, facility);

            setFacilities((current) =>
                current.map((existingFacility) =>
                    existingFacility.id === updatedFacility.id ? updatedFacility : existingFacility,
                ),
            );
            setEditingFacility(null);
            setError(null);
        } catch (error: unknown) {
            setError(`Could not update facility. ${error}`);
        }
    };

    const handleDeleteFacility = async (id: number) => {
        try {
            await deleteFacility(id);

            setFacilities((current) => current.filter((facility) => facility.id !== id));
            setError(null);
        } catch (error: unknown) {
            setError(`Could not delete facility. ${error}`);
        }
    };

    return (
        <>
            <div>
                <h1>Facility Registry</h1>
                <div>
                    <img src={cuteFishSwimmingImg} className="base" width="170" height="179" />
                </div>
                <button style={styles.createBtn} onClick={() => setShowCreateForm(true)}>
                    + Create facility
                </button>
                {facilities.length > 0 && <h2 style={styles.subtitle}>Registered Facilities</h2>}
                {isLoading ? (
                    <p style={{ marginTop: '16px' }}>Loading facilities...</p>
                ) : error ? (
                    <p style={{ marginTop: '16px' }}>{error}</p>
                ) : facilities.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.header}>Name</th>
                                <th style={styles.header}>Fish Species</th>
                                <th style={styles.header}>Organisations</th>
                                <th style={styles.header}>Location</th>
                                <th style={styles.header}>Created</th>
                                <th style={styles.header}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facilities.map((facility) => (
                                <tr key={facility.id}>
                                    <td style={styles.body}>{facility.name}</td>
                                    <td style={styles.body}>{facility.fishSpecies.join(', ')}</td>
                                    <td style={styles.body}>{facility.organisations.join(', ')}</td>
                                    <td style={styles.body}>{facility.location}</td>
                                    <td style={styles.body}>{facility.createdDate}</td>
                                    <td style={styles.body}>
                                        <button
                                            style={{
                                                marginRight: '8px',
                                                ...btnStyles(true),
                                            }}
                                            onClick={() => setEditingFacility(facility)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            style={{
                                                ...btnStyles(true),
                                            }}
                                            onClick={() => handleDeleteFacility(facility.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : showCreateForm ? (
                    <></>
                ) : (
                    <p style={{ marginTop: '16px' }}>No facilities registered.</p>
                )}
            </div>
            {showCreateForm && (
                <CreateEditFacilityForm onCancel={() => setShowCreateForm(false)} onSubmit={handleCreateFacility} />
            )}
            {editingFacility && (
                <CreateEditFacilityForm
                    onCancel={() => setEditingFacility(null)}
                    onSubmit={handleUpdateFacility}
                    initialFacility={editingFacility}
                />
            )}
        </>
    );
}

export default FacilityRegistry;
