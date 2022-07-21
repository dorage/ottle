export const useForm = ({ initialData }) => {
    const [data, setData] = useState(initialData);
    return [data, setData];
};
