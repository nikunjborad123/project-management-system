import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controllers.js";
import {
  userLoginValidator,
  userRegisterValidator,
  userForgotPasswordValidator,
  userResetPasswordValidator,
} from "../validators/index.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

// Unprotected routes
router.post("/register", userRegisterValidator(), validate, registerUser);
router.post("/login", userLoginValidator(), validate, loginUser);
router.get("/verify-email/:verificationToken", verifyEmail);
router.post("/refresh-token", refreshAccessToken);
router.post(
  "/forgot-password",
  userForgotPasswordValidator(),
  validate,
  forgotPassword,
);
router.post(
  "/reset-password/:resetToken",
  userResetPasswordValidator(),
  validate,
  resetPassword,
);

// Protected routes
router.post("/logout", authMiddleware, logoutUser);
router.get("/current-user", authMiddleware, getCurrentUser);
router.post("/change-password", authMiddleware, changePassword);
router.post(
  "/resend-verification-email",
  authMiddleware,
  resendEmailVerification,
);

export default router;
