import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailService } from '@email/services/email.service';
import { UserService } from '@user/services/user.service';

/**
 * Rotas internas do monólito.
 *
 * No snapshot-1 o Checkout responde por carrinho, pedido, estoque e pagamento,
 * mas o envio de e-mail e o cadastro de usuário continuam aqui. As chamadas
 * saem direto pela rede do compose e não passam pelo gateway.
 */
@ApiTags('Internal')
@Controller('internal')
export class InternalController {
  public constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Post('emails/order-confirmation')
  @ApiOperation({ summary: 'Send the order confirmation e-mail' })
  public async sendOrderConfirmation(@Body() body: any): Promise<void> {
    await this.emailService.sendOrderConfirmationEmail(body);
  }

  @Patch('users/subscription')
  @ApiOperation({ summary: 'Update monthly subscription status' })
  public async updateSubscription(
    @Body() body: { stripe_customer_id: string; status: string },
  ): Promise<{ updated: boolean }> {
    await this.userService.updateMonthlySubscriptionStatus(
      body.stripe_customer_id,
      body.status,
    );
    return { updated: true };
  }
}
