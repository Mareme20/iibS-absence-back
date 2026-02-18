import { Router } from "express"
import { AbsenceController } from "../controller/AbsenceController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()

router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.PROF),
  AbsenceController.create
)

export default router
