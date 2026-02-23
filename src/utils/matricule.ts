export async function generateUniqueMatricule(
  exists: (matricule: string) => Promise<boolean>
): Promise<string> {
  const year = new Date().getFullYear()

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const suffix = Math.floor(1000 + Math.random() * 9000)
    const matricule = `ETU-${year}-${suffix}`

    if (!(await exists(matricule))) {
      return matricule
    }
  }

  throw new Error("Impossible de générer un matricule unique")
}
