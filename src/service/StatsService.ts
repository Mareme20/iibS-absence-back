import { AppDataSource } from "../config/data-source"
import { Cours } from "../entity/Cours"
import { Classe } from "../entity/Classe"
import { Absence } from "../entity/Absence"
import { Etudiant } from "../entity/Etudiant"

export class StatsService {

  async coursParProfesseur() {
    const result = await AppDataSource.getRepository(Cours)
      .createQueryBuilder("cours")
      .leftJoinAndSelect("cours.professeur", "professeur")
      .select("professeur.id", "professeurId")
      .addSelect("professeur.nom", "nom")
      .addSelect("professeur.prenom", "prenom")
      .addSelect("COUNT(cours.id)", "nombreCours")
      .groupBy("professeur.id")
      .getRawMany()

    return result
  }

  async coursParClasse() {
    const result = await AppDataSource.getRepository(Cours)
      .createQueryBuilder("cours")
      .leftJoin("cours.classes", "classe")
      .select("classe.id", "classeId")
      .addSelect("classe.libelle", "libelle")
      .addSelect("COUNT(cours.id)", "nombreCours")
      .groupBy("classe.id")
      .getRawMany()

    return result
  }

  async top5Absents() {
    const result = await AppDataSource.getRepository(Absence)
      .createQueryBuilder("absence")
      .leftJoin("absence.etudiant", "etudiant")
      .where("absence.estJustifiee = false")
      .select("etudiant.id", "etudiantId")
      .addSelect("etudiant.matricule", "matricule")
      .addSelect("etudiant.adresse", "adresse")
      .addSelect("COUNT(absence.id)", "absences")
      .groupBy("etudiant.id")
      .orderBy("absences", "DESC")
      .limit(5)
      .getRawMany()

    return result
  }

  async etudiantsPlus25Heures() {
    const result = await AppDataSource.getRepository(Absence)
      .createQueryBuilder("absence")
      .leftJoin("absence.etudiant", "etudiant")
      .where("absence.estJustifiee = false")
      .select("etudiant.id", "etudiantId")
      .addSelect("etudiant.matricule", "matricule")
      .addSelect("SUM(absence.nombreHeures)", "totalHeures")
      .groupBy("etudiant.id")
      .having("SUM(absence.nombreHeures) > 25")
      .getRawMany()

    return result
  }
}
