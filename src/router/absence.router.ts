import { Router } from "express"
import { AbsenceController } from "../controller/AbsenceController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()
// Création de l'instance du contrôleur
const absenceController = new AbsenceController()

router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.PROF),
  // Utilisation de l'instance avec .bind(absenceController) 
  // pour ne pas perdre le contexte "this"
  (req, res) => absenceController.create(req, res)
)

export default router
