function FormField({ label, name, className = "", ...props }) {
	return (
		<div className={className}>
			<label htmlFor={name} className="mb-2 block text-sm font-semibold text-slate-700">
				{label}
			</label>
			<input
				id={name}
				name={name}
				className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
				{...props}
			/>
		</div>
	);
}

export default FormField;
