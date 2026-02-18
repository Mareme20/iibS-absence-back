import { Router } from "express"
import { CoursController } from "../controller/CoursController"
import { authMiddleware } from "../middleware/auth.middleware"
import { authorizeRoles } from "../middleware/role.middleware"
import { UserRole } from "../entity/User"

const router = Router()

router.post(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.RP),
  CoursController.create
)

router.get(
  "/",
  authMiddleware,
  CoursController.findAll
)

export default router
