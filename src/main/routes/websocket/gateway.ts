import { Req } from '@nestjs/common';
import { ConnectedSocket, WebSocketGateway } from '@nestjs/websockets';
import * as ws from 'ws';

export const server = new ws.Server({ port: 8080 });
const connectedClients = new Map<string, ws.WebSocket>();

@WebSocketGateway()
export class Gateway {
  users: string[] = [];

  handleConnection(@ConnectedSocket() client: ws, @Req() req) {
    const clientId = req.headers['sec-websocket-protocol'];
    connectedClients.set(clientId, client);

    this.users = [...connectedClients.keys()];
    server.clients.forEach((client: ws) => {
      client.send(JSON.stringify({ users: this.users, event: 'userList' }));
    });

    client.on('close', () => {
      connectedClients.delete(clientId);
      this.users = [...connectedClients.keys()];
      server.clients.forEach((client: ws) => {
        client.send(JSON.stringify({ users: this.users, event: 'userList' }));
      });
    });
  }

  sendInvateChallenge(clientId: string, data: string) {
    const client = connectedClients.get(clientId);
    if (client) {
      client.send(
        JSON.stringify({
          type: 'NEW_CHALLENGE',
          data,
        }),
      );
    }
  }

  sendChallengeAccepted(clietIds: string[], data: string) {
    clietIds.forEach((key) => {
      const client = connectedClients.get(key);
      client?.send(
        JSON.stringify({
          type: 'CHALLENGE_ACCEPTED',
          data,
        }),
      );
    });
  }

  sendRankingUpdate(data: string) {
    this.users = [...connectedClients.keys()];

    this.users.forEach((key) => {
      console.log('key', key);

      const client = connectedClients.get(key);
      client?.send(
        JSON.stringify({
          type: 'RANKING_UPDATED',
          data,
        }),
      );
    });
  }
}
