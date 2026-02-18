import { Router } from "express"
import { ClasseController } from "../controller/ClasseController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()

router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.RP),
  ClasseController.create
)

router.get(
  "/",
  authMiddleware,
  ClasseController.findAll
)

export default router
