export interface IStatsRepository {
  coursParProfesseur(): Promise<any[]>;
  coursParClasse(): Promise<any[]>;
  top5Absents(): Promise<any[]>;
  etudiantsPlus25Heures(): Promise<any[]>;
}
