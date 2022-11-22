import prismaClient from "../../prisma";

class DetailUserService {
    async execute(id_user: string) {
        const user = prismaClient.user.findFirst(
            {
                where: {
                    id: id_user
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        );

        return user;
    }
}

export {DetailUserService};