const bugFields = [
    { name: 'name', label: 'Bug Name', type: 'text', placeholder: 'Enter bug name', required: true },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter description' },
    {
        name: 'priority',
        label: 'Priority',
        type: 'select',
        options: [
            { label: 'Low', value: 'Low' },
            { label: 'Medium', value: 'Medium' },
            { label: 'High', value: 'High' }
        ],
        required: true,
    },
    { name: 'dueDate', label: 'Due Date', type: 'date', required: true }
];

export default bugFields;