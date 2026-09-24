import { Link } from "react-router-dom";

const variants = {
	primary:
		"bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:from-blue-600 hover:to-cyan-500 hover:-translate-y-0.5 hover:shadow-lg",
	secondary:
		"border border-primary/30 bg-white text-primary hover:border-primary hover:bg-primary/5",
	accent:
		"bg-accent text-slate-900 shadow-md hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg",
	danger:
		"bg-danger text-white shadow-md hover:bg-red-500 hover:-translate-y-0.5 hover:shadow-lg",
};

const shapes = {
	rounded: "rounded-xl",
	pill: "rounded-full",
};

function Button({ children, to, href, type = "button", variant = "primary", shape = "rounded", className = "", ...props }) {
	const classes = `inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${shapes[shape]} ${variants[variant]} ${className}`;

	if (to) {
		return (
			<Link to={to} className={classes} {...props}>
				{children}
			</Link>
		);
	}

	if (href) {
		return (
			<a href={href} className={classes} {...props}>
				{children}
			</a>
		);
	}

	return (
		<button type={type} className={classes} {...props}>
			{children}
		</button>
	);
}

export default Button;
