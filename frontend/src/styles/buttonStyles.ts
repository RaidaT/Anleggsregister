export const btnStyles = (isForm: boolean) => {
    return {
        fontSize: isForm ? '0.8rem' : '1rem',
        backgroundColor: '#0078c3',
        borderRadius: '6px',
        border: '1px solid #ADE0FF',
    } as const;
};
