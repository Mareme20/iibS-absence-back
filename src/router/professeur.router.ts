import { Router } from "express"
import { ProfesseurController } from "../controller/ProfesseurController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()

router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.RP),
  ProfesseurController.create
)

export default router
