export default function FormInput(props) {
    const { name, value, type, placeHolder } = props.attribute;
    return (
        <div>
            <input
                className="from-input"
                type={type}
                placeholder={placeHolder}
                name={name}
                value={value}
                onChange={props.onChange}
                required
            />
        </div>
    );
}