import { Injectable, Logger } from '@nestjs/common';

/**
 * Cliente HTTP do serviço de Clientes.
 *
 * O webhook de assinatura precisa gravar `monthly_subscription_status` no
 * usuário, dado que passou a pertencer à capacidade de Clientes. A chamada vai
 * direto pela rede dos contêineres, sem passar pelo gateway, e não entra em
 * nenhuma rota medida.
 */
@Injectable()
export class ClientesClient {
  private readonly logger = new Logger(ClientesClient.name);

  private readonly clientesUrl =
    process.env.CLIENTES_URL ?? 'http://clientes:3001';

  public async updateSubscriptionStatus(
    stripeCustomerId: string,
    status: string,
  ): Promise<void> {
    this.logger.log(
      `Atualizando assinatura do cliente ${stripeCustomerId} para ${status}`,
    );

    const response = await fetch(
      `${this.clientesUrl}/api/internal/users/subscription`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stripe_customer_id: stripeCustomerId,
          status,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Falha ao atualizar a assinatura do cliente ${stripeCustomerId}: ${response.status}`,
      );
    }
  }
}
