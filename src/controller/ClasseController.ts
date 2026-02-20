import { Request, Response } from "express"
import { ClasseRepository } from "../repository/ClasseRepository"
import { ClasseService } from "../service/ClasseService"
import { createClasseSchema } from "../dto/classe.dto"
import { successResponse, errorResponse } from "../utils/response"
import { AuthRequest } from "../middleware/auth.middleware"

const repository = new ClasseRepository()
const service = new ClasseService(repository)

export class ClasseController {

  async create(req: AuthRequest, res: Response) {
    try {
      console.log("=== CREATE CLASSE REQUEST ===")
      console.log("Body:", req.body)
      console.log("User:", req.user)
      
      const data = createClasseSchema.parse(req.body)
      console.log("Parsed data:", data)
      
      const result = await service.create(data)
      console.log("Created result:", result)
      
      return successResponse(res, result, "Classe créée avec succès", 201)
    } catch (error: any) {
      console.error("=== CREATE CLASSE ERROR ===")
      console.error("Error:", error)
      return errorResponse(res, error.message || "Erreur lors de la création")
    }
  }

  async findAll(req: AuthRequest, res: Response) {
    try {
      console.log("=== FIND ALL CLASSES ===")
      const result = await service.findAll()
      console.log("Classes found:", result)
      return successResponse(res, result)
    } catch (error: any) {
      console.error("=== FIND ALL CLASSES ERROR ===")
      console.error("Error:", error)
      return errorResponse(res, error.message)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string)
      const data = req.body
      const result = await service.update(id, data)
      return successResponse(res, result, "Classe mise à jour", 200)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string)
      await service.delete(id)
      return successResponse(res, null, "Classe supprimée", 200)
    } catch (error: any) {
      return errorResponse(res, error.message)
    }
  }
}
