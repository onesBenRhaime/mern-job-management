const { get } = require("mongoose");
const nodemailer = require("nodemailer");
const GMAIL_USER = "orangedigitalcentretest@gmail.com";
const GMAIL_PSW = "ylwvzbilzvcceuoa";

async function MailNotif(req, res) {
	try {
		const { idCandidat, idOffre } = req.body;
		console.log("idCandidat", idCandidat);
		console.log("idOffre", idOffre);
		const candidat = await User.findById(idCandidat);
		const offre = await Offre.findById(idOffre);

		const email = candidat.email;
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: GMAIL_USER,
				pass: GMAIL_PSW,
			},
		});
		let info = await transporter.sendMail({
			from: GMAIL_USER,
			to: email,
			subject: ``,
			html: `		<body>
    <table width="100%">
        <tr>
            <td style="padding: 20px 0; background-color: #000000">
                <a
                    target="_blank"
                    style="
                        text-decoration: none;
                        color: #fff;
                        display: flex;
                        align-items: start;
                        justify-content: start;
                    "
                >
                    <img src="https://i.postimg.cc/qR5fh0QH/logo-network.png"
                    width="70px" height="70px" alt="Esprit Network auto" style="display:
                    block; border: 0 ; padding: 10px;" />
                    <h1>Esprit Network</h1>
                </a>
            </td>
        </tr>
        <tr style="background: #fff">
            <td style="padding: 20px">
                <p style="margin: 2; font-size: 14px; color: #000000">
                    <br /><br />
                  
                </p>
            </td>
        </tr>
    </table>
</body>`,
		});
		if (info) {
			console.log(info);
		} else {
			console.log("err");
		}
		res.status(201).json({ message: "mail envoyer " });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

module.exports = {
	MailNotif,
};
