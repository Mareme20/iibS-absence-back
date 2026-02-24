import { AbsenceController } from "../controller/AbsenceController";
import { AuthController } from "../controller/AuthController";
import { ClasseController } from "../controller/ClasseController";
import { CoursController } from "../controller/CoursController";
import { EtudiantController } from "../controller/EtudiantController";
import { JustificationController } from "../controller/JustificationController";
import { ProfesseurController } from "../controller/ProfesseurController";
import { StatsController } from "../controller/StatsController";
import { AbsenceRepository } from "../repository/AbsenceRepository";
import { ClasseRepository } from "../repository/ClasseRepository";
import { CoursRepository } from "../repository/CoursRepository";
import { EtudiantRepository } from "../repository/EtudiantRepository";
import { InscriptionRepository } from "../repository/InscriptionRepository";
import { JustificationRepository } from "../repository/JustificationRepository";
import { ProfesseurRepository } from "../repository/ProfesseurRepository";
import { StatsRepository } from "../repository/StatsRepository";
import { UserRepository } from "../repository/UserRepository";
import { AbsenceService } from "../service/AbsenceService";
import { AuthService } from "../service/AuthService";
import { ClasseService } from "../service/ClasseService";
import { CoursService } from "../service/CoursService";
import { EtudiantService } from "../service/EtudiantService";
import { JustificationService } from "../service/JustificationService";
import { ProfesseurService } from "../service/ProfesseurService";
import { StatsService } from "../service/StatsService";

/**
 * AppContainer centralise la composition des dépendances.
 * Objectif: faciliter le test unitaire en remplaçant ces dépendances.
 */
class AppContainer {
  // Repositories
  readonly userRepository = new UserRepository();
  readonly classeRepository = new ClasseRepository();
  readonly coursRepository = new CoursRepository();
  readonly etudiantRepository = new EtudiantRepository();
  readonly inscriptionRepository = new InscriptionRepository();
  readonly absenceRepository = new AbsenceRepository();
  readonly justificationRepository = new JustificationRepository();
  readonly professeurRepository = new ProfesseurRepository();
  readonly statsRepository = new StatsRepository();

  // Services
  readonly authService = new AuthService(this.userRepository);
  readonly classeService = new ClasseService(this.classeRepository, this.inscriptionRepository);
  readonly coursService = new CoursService(
    this.coursRepository,
    this.professeurRepository,
    this.classeRepository
  );
  readonly absenceService = new AbsenceService(
    this.absenceRepository,
    this.etudiantRepository,
    this.coursRepository,
    this.inscriptionRepository
  );
  readonly etudiantService = new EtudiantService(
    this.etudiantRepository,
    this.userRepository,
    this.classeRepository,
    this.inscriptionRepository,
    this.absenceRepository,
    this.coursRepository
  );
  readonly justificationService = new JustificationService(
    this.justificationRepository,
    this.absenceRepository,
    this.etudiantRepository
  );
  readonly professeurService = new ProfesseurService(
    this.professeurRepository,
    this.userRepository
  );
  readonly statsService = new StatsService(this.statsRepository);

  // Controllers
  readonly authController = new AuthController(this.authService);
  readonly classeController = new ClasseController(this.classeService);
  readonly coursController = new CoursController(this.coursService);
  readonly absenceController = new AbsenceController(this.absenceService);
  readonly etudiantController = new EtudiantController(
    this.etudiantService,
    this.justificationService
  );
  readonly justificationController = new JustificationController(this.justificationService);
  readonly professeurController = new ProfesseurController(this.professeurService);
  readonly statsController = new StatsController(this.statsService);
}

export const container = new AppContainer();

