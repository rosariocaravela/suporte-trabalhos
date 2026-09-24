function FormField({ label, name, className = "", ...props }) {
	return (
		<div className={className}>
			<label htmlFor={name} className="mb-2 block text-sm font-semibold text-primary">
				{label}
			</label>
			<input
				id={name}
				name={name}
				className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10"
				{...props}
			/>
		</div>
	);
}

export default FormField;
