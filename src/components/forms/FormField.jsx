const fieldClasses = "w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-primary outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10";

function FormField({ label, name, className = "", as = "input", children, ...props }) {
	const Component = as;

	return (
		<div className={className}>
			<label htmlFor={name} className="mb-2 block text-sm font-semibold text-primary">
				{label}
			</label>
			<Component
				id={name}
				name={name}
				className={fieldClasses}
				{...props}
			>
				{children}
			</Component>
		</div>
	);
}

export default FormField;
