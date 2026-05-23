import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWelcomeEmail(
  email: string,
  firstName: string
) {
  await transporter.sendMail({
    from: `"Music by Lerry" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎵 Welcome to Music by Lerry",

    html: `
      <div style="
        background:#00272c;
        padding:40px;
        color:white;
        font-family:Arial;
      ">

        <h1 style="
          color:#e1ff51;
          font-size:32px;
        ">
          Welcome ${firstName} 🎶
        </h1>

        <p style="
          font-size:16px;
          line-height:1.8;
          color:#d1d5db;
        ">
          Thank you for joining Music by Lerry.

          Your journey into music sharing,
          discovery, collaboration and creativity
          starts now.

          Upload your music, connect with listeners,
          explore rising artists and build your sound.

          We created this platform to help artists
          express themselves freely and grow
          their audience through music.

          This is more than streaming.

          This is a community.
        </p>

        <div style="
          margin-top:30px;
          padding:20px;
          border-radius:16px;
          background:rgba(255,255,255,0.05);
        ">

          <h2 style="color:#e1ff51;">
            What you can do:
          </h2>

          <ul style="
            line-height:2;
            color:#d1d5db;
          ">
            <li>🎵 Upload songs</li>
            <li>❤️ Receive likes</li>
            <li>💬 Interact through comments</li>
            <li>👤 Build your artist profile</li>
            <li>🌍 Discover creators worldwide</li>
          </ul>

        </div>

        <p style="
          margin-top:40px;
          color:#9ca3af;
          font-size:14px;
        ">
          — Music by Lerry Team
        </p>

      </div>
    `,
  });
}


export async function sendSongApprovedEmail(
  email: string,
  firstName: string,
  songTitle: string
) {
  await transporter.sendMail({
    from: `"Music by Lerry" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Your song has been approved!",

    html: `
      <div style="background:#00272c;padding:40px;color:white;font-family:Arial">

        <h1 style="color:#e1ff51;">
          Congratulations ${firstName} 🎵
        </h1>

        <p style="color:#d1d5db;font-size:16px;line-height:1.8">
          Your song <b>${songTitle}</b> has been approved by admin
          and is now live on Music by Lerry.
        </p>

        <div style="margin-top:20px;padding:15px;background:rgba(255,255,255,0.05);border-radius:12px;">
          You can now share it with the world 🌍
        </div>

        <p style="margin-top:30px;color:#9ca3af;font-size:13px">
          — Music by Lerry Team
        </p>

      </div>
    `,
  });
}
