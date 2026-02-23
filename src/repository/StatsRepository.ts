import { AppDataSource } from "../config/data-source";
import { Cours } from "../entity/Cours";
import { Absence } from "../entity/Absence";
import { IStatsRepository } from "./interfaces/IStatsRepository";

export class StatsRepository implements IStatsRepository {
  
  async coursParProfesseur() {
    return await AppDataSource.getRepository(Cours)
      .createQueryBuilder("cours")
      .leftJoin("cours.professeur", "professeur") // On joint le prof
      .leftJoin("professeur.user", "user") // Pour avoir nom/prenom si besoin
      .select("professeur.id", "professeurId")
      .addSelect("user.nom", "nom")
      .addSelect("user.prenom", "prenom")
      .addSelect("COUNT(cours.id)", "nombreCours")
      .groupBy("professeur.id")
      .addGroupBy("user.nom")
      .addGroupBy("user.prenom")
      .getRawMany();
  }

  async coursParClasse() {
    return await AppDataSource.getRepository(Cours)
      .createQueryBuilder("cours")
      .leftJoin("cours.classes", "classe")
      .select("classe.id", "classeId")
      .addSelect("classe.libelle", "libelle")
      .addSelect("COUNT(cours.id)", "nombreCours")
      .groupBy("classe.id")
      .getRawMany();
  }

  async top5Absents() {
    return await AppDataSource.getRepository(Absence)
      .createQueryBuilder("absence")
      .leftJoin("absence.etudiant", "etudiant")
      .where("absence.estJustifiee = false")
      .select("etudiant.id", "etudiantId")
      .addSelect("etudiant.matricule", "matricule")
      .addSelect("COUNT(absence.id)", "absences")
      .groupBy("etudiant.id")
      .orderBy("absences", "DESC")
      .limit(5)
      .getRawMany();
  }

  async etudiantsPlus25Heures() {
    return await AppDataSource.getRepository(Absence)
      .createQueryBuilder("absence")
      .leftJoin("absence.etudiant", "etudiant")
      .where("absence.estJustifiee = false")
      .select("etudiant.id", "etudiantId")
      .addSelect("etudiant.matricule", "matricule")
      .addSelect("SUM(absence.nombreHeures)", "totalHeures")
      .groupBy("etudiant.id")
      .having("SUM(absence.nombreHeures) > 25")
      .getRawMany();
  }
}
