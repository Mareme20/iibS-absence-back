import { IStatsRepository } from "../repository/interfaces/IStatsRepository";

export class StatsService {
  constructor(private statsRepository: IStatsRepository) {}

  async coursParProfesseur() {
    return await this.statsRepository.coursParProfesseur();
  }

  async coursParClasse() {
    return await this.statsRepository.coursParClasse();
  }

  async top5Absents() {
    return await this.statsRepository.top5Absents();
  }

  async etudiantsPlus25Heures() {
    return await this.statsRepository.etudiantsPlus25Heures();
  }
}
