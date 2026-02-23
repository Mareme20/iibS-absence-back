export interface IStatsRepository {
  coursParProfesseur(): Promise<unknown[]>;
  coursParClasse(): Promise<unknown[]>;
  top5Absents(): Promise<unknown[]>;
  etudiantsPlus25Heures(): Promise<unknown[]>;
}
