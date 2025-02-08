export class UsersClass {
    async addUser({
        username,
        email,
        password,
        avatar,
        phone,
    }: {
        username: string;
        email: string;
        password?: string;
        avatar?: string;
        phone?: number;
    }) {
        return await fetch("http://localhost:3000/api/users?type=create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                username,
                email,
                password: password ? password : null,
                avatar: avatar ? avatar : "",
                phone: phone ? phone : null,
            }),
        });
    }
}
