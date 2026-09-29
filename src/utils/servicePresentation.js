import visualServices from "../data/services";
import { Wrench } from "lucide-react";

function toServiceCard(service) {
	const visual = visualServices.find((item) => item.title.toLowerCase() === service.name.toLowerCase());
	const fallbackVisual = visualServices[0];

	return {
		...service,
		title: service.name,
		icon: visual?.icon ?? Wrench,
		image: visual?.image ?? fallbackVisual.image,
	};
}

export default toServiceCard;