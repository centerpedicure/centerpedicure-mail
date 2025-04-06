import mailService from "../services/mail-service.js";

class EmailController {
  async sendEmail(req, res) {
    try {
      const { name, number, reviewText } = req.body;

      if (!name.trim() || !number.trim() || !reviewText.trim()) {
        return res
          .status(400)
          .json({ message: "Пожалуйста, заполните все поля", status: false });
      }
      const data = await mailService.sendInviteMail(name, number, reviewText);
      return res.json({
        message: "Отзыв успешно был отпрвлен",
        data,
        status: true,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ошибка при отправке отзыва", error, status: false });
    }
  }
}

export default new EmailController();
