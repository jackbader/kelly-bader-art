import mailgun from "mailgun-js";

export default defineEventHandler(async (req, res) => {
  const body = await readBody(req);

  console.log("send mail endpoint hit");

  if (req.method === "POST") {
    console.log("is post request");
    try {
      const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      });

      const data = {
        from: body.email, // Use your Mailgun email
        to: "kellbader@gmail.com", // Your personal email where you want to receive messages
        subject: `KellyBaderArt.com - ${body.name}`,
        text: body.message,
      };

      mg.messages().send(data, function (error, body) {
        if (error) {
          console.log("error sending email", error);
          throw createError({
            statusCode: 500,
            statusMessage: "Error sending email",
          });
        }
        return { message: "Email sent successfully!" };
      });
    } catch (error) {
      console.log("another error occured", error);
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }
  } else {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }
});
