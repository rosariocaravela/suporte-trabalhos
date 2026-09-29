import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function useRequestRealtime(column, value) {
	const [revision, setRevision] = useState(0);

	useEffect(() => {
		if (!column || !value) return undefined;

		const channel = supabase
			.channel(`requests-${column}-${value}`)
			.on("postgres_changes", {
				event: "*",
				schema: "public",
				table: "requests",
				filter: `${column}=eq.${value}`,
			}, () => { setRevision((current) => current + 1); })
			.subscribe();

		return () => { void supabase.removeChannel(channel); };
	}, [column, value]);

	return revision;
}

export default useRequestRealtime;