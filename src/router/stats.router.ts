import { Router } from "express"
import { StatsController } from "../controller/StatsController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()

// Seulement RP et ATTACHE peuvent accéder aux stats
router.get(
  "/cours-par-professeur",
  authMiddleware,
  authorizeRoles(UserRole.RP, UserRole.ATTACHE),
  StatsController.coursParProfesseur
)

router.get(
  "/cours-par-classe",
  authMiddleware,
  authorizeRoles(UserRole.RP, UserRole.ATTACHE),
  StatsController.coursParClasse
)

router.get(
  "/top5-absents",
  authMiddleware,
  authorizeRoles(UserRole.RP, UserRole.ATTACHE),
  StatsController.top5Absents
)

router.get(
  "/plus25-heures",
  authMiddleware,
  authorizeRoles(UserRole.RP, UserRole.ATTACHE),
  StatsController.etudiantsPlus25Heures
)

export default router
