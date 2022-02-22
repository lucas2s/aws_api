import SESV2 from 'aws-sdk/clients/sesv2';
import { EnumType } from 'typescript';
import { SES_API_VERSION, SES_REGION, SES_AWS_ACCESS_KEY_ID, SES_AWS_SECRET_ACCESS_KEY } from '../config/enviroment';
import SesError from './Error/SesError';

interface EmailSuppressedResponse {
  SuppressedDestination: {
    EmailAddress: string,
    Reason: string,
    LastUpdateTime: Date,
    Attributes: {
      MessageId: string,
      FeedbackId: string
    }
  }
}

interface ListEmailParams {
  StartDate?: Date,
  EndDate?: Date,
  NextToken?: string,
  PageSize?: number,
  Reasons?: string[],
}

interface AddEmailParams {
  EmailAddress: string,
  Reason: string,
}

export default class SuppressedDestination {

  private sesv2: SESV2;

  constructor() {
    this.sesv2 = new SESV2({
      apiVersion: SES_API_VERSION,
      region: SES_REGION,
      accessKeyId: SES_AWS_ACCESS_KEY_ID,
      secretAccessKey: SES_AWS_SECRET_ACCESS_KEY
    });
  }

  public async addEmailSuppressed(params: AddEmailParams): Promise<any> {
    try {
      return await this.sesv2.putSuppressedDestination(params).promise();
    } catch (error: any) {
      throw new SesError('Erro inesperado addEmailSuppressed', 'ServerError', 500);
    }
  }

  public async getEmailSuppressed(email: string): Promise<EmailSuppressedResponse | any> {
    try {
      return await this.sesv2.getSuppressedDestination({
        EmailAddress: email
      }).promise();
    } catch (error: any) {
      if (error.code === 'NotFoundException') {
        throw new SesError(error.message, error.code, 404);
      }
      throw new SesError('Erro inesperado getSuppressedDestination', 'ServerError', 500);
    }
  }

  public async listEmailSuppressed(params: ListEmailParams): Promise<any> {
    try {
      return await this.sesv2.listSuppressedDestinations(
        params
      ).promise();
    } catch (error: any) {
      throw new SesError('Erro inesperado listEmailSuppressed', 'ServerError', 500);
    }
  }

  public async deleteEmailSuppressed(email: string): Promise<any> {
    try {
      return await this.sesv2.deleteSuppressedDestination({
        EmailAddress: email
      }).promise();
    } catch (error: any) {
      if (error.code === 'NotFoundException') {
        throw new SesError(error.message, error.code, 404);
      }
      throw new SesError('Erro inesperado deleteEmailSuppressed', 'ServerError', 500);
    }
  }
}