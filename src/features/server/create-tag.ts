function createTag(...parts: (string | number | undefined | null)[]): string {
	return parts
	  .filter((part) => part !== undefined && part !== null) // Exclure les valeurs null ou undefined
	  .map((part) => (typeof part === "object" ? JSON.stringify(part) : part)) // Stringify les objets
	  .join(":"); // Ajouter le séparateur ':'
}

export {
	createTag,
}
  