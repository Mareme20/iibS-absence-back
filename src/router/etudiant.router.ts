import { Router } from "express"
import { EtudiantController } from "../controller/EtudiantController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()

router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.ATTACHE),
  EtudiantController.create
)

router.post(
  "/inscription",
  authMiddleware,
  authorizeRoles(UserRole.ATTACHE),
  EtudiantController.inscrire
)

export default router
