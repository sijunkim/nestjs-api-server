import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import EMAILCONFIG from '@config/emailConfig';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { Email, EmailOptions } from './entities/email.entity';

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(@Inject(EMAILCONFIG.KEY) private emailConfig: ConfigType<typeof EMAILCONFIG>) {
    this.transporter = nodemailer.createTransport({
      service: emailConfig.service,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
      },
    });
  }

  async sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string) {
    const url = `${this.emailConfig.baseUrl}/user/email-verify`;
    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST" target="_blank">
          <input type="text" name="signupVerifyToken" value="${signupVerifyToken}" hidden />
          <button>가입확인</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
