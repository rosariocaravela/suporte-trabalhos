import { Link } from "react-router-dom";

const variants = {
	primary:
		"bg-accent text-primary shadow-md hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg",
	secondary:
		"border border-white/30 text-white hover:border-white hover:bg-white/10",
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
