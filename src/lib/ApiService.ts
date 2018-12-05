import api from './request'

export default class ApiService {
    public static async getSomething(id: string, date: Date, token: string): Promise<any> {
        return api(
            `/api/v1/${id}`,
            {
                method: 'GET',
                headers: {
                    authorization: token,
                },
            },
            { date },
        )
    }
}
