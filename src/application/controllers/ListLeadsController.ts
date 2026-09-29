import { IController, IResponse } from '../interfaces/IController';

export class ListLeadController implements IController {
  async handle(): Promise<IResponse> {
    return {
      statusCode: 200,
      body: {
        leads: [
          { id: '1', name: 'Zezinho' },
          { id: '2', name: 'Mariazinha' },
          { id: '3', name: 'Carlos' },
          { id: '4', name: 'Rosângela' },
        ],
      },
    };
  }
}
