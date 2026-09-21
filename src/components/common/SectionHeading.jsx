function SectionHeading({ eyebrow, icon, title, description, className = "" }) {
	return (
		<header className={`mx-auto max-w-3xl text-center ${className}`}>
			{eyebrow && (
				<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-secondary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">
					{icon}
					{eyebrow}
				</div>
			)}
			<h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">{title}</h1>
			{description && <p className="mt-5 text-lg leading-8 text-gray-600">{description}</p>}
		</header>
	);
}

export default SectionHeading;
